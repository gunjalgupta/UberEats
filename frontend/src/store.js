import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice';
import detailsReducer from '../features/detailsSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        details: detailsReducer,
    },
});
