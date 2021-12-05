const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = (products) => {
    return {
      type: SET_PRODUCTS,
      payload: products,
    }
  }
  
