/**
 * This function calculates total price of a new order
 * @param {Array} products cartProduct: Array of Objects
 * @returns {number} Total price
 */
export const totalPrice = (products) => {
  if(!products || !Array.isArray(products)) return 0;

  return products.reduce ((sum, product) => {
    return sum + (product?.price ||  0);
    }, 0);
  };