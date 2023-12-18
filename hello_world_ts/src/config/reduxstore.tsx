import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducers from '../redux/rootreducer';
 const reduxstore = createStore(rootReducers, applyMiddleware(thunk));
 export default reduxstore;
 