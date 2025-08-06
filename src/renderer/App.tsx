import React, { useState, useEffect } from 'react';
import TabPanel from './components/TabPanel';
import ReplacementRules from './components/ReplacementRules';
import ReplacementStats from './components/ReplacementStats';
import { ReplacementRule, ReplacementResult } from './types/replacement';
import { applyReplacements, getDefaultRules } from './utils/replacement';
import './styles/App.css';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [rules, setRules] = useState<ReplacementRule[]>(getDefaultRules());
  const [replacementResult, setReplacementResult] = useState<ReplacementResult | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(300);

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const handleRulesChange = (newRules: ReplacementRule[]) => {
    setRules(newRules);
  };

  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width);
  };

  // 코드가 변경될 때마다 치환 실행
  useEffect(() => {
    if (code.trim()) {
      const result = applyReplacements(code, rules);
      setReplacementResult(result);
    } else {
      setReplacementResult(null);
    }
  }, [code, rules]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>White Chat - Code Security Tool</h1>
      </header>
      
      <main className="app-main">
        <TabPanel
          tabs={[
            { id: 'rules', label: '치환 규칙', icon: '⚙️' },
            { id: 'stats', label: '치환 통계', icon: '📊' }
          ]}
          defaultActiveTab="rules"
          sidebarWidth={sidebarWidth}
          onSidebarWidthChange={handleSidebarWidthChange}
        >
          <div data-tab-id="rules">
            <ReplacementRules
              rules={rules}
              onRulesChange={handleRulesChange}
            />
          </div>
          <div data-tab-id="stats">
            <ReplacementStats result={replacementResult} />
          </div>
        </TabPanel>
        
        <div className="main-content">
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
              <pre>{replacementResult?.replacedCode || code}</pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App; 