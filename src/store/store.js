import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlices";

export const store = configureStore({
    reducer:{
        ui:uiSlice
    }
})