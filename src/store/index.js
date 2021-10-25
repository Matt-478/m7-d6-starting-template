import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import favouritesReducer from "./reducers/favourites";
import jobsReducer from "./reducers/jobs"
import storageSession from 'redux-persist/lib/storage/session'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

export const initialState = {
  favourites: {
    elements: [],
  },
  jobs: {
    elements: [],
  },
}

const persistConfig = {
  // could use "jobs" to only save those on refresh, but "root" does it all and I need both object props to be saved
  key: "root",
  storage: storageSession
}

const mainReducer = combineReducers({
  favourites: favouritesReducer,
  jobs: jobsReducer,
})

const persistedReducer = persistReducer(persistConfig, mainReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const configureStore = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

const persistor = persistStore(configureStore)



export { configureStore, persistor }