const {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
} = require('./models/products.js');

const {
  createUserCustomer,
  fetchAllUsers,
  fetchUserById,
  updateUser,
  deleteUser,
} = require('./models/user.js');

const {
  createCategory,
  fetchAllCategories,
  fetchCategoryById,
  updateCategory,
  deleteCategory,
} = require('./models/categories.js');

const {
  createWishlistItem,
  fetchAllWishlistItems,
  fetchWishlistItemsById,
  fetchAllWishlists,
  deleteWishlistItemByIds,
} = require('./models/wishlist.js');

const { authenticateUser, findUserByToken } = require('./models/auth.js');

const {
  fetchAllCarts,
  fetchCartById,
  addCartItem,
  fetchCartItemsById,
  updateCartItem,
  deleteCartItem,
} = require('./models/cart.js');

const {
  createCustomerOrder,
  addOrderedItems,
  fetchAllOrders,
  fetchOrdersById,
  fetchAllOrderItems,
  fetchOrderedItemsByID,
  updateCustomerOrderStatus,
  deleteCustomerOrder,
  deleteOrderdItem,
} = require('./models/orders.js');

const { createAdmin, fetchAllAdmins } = require('./models/admin.js');

const {
  createProductReview,
  fetchAllReviews,
  fetchReviewsByProduct,
  fetchReviewsByUser,
  updateProductReview,
  deleteProductReview,
} = require('./models/reviews.js');

module.exports = {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
  createAdmin,
  createUserCustomer,
  fetchAllUsers,
  fetchUserById,
  updateUser,
  deleteUser,
  createCategory,
  fetchAllCategories,
  fetchCategoryById,
  updateCategory,
  deleteCategory,
  createWishlistItem,
  fetchAllWishlists,
  fetchAllWishlistItems,
  fetchWishlistItemsById,
  deleteWishlistItemByIds,
  authenticateUser,
  findUserByToken,
  fetchAllCarts,
  fetchCartById,
  addCartItem,
  fetchCartItemsById,
  updateCartItem,
  createCustomerOrder,
  addOrderedItems,
  fetchAllOrders,
  fetchOrdersById,
  fetchAllOrderItems,
  fetchOrderedItemsByID,
  updateCustomerOrderStatus,
  deleteOrderdItem,
  deleteCartItem,
  fetchAllAdmins,
  createProductReview,
  fetchAllReviews,
  fetchReviewsByProduct,
  fetchReviewsByUser,
  updateProductReview,
  deleteProductReview,
};
