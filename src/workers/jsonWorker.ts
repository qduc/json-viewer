export interface WorkerMessage {
  id: string;
  type: 'parse' | 'stringify' | 'beautify' | 'minify';
  payload: any;
}

export interface WorkerResponse {
  id: string;
  success: boolean;
  result?: any;
  error?: string;
}

// Worker code that will be stringified and run in a web worker
const workerCode = `
self.onmessage = function(e) {
  const { id, type, payload } = e.data;
  
  try {
    let result;
    
    switch (type) {
      case 'parse':
        result = JSON.parse(payload);
        break;
      case 'stringify':
        result = JSON.stringify(payload);
        break;
      case 'beautify':
        const parsed = JSON.parse(payload.text);
        result = JSON.stringify(parsed, null, payload.indent || 2);
        break;
      case 'minify':
        const minified = JSON.parse(payload);
        result = JSON.stringify(minified);
        break;
      default:
        throw new Error('Unknown operation type: ' + type);
    }
    
    self.postMessage({
      id,
      success: true,
      result
    });
  } catch (error) {
    self.postMessage({
      id,
      success: false,
      error: error.message
    });
  }
};
`;

class JsonWorker {
  private worker: Worker;
  private pendingPromises: Map<string, { resolve: (value: any) => void; reject: (reason: any) => void }> = new Map();

  constructor() {
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(blob));
    
    this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const { id, success, result, error } = e.data;
      const pending = this.pendingPromises.get(id);
      
      if (pending) {
        this.pendingPromises.delete(id);
        if (success) {
          pending.resolve(result);
        } else {
          pending.reject(new Error(error));
        }
      }
    };
  }

  private execute(type: WorkerMessage['type'], payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2, 15);
      this.pendingPromises.set(id, { resolve, reject });
      
      this.worker.postMessage({ id, type, payload });
    });
  }

  async parseJson(text: string): Promise<any> {
    return this.execute('parse', text);
  }

  async stringifyJson(obj: any): Promise<string> {
    return this.execute('stringify', obj);
  }

  async beautifyJson(text: string, indent: number = 2): Promise<string> {
    return this.execute('beautify', { text, indent });
  }

  async minifyJson(text: string): Promise<string> {
    return this.execute('minify', text);
  }

  destroy(): void {
    this.worker.terminate();
    this.pendingPromises.clear();
  }
}

export default JsonWorker;