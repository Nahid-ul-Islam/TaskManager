import { configureStore } from "@reduxjs/toolkit";
import { tasksAPI } from "@/redux/slice/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import searchSlice from "./slice/searchSlice";

export const store = configureStore({
    reducer: {
        [tasksAPI.reducerPath]: tasksAPI.reducer,
        searchReducer : searchSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tasksAPI.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

