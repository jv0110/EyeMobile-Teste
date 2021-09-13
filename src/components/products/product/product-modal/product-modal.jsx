import React from "react";
import "./product-modal.style.scss";

const Modal = (props) => {
  const { product } = props;
  let [quantity, setQuantityValue] = React.useState(0);
  let [observation, setObservationValue] = React.useState("");

  const hideModal = () => {
    const { hideModal } = props;
    hideModal();
    setQuantityValue(0);
    setObservationValue("");
  };

  const incrementInputValue = () => {
    setQuantityValue((quantity += 1));
  };

  const decrementInputValue = () => {
    if (quantity > 0) setQuantityValue((quantity -= 1));
  };

  const setObservationInputValue = (e) => {
    setObservationValue(e.target.value);
  };

  const saveProduct = () => {
    if (quantity > 0) {
      const storageExists = localStorage.getItem("orders") ? true : false;

      const order = {
        product_id: product.product_id,
        product_image: product.product_image,
        product_name: product.product_name,
        product_price: product.product_price,
        quantity: quantity,
        observation: observation,
        selected: true,
        paidOut: false,
      };

      if (storageExists) {
        const orders = JSON.parse(localStorage.getItem("orders"));
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
      } else {
        localStorage.setItem("orders", JSON.stringify([order]));
      }

      hideModal();
    }
  };

  return props.modalOpen ? (
    <div className="modal-wrapper">
      <div className="modal">
        <header className="header">
          <h3 className="heading">
            Você escolheu: <span>{product.product_name}</span>
          </h3>
          <button type="button" className="close-modal" onClick={hideModal}>
            X
          </button>
        </header>
        <div className="product">
          <div className="img-container">
            <img src={product.product_image} alt={product.product_name} />
          </div>
          <h3 className="heading">Quantidade</h3>
          <div className="input-group quantity">
            <button type="button" className="btn" onClick={decrementInputValue}>
              <span>-</span>
            </button>
            <input type="text" value={quantity} />
            <button type="button" className="btn" onClick={incrementInputValue}>
              <span>+</span>
            </button>
          </div>
          <div className="input-group description">
            <input
              type="text"
              value={observation}
              onChange={(e) => setObservationInputValue(e)}
              placeholder="Adicionar uma descrição"
            />
          </div>
          <div className="input-group btn-container">
            <button type="button" className="btn" onClick={saveProduct}>
              Pedir
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
