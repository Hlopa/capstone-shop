import { applyMiddleware, compose, createStore  } from "redux";
import {logger} from 'redux-logger';
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleWares = [process.env.NODE_ENV !== 'productiont' && logger].filter(Boolean);


//Если используем Redux DevTools в хроме
const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

//если не ипользуем Redux DevTools
// const composedEnhancers = compose(applyMiddleware(...middleWares))

const persisConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
