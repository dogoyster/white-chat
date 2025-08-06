import React from 'react';
import { ReplacementResult } from '../types/replacement';
import './ReplacementStats.css';

interface ReplacementStatsProps {
  result: ReplacementResult | null;
}

const ReplacementStats: React.FC<ReplacementStatsProps> = ({ result }) => {
  if (!result || result.replacements.length === 0) {
    return (
      <div className="replacement-stats">
        <div className="stats-header">
          <h3>치환 통계</h3>
        </div>
        <div className="no-replacements">
          <p>치환된 내용이 없습니다.</p>
        </div>
      </div>
    );
  }

  const totalReplacements = result.replacements.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="replacement-stats">
      <div className="stats-header">
        <h3>치환 통계</h3>
        <div className="total-count">
          총 {totalReplacements}개 치환됨
        </div>
      </div>
      
      <div className="stats-list">
        {result.replacements.map((item, index) => (
          <div key={index} className="stat-item">
            <div className="stat-info">
              <div className="stat-original">
                <span className="label">찾은 텍스트:</span>
                <span className="value">{item.original}</span>
              </div>
              <div className="stat-replacement">
                <span className="label">치환된 텍스트:</span>
                <span className="value">{item.replacement}</span>
              </div>
            </div>
            <div className="stat-count">
              {item.count}회
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplacementStats; 