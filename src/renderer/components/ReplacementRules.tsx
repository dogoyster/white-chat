import React, { useState } from 'react';
import { ReplacementRule } from '../types/replacement';
import './ReplacementRules.css';

interface ReplacementRulesProps {
  rules: ReplacementRule[];
  onRulesChange: (rules: ReplacementRule[]) => void;
}

const ReplacementRules: React.FC<ReplacementRulesProps> = ({
  rules,
  onRulesChange,
}) => {
  const [editingRule, setEditingRule] = useState<ReplacementRule | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddRule = () => {
    const newRule: ReplacementRule = {
      id: Date.now().toString(),
      original: '',
      replacement: '',
      isEnabled: true,
      isRegex: false,
      caseSensitive: false,
      description: '',
    };
    setEditingRule(newRule);
    setShowAddForm(true);
  };

  const handleEditRule = (rule: ReplacementRule) => {
    setEditingRule({ ...rule });
    setShowAddForm(true);
  };

  const handleDeleteRule = (id: string) => {
    const updatedRules = rules.filter(rule => rule.id !== id);
    onRulesChange(updatedRules);
  };

  const handleToggleRule = (id: string) => {
    const updatedRules = rules.map(rule =>
      rule.id === id ? { ...rule, isEnabled: !rule.isEnabled } : rule
    );
    onRulesChange(updatedRules);
  };

  const handleSaveRule = () => {
    if (!editingRule || !editingRule.original.trim() || !editingRule.replacement.trim()) {
      return;
    }

    const existingIndex = rules.findIndex(rule => rule.id === editingRule.id);
    let updatedRules: ReplacementRule[];

    if (existingIndex >= 0) {
      // 기존 규칙 수정
      updatedRules = rules.map(rule =>
        rule.id === editingRule.id ? editingRule : rule
      );
    } else {
      // 새 규칙 추가
      updatedRules = [...rules, editingRule];
    }

    onRulesChange(updatedRules);
    setEditingRule(null);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
    setShowAddForm(false);
  };

  return (
    <div className="replacement-rules">
      <div className="rules-header">
        <h3>치환 규칙</h3>
        <button className="add-rule-btn" onClick={handleAddRule}>
          + 규칙 추가
        </button>
      </div>

      <div className="rules-list">
        {rules.map(rule => (
          <div key={rule.id} className={`rule-item ${!rule.isEnabled ? 'disabled' : ''}`}>
            <div className="rule-header">
              <label className="rule-toggle">
                <input
                  type="checkbox"
                  checked={rule.isEnabled}
                  onChange={() => handleToggleRule(rule.id)}
                />
                <span className="toggle-slider"></span>
              </label>
              <div className="rule-info">
                <div className="rule-original">{rule.original}</div>
                <div className="rule-replacement">→ {rule.replacement}</div>
                {rule.description && (
                  <div className="rule-description">{rule.description}</div>
                )}
              </div>
              <div className="rule-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEditRule(rule)}
                >
                  수정
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteRule(rule.id)}
                >
                  삭제
                </button>
              </div>
            </div>
            <div className="rule-flags">
              {rule.isRegex && <span className="flag regex">정규식</span>}
              {rule.caseSensitive && <span className="flag case">대소문자 구분</span>}
            </div>
          </div>
        ))}
      </div>

      {showAddForm && editingRule && (
        <div className="rule-form-overlay">
          <div className="rule-form">
            <h4>{editingRule.id ? '규칙 수정' : '새 규칙 추가'}</h4>
            
            <div className="form-group">
              <label>찾을 텍스트:</label>
              <input
                type="text"
                value={editingRule.original}
                onChange={(e) => setEditingRule({ ...editingRule, original: e.target.value })}
                placeholder="치환할 텍스트를 입력하세요"
              />
            </div>

            <div className="form-group">
              <label>바꿀 텍스트:</label>
              <input
                type="text"
                value={editingRule.replacement}
                onChange={(e) => setEditingRule({ ...editingRule, replacement: e.target.value })}
                placeholder="치환될 텍스트를 입력하세요"
              />
            </div>

            <div className="form-group">
              <label>설명 (선택사항):</label>
              <input
                type="text"
                value={editingRule.description || ''}
                onChange={(e) => setEditingRule({ ...editingRule, description: e.target.value })}
                placeholder="규칙에 대한 설명"
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={editingRule.isRegex}
                  onChange={(e) => setEditingRule({ ...editingRule, isRegex: e.target.checked })}
                />
                정규표현식 사용
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={editingRule.caseSensitive}
                  onChange={(e) => setEditingRule({ ...editingRule, caseSensitive: e.target.checked })}
                />
                대소문자 구분
              </label>
            </div>

            <div className="form-actions">
              <button className="save-btn" onClick={handleSaveRule}>
                저장
              </button>
              <button className="cancel-btn" onClick={handleCancelEdit}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplacementRules;