import axios from 'axios'

const API_URL = 'http://localhost:8000/api/products/'

const getProducts = async () => {
  const { data } = await axios.get(API_URL)
  return data
}

const getSingleProduct = async (id) => {
  const { data } = await axios.get(API_URL + id)
  return data
}

const productService = {
  getProducts,
  getSingleProduct,
}

export default productService
