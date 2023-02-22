import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../store/features/products/productSlice'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

function HomeScreen() {
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(getProducts())
    }
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Row>
          {products.map((product, index) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
