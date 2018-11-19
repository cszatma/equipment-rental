import React from 'react';
import ReactDOM from 'react-dom';

import App from '@components/App';
import '@styles/index.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
