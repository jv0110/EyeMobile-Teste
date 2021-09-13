import React, { useEffect } from "react";
import "./product.scss";
import formatCurrency from "../../../helpers/formatCurrency";

const Products = (props) => {
  const { product, chosenProductParent } = props;

  const openModal = () => {
    const { showModal } = props;
    showModal();
  };

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = () => {
    chosenProductParent(product);
  };
  return (
    <article className="product-card" key={product.product_id}>
      <div className="img-container">
        <img src={product.product_image} alt={product.product_name} />
      </div>
      <div className="content">
        <h3 className="heading">{product.product_name} </h3>
        <strong className="price">
          {formatCurrency(product.product_price)}
        </strong>
        <button
          type="button"
          className="btn"
          onClick={() => {
            openModal();
            getProductById();
          }}
        >
          Comprar
        </button>
      </div>
    </article>
  );
};
export default Products;
