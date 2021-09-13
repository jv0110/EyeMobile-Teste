import React, { useEffect } from "react";
import "./bag.scss";
import formatCurrency from "../../helpers/formatCurrency";

const Bag = () => {
  let [orders, setOrders] = React.useState([]);

  useEffect(() => {
    listOrders();
    closeOrdersClickOutside();
  }, []);

  const checkStorage = () => {
    return localStorage.getItem("paidOrders") ? true : false;
  };

  const Currency = (props) => {
    const total = props.number * props.quantity;
    return <strong className="price">{formatCurrency(total)}</strong>;
  };

  const closeOrdersClickOutside = () => {
    const orders = document.querySelector(".bag-container .orders-list");

    document.addEventListener("click", function (event) {
      let isClickInside = orders.contains(event.target);
      if (isClickInside) {
      } else {
        if (!event.target.classList.contains("open-bag")) {
          orders.classList.remove("active");
        }
      }
    });
  };

  const openOrders = (e) => {
    const orders = document.querySelector(".bag-container .orders-list");
    if (orders.classList.contains("active")) {
      orders.classList.remove("active");
    } else {
      orders.classList.add("active");
      listOrders();
    }
  };

  const listOrders = () => {
    if (checkStorage()) {
      const ordersStorage = JSON.parse(localStorage.getItem("paidOrders"));
      const paidOrders = ordersStorage.filter((order) => order.paidOut);
      setOrders(paidOrders);
    }
  };

  const Orders = () => {
    if (checkStorage()) {
      return orders.map((order) => (
        <div className="order" key={order.product_id}>
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
      return <h3 className="heading">Nenhum pedido feito</h3>;
    }
  };

  return (
    <div className="bag-container">
      <div className="btn-container">
        <button
          type="button"
          className="btn open-bag"
          onClick={openOrders}
          style={{ backgroundImage: "url('assets/images/bag.png')" }}
        ></button>
      </div>
      <div className="orders-list">
        <Orders />
      </div>
    </div>
  );
};

export default Bag;
