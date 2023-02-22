import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
  products: [],
  product: {},
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
}

// Get ALL products
export const getProducts = createAsyncThunk(
  'api/products/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await productService.getProducts()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      )
    }
  }
)

// Get SINGLE product
export const getSingleProduct = createAsyncThunk(
  'api/products/:id',
  async (id, thunkAPI) => {
    try {
      const response = await productService.getSingleProduct(id)

      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      )
    }
  }
)

export const productSlice = createSlice({
  name: 'api/products',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = productSlice.actions
export default productSlice
