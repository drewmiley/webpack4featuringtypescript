import {compose, createStore} from 'redux';

import reducer from './reducer';

const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default createStoreDevTools(reducer, { number: 0 });
