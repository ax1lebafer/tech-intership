import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SkeletonTheme } from 'react-loading-skeleton';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SkeletonTheme baseColor="#d8d8d8" highlightColor="#a3a1a1">
      <App />
    </SkeletonTheme>
  </StrictMode>,
);
