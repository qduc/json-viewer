
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import React from "react";

interface SplitPaneProps {
  children: [React.ReactNode, React.ReactNode];
}

export function SplitPane({ children }: SplitPaneProps) {
  return (
    <PanelGroup direction="horizontal" className="flex-1">
      <Panel>{children[0]}</Panel>
      <PanelResizeHandle className="panel-handle" />
      <Panel>{children[1]}</Panel>
    </PanelGroup>
  );
}
