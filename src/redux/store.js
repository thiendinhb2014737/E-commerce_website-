import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/productSlide'
import userReducer from './slice/UserSlide'
import orderReducer from './slice/orderSlide'
import loveProReducer from './slice/loveProductSlice'

import orderEvaluateSlice from './slice/orderEvaluateSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['product', 'user']
}
const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer,
    order: orderReducer,
    lovePro: loveProReducer,
    orderEvaluate: orderEvaluateSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export let persistor = persistStore(store)

