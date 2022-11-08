import React, { FC, createContext, useEffect, useState } from 'react';
import ContentstackLivePreview from '@contentstack/live-preview-utils';

const LivePreviewContext = createContext(Date.now());

type Props = {
  children: React.ReactNode;
};

const LivePreviewProvider: FC<Props> = ({ children }) => {
  const [lpTs, setLpTs] = useState(Date.now());

  useEffect(() => {
    ContentstackLivePreview.onEntryChange(updateContent);
  }, []);

  const updateContent = () => {
    setLpTs(Date.now());
  };

  return (
    <LivePreviewContext.Provider value={lpTs}>
      {children}
    </LivePreviewContext.Provider>
  );
};

export { LivePreviewProvider, LivePreviewContext };
