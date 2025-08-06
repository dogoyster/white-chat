import React, { useState, useRef, useEffect } from 'react';
import { SidebarContext } from '../context/SidebarContext';
import './TabPanel.css';

interface TabPanelProps {
  children: React.ReactNode;
  tabs: Array<{
    id: string;
    label: string;
    icon?: string;
  }>;
  defaultActiveTab?: string;
  sidebarWidth?: number;
  onSidebarWidthChange?: (width: number) => void;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  tabs,
  defaultActiveTab,
  sidebarWidth: externalWidth,
  onSidebarWidthChange
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const currentWidth = isResizing ? sidebarWidth : (externalWidth || sidebarWidth);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      console.log('Mouse move - e.clientX:', e.clientX, 'newWidth:', newWidth);
      if (newWidth > 250 && newWidth <= 600) {
        setSidebarWidth(newWidth);
        onSidebarWidthChange?.(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const isCompact = currentWidth < 254;
  console.log('TabPanel - currentWidth:', currentWidth, 'isCompact:', isCompact);

  if (isCollapsed) {
    return (
      <div className="sidebar-panel collapsed" style={{ width: '48px' }}>
        <div className="sidebar-tabs collapsed">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              title={tab.label}
            >
              {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            </button>
          ))}
          <button className="expand-btn" onClick={toggleCollapse}>
            <span>◀</span>
          </button>
        </div>
        <div className="sidebar-content collapsed">
          <div className="collapsed-info">
            <div className="collapsed-tab-info">
              {activeTab === 'rules' && (
                <>
                  <span className="collapsed-icon">⚙️</span>
                  <span className="collapsed-label">치환 규칙</span>
                </>
              )}
              {activeTab === 'stats' && (
                <>
                  <span className="collapsed-icon">📊</span>
                  <span className="collapsed-label">치환 통계</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarContext.Provider value={{ isCompact }}>
      <div 
        className={`sidebar-panel ${isResizing ? 'resizing' : ''}`} 
        ref={sidebarRef} 
        style={{ width: `${currentWidth}px` }}
      >
        <div className="sidebar-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              title={tab.label}
            >
              {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            </button>
          ))}
          <button className="collapse-btn" onClick={toggleCollapse}>
            <span>▶</span>
          </button>
        </div>
        <div className="sidebar-content">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && (child.props as any)['data-tab-id'] === activeTab) {
              return child;
            }
            return null;
          })}
        </div>
        <div 
          className="resize-handle"
          onMouseDown={startResize}
        />
      </div>
    </SidebarContext.Provider>
  );
};

export default TabPanel;