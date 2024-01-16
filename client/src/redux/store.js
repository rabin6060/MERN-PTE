import {configureStore,combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import questionReducer from './question/questionSlice'
import resultReducer from './result/result'

const rootReducer = combineReducers({user:userReducer,question:questionReducer,result:resultReducer})

const persistConfig = {
    key:'root',
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store)
