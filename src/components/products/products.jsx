import React from "react";
import Product from "./product/product";
import ProductModal from "./product/product-modal/product-modal";
import Cart from "../cart/cart";
import Bag from "../bag/bag";
import productsJson from "../../restaurants.json";
import "./products.scss";

const ModalContext = React.createContext({
  modalOpen: false,
  showModal: () => {},
  hideModal: () => {},
});

const Products = (props) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState({});

  React.useEffect(() => {
    setProducts(Array.from(productsJson));
  }, []);

  const showModal = () => {
    setModalOpen(true);
  };
  const hideModal = () => {
    setModalOpen(false);
  };

  const modalProvider = {
    modalOpen,
    showModal,
    hideModal,
  };

  const chosenProductParent = (prod) => {
    setProduct(prod);
  };

  return (
    <ModalContext.Provider value={modalProvider}>
      <ModalContext.Consumer>
        {({ showModal, hideModal, modalOpen }) => (
          <section className="products-container container">
            <Cart />
            <Bag />
            <header className="header">
              <h2 className="heading">Faça sua(s) escolha(s)</h2>
            </header>
            <div className="products">
              {products.map((product) => (
                <Product
                  key={product.product_id}
                  {...{ showModal, product, chosenProductParent }}
                  className="card"
                />
              ))}
              <ProductModal {...{ hideModal, modalOpen, product }} />
            </div>
          </section>
        )}
      </ModalContext.Consumer>
    </ModalContext.Provider>
  );
};
export default Products;
