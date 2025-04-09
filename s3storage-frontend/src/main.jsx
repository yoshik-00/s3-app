import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 開発環境でのみモックを有効化
if (import.meta.env.MODE === 'development') {
  import('./mocks/browser')
    .then(({ worker }) => {
      console.log('[MSW] worker.start() 実行');
      worker.start();
    })
    .catch((err) => {
      console.error('Failed to start MSW:', err);
    });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
