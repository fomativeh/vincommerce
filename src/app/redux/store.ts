"use client"
import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./Features/Products/productSlice"

export const store = configureStore({
    reducer: {
        products: productSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch