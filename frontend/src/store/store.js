import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cart/cartSlice'
import productSlice from './features/products/productSlice'

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
  },
})

export default store
