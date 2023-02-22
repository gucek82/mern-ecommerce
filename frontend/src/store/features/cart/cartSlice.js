import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
console.log(cartItemsFromStorage)
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cartItems: [],
  shippingAddress: shippingAddressFromStorage,
}

// export const addToCart = createAsyncThunk('cart/add', async ({ id, qty }) => {
//   const { data } = await axios.get(`http://localhost:8000/api/products/${id}`)

//   const payload = {
//     product: data._id,
//     name: data.name,
//     image: data.image,
//     price: data.price,
//     countInStock: data.countInStock,
//     qty,
//   }

//   // const cart = localStorage.getItem('cartItems')
//   //   ? payload
//   //   : initialState.cartItems

//   // localStorage.setItem('cartItems', JSON.stringify())
//   return payload
// })

// export const cartRemoveItem = createAsyncThunk('cart/remove', async (id) => {
//   const { data } = await axios.get(`http://localhost:8000/api/products/${id}`)
//   const payload = {
//     product: data._id,
//   }

//   return payload
// })

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      )
      console.log(action.payload)
      if (itemInCart) {
        itemInCart.qty++
      } else {
        state.cartItems.push({ ...action.payload, qty: action.payload.qty })
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload)
      item.qty++
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload)
      if (item.qty === 1) {
        item.qty = 1
      } else {
        item.qty--
      }
    },
    cartRemoveItem: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.product._id !== action.payload._id
      )
      state.cartItems = removeItem
    },
  },
  extraReducers: (builder) => {},
})

export default cartSlice
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  cartRemoveItem,
} = cartSlice.actions
