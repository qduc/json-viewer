
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import React from "react";

interface SplitPaneProps {
  children: [React.ReactNode, React.ReactNode];
}

export function SplitPane({ children }: SplitPaneProps) {
  return (
    <PanelGroup direction="horizontal">
      <Panel>{children[0]}</Panel>
      <PanelResizeHandle style={{ width: '4px', background: '#ccc' }} />
      <Panel>{children[1]}</Panel>
    </PanelGroup>
  );
}
