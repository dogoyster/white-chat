import React from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onCodeChange,
  onLanguageChange,
}) => {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onCodeChange(value);
    }
  };

  const detectLanguage = (code: string): string => {
    // 간단한 언어 감지 로직
    if (code.includes('function') || code.includes('const') || code.includes('let')) {
      return 'javascript';
    }
    if (code.includes('def ') || code.includes('import ')) {
      return 'python';
    }
    if (code.includes('public class') || code.includes('private ')) {
      return 'java';
    }
    if (code.includes('#include') || code.includes('int main')) {
      return 'cpp';
    }
    return 'javascript';
  };

  const handleCodePaste = (event: React.ClipboardEvent) => {
    const pastedText = event.clipboardData.getData('text');
    const detectedLang = detectLanguage(pastedText);
    if (detectedLang !== language) {
      onLanguageChange(detectedLang);
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <h3>Input Code</h3>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="language-selector"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
          <option value="php">PHP</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
        </select>
      </div>
      
      <div className="editor-container" onPaste={handleCodePaste}>
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
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

export default CodeEditor; 