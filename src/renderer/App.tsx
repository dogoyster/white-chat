import React, { useState } from 'react';
import './styles/App.css';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>White Chat - Code Security Tool</h1>
      </header>
      
      <main className="app-main">
        <div className="editor-container">
          <div className="editor-header">
            <h3>Input Code</h3>
          </div>
          <textarea
            className="code-textarea"
            value={code}
            onChange={handleCodeChange}
            placeholder="여기에 코드를 입력하거나 붙여넣으세요..."
          />
        </div>
        
        <div className="viewer-container">
          <div className="viewer-header">
            <h3>Output Code</h3>
          </div>
          <div className="code-display">
            <pre>{code}</pre>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App; 