import React, { createContext, useEffect, useState } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { Props } from "./types";

const LivePreviewContext = createContext<number | null>(null);

const LivePreviewProvider = (props: Props) => {
  const [lpTs, setLpTs] = useState(Date.now());

  useEffect(() => {
    ContentstackLivePreview.onEntryChange(updateContent);
  }, []);

  const updateContent = () => {
    setLpTs(Date.now());
  };

  return (
    <LivePreviewContext.Provider value={lpTs}>
      {props.children}
    </LivePreviewContext.Provider>
  );
};

const useLivePreviewCtx = () => React.useContext(LivePreviewContext);

export { LivePreviewProvider, useLivePreviewCtx };
