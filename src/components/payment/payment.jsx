import React, { useEffect } from "react";
import "./payment.scss";

const Payment = (props) => {
  const [months, setMonths] = React.useState([]);
  const [years, setYears] = React.useState([]);
  const [done, setDone] = React.useState(false);

  useEffect(() => {
    initMonths();
    initYears();
  }, []);

  const initMonths = () => {
    setMonths([
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]);
  };

  const initYears = () => {
    let y = [];
    let yr = [];
    for (let x = 2021; x <= 2030; x++) {
      y.push(x);
    }
    yr = y.reverse();
    setYears(yr);
  };

  const Months = () => {
    return months.map((month) => <option key={month}>{month}</option>);
  };

  const Years = () => {
    return years.map((year) => <option key={year}>{year}</option>);
  };

  const closePaymentModal = () => {
    const { open } = props;
    open(false);
  };

  const changePaymentStatus = () => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    const paidOrders = JSON.parse(localStorage.getItem("paidOrders"));

    orders.forEach((order) => {
      if (order.selected) {
        order.paidOut = true;
        paidOrders.push(order);
      }
    });
    localStorage.setItem("paidOrders", JSON.stringify(paidOrders));
  };

  const clearCart = () => {
    localStorage.removeItem("orders");
  };

  const Payment = () => {
    if (!done) {
      return (
        <React.Fragment>
          <h2 className="heading">Confirmar compra</h2>
          <form id="Purchase">
            <div className="input-group flex">
              <div className="input-container pr-3">
                <label htmlFor="Name">Nome no cartão:</label>
                <input type="text" id="Name" placeholder="Nome no cartão" />
              </div>
              <div className="input-container">
                <label htmlFor="Cvv">Código de segurança:</label>
                <input type="text" id="Cvv" placeholder="CVV" maxLength="3" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="Number">Número do cartão:</label>
              <input
                type="text"
                id="Number"
                placeholder="Número do cartão"
                maxLength="16"
              />
            </div>
            <div className="input-group">
              <label>Data de validade: </label>
              <div className="input-container flex">
                <select
                  name="validationMonth"
                  id="ValidationMonth"
                  className="mr-3"
                >
                  <Months />
                </select>
                <select name="validationYear" id="ValidationYear">
                  <Years />
                </select>
              </div>
            </div>
            <div className="input-group">
              <button
                type="buttom"
                className="btn"
                onClick={() => {
                  setDone(true);
                  changePaymentStatus();
                  clearCart();
                }}
              >
                Finalizar compra
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return (
        <div className="done">
          <h2 className="heading">Pedido feito ;)</h2>
        </div>
      );
    }
  };
  return (
    <div className="payment-container">
      <button
        type="button"
        className="btn close-modal"
        onClick={closePaymentModal}
      >
        X
      </button>
      <Payment />
    </div>
  );
};

export default Payment;
