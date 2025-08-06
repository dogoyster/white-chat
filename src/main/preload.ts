import { contextBridge, ipcRenderer } from 'electron';

// API를 렌더러 프로세스에 노출
contextBridge.exposeInMainWorld('electronAPI', {
  // 파일 관련 API
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content: string) => ipcRenderer.invoke('dialog:saveFile', content),
  
  // 설정 관련 API
  getSettings: () => ipcRenderer.invoke('settings:get'),
  saveSettings: (settings: any) => ipcRenderer.invoke('settings:save', settings),
}); 