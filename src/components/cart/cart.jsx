import React, { useEffect } from "react";
import "./cart.scss";
import Payment from "../payment/payment";
import formatCurrency from "../../helpers/formatCurrency";

const Cart = (props) => {
  let [orders, setOrders] = React.useState([]);
  let [paymentOpen, openPayment] = React.useState(false);

  useEffect(() => {
    listOrders();
    closeOrdersClickOutside();
  }, []);

  const checkStorage = () => {
    return localStorage.getItem("orders") ? true : false;
  };

  const closeOrdersClickOutside = () => {
    const orders = document.querySelector(".cart-container .orders-list");

    document.addEventListener("click", function (event) {
      let isClickInside = orders.contains(event.target);
      if (isClickInside) {
      } else {
        if (!event.target.classList.contains("open-orders")) {
          orders.classList.remove("active");
        }
      }
    });
  };

  const openOrders = (e) => {
    const orders = document.querySelector(".cart-container .orders-list");
    if (orders.classList.contains("active")) {
      orders.classList.remove("active");
    } else {
      orders.classList.add("active");
      listOrders();
    }
  };

  const listOrders = () => {
    if (checkStorage()) {
      const ordersStorage = JSON.parse(localStorage.getItem("orders"));
      setOrders(ordersStorage);
    }
  };

  const calcOrdersTotal = () => {
    let prices = [];

    if (checkStorage()) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      prices = orders.map((order) => order.product_price * order.quantity);
    }
    return formatCurrency(prices.reduce((total, num) => total + num));
  };

  const Currency = (props) => {
    const total = props.number * props.quantity;
    return <strong className="price">{formatCurrency(total)}</strong>;
  };

  const openPaymentModal = (open) => {
    openPayment(open);
  };

  const PaymentModal = () => {
    if (paymentOpen) {
      return <Payment open={openPaymentModal} />;
    } else {
      return null;
    }
  };

  const Orders = () => {
    if (checkStorage()) {
      return orders.map((order, index) => (
        <div className="order" key={index}>
          <div className="content">
            <div className="img-container">
              <img src={order.product_image} alt={order.product_name} />
            </div>
            <div className="order-content">
              <strong className="prod-name">
                {order.product_name} X{order.quantity}
              </strong>
              <Currency
                number={order.product_price}
                quantity={order.quantity}
              />
              <p className="observation">{order.observation}</p>
            </div>
          </div>
        </div>
      ));
    } else {
      return <h3 className="heading">Carinho vazio</h3>;
    }
  };

  const FinishOrder = () => {
    if (checkStorage()) {
      return (
        <React.Fragment>
          <div className="total">
            <strong>
              Total: <span>{calcOrdersTotal()}</span>
            </strong>
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => openPaymentModal(true)}
          >
            Pedir
          </button>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="cart-container">
      <PaymentModal />
      <button
        type="button"
        className="btn open-orders"
        onClick={openOrders}
        style={{ backgroundImage: "url('assets/images/market.png')" }}
      ></button>
      <div className="orders-list">
        <Orders />
        <FinishOrder />
      </div>
    </div>
  );
};
export default Cart;
