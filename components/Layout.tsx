import React from 'react';
import Split from 'react-split';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Chat from './Chat';

const Layout: React.FC = () => {
  return (
    <Split className="flex h-screen" sizes={[20, 50, 30]} minSize={100}>
      <Sidebar />
      <Editor />
      <Chat />
    </Split>
  );
};

export default Layout;
