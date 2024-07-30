import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '../../features/contact/counterSlice';
import basketReducer from '../../features/basket/basketSlice'; // 确保导入的是默认导出
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketReducer // 确保使用正确的名字
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
