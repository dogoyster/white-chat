import React from 'react';
import Editor from '@monaco-editor/react';
import './CodeViewer.css';

interface CodeViewerProps {
  code: string;
  language: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, language }) => {
  return (
    <div className="code-viewer">
      <div className="viewer-header">
        <h3>Output Code</h3>
        <span className="language-badge">{language}</span>
      </div>
      
      <div className="viewer-container">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
};

export default CodeViewer; 