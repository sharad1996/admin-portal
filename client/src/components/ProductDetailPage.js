import ProductCard from "./ProductCard";

const ProductDetailPage = ({ productList }) => {
  return (
    <div className="product-container">
      {productList &&
        productList?.map((product) => (
          <div className="product-item">
            <ProductCard product={product} />
          </div>
        ))}
    </div>
  );
};

export default ProductDetailPage;
