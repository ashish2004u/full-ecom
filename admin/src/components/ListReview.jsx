import React, { useState } from "react";

const ReviewDropdown = ({ products }) => {
  // Filter only products with reviews
  const productsWithReviews = products.filter(p => p.reviews && p.reviews.length > 0);

  // State: selected product id (default first)
  const [selectedProductId, setSelectedProductId] = useState(productsWithReviews[0]?.id || null);

  // State: selected review id (default first review of selected product)
  const selectedProduct = productsWithReviews.find(p => p.id === selectedProductId);
  const [selectedReviewId, setSelectedReviewId] = useState(selectedProduct?.reviews[0]?.id || null);

  const selectedReview = selectedProduct?.reviews.find(r => r.id === selectedReviewId);

  return (
    <div className=" mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Select Product to see Reviews</h2>

      {/* Product dropdown */}
      <select
        className="border p-2 rounded w-full mb-4"
        value={selectedProductId}
        onChange={e => {
          const newProductId = e.target.value;
          setSelectedProductId(newProductId);
          // Reset review selection on product change
          const newProduct = productsWithReviews.find(p => p.id === newProductId);
          setSelectedReviewId(newProduct?.reviews[0]?.id || null);
        }}
      >
        {productsWithReviews.map(product => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      {/* Show selected product image and name */}
      {selectedProduct && (
        <div className="mb-4 flex items-center gap-4">
          <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-20 h-20 object-cover rounded" />
          <h3 className="text-lg font-medium">{selectedProduct.name}</h3>
        </div>
      )}

      {/* Review dropdown */}
      {selectedProduct && (
        <>
          <label htmlFor="reviewSelect" className="block mb-1 font-medium">Select Review:</label>
          <select
            id="reviewSelect"
            className="border p-2 rounded w-full mb-4"
            value={selectedReviewId}
            onChange={e => setSelectedReviewId(Number(e.target.value))}
          >
            {selectedProduct.reviews.map(review => (
              <option key={review.id} value={review.id}>
                {review.name} - {"⭐".repeat(review.rating)}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Show selected review details */}
      {selectedReview && (
        <div className="border p-4 rounded bg-gray-50">
          <p><b>{selectedReview.name}</b> - {"⭐".repeat(selectedReview.rating)}</p>
          <p>{selectedReview.comment}</p>
          <small className="text-gray-500">{selectedReview.date}</small>
        </div>
      )}
    </div>
  );
};

export default ReviewDropdown;
