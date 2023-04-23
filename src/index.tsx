import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Animacion } from './App';
import registerServiceWorker from "./serviceWorker";

const App = lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Animacion />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

registerServiceWorker();