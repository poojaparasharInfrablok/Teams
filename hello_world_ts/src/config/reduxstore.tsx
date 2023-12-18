import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { withExtraArgument } from 'redux-thunk'
import rootReducers from '../redux/rootreducer';
//const reduxstore = createStore(rootReducers, applyMiddleware(thunk));
const reduxstore = createStore(rootReducers, applyMiddleware(withExtraArgument()))
export default reduxstore;
