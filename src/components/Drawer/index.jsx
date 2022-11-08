import React from 'react';
import styles from './Drawer.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDELCartSneakers,
  fetchPOSTCartSneakers,
  setClosedDrawer,
} from '../../redux/fetchCartSlice';
import Info from '../info';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const { orderId, cartSneakers, totalPrice, closedDrawer } = useSelector(
    (state) => state.fetchCartSlice,
  );

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      dispatch(fetchPOSTCartSneakers());
      setIsOrderComplete(true);
      for (let i = 0; i < cartSneakers.length; i++) {
        const item = cartSneakers[i];
        dispatch(fetchDELCartSneakers(item.id));
        await delay(500);
      }
    } catch (error) {
      alert('Не удалось создать заказ :(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${closedDrawer && styles.overlayVisible}`}>
      <div className={styles.drawer}>
        {/*верхний блок корзины название и кнопка закрытия*/}
        <h2 className="d-flex justify-between mb-30  ">
          Корзина
          <img
            className="removeBtn cu-p"
            src="img/btn-remove.svg"
            alt="remove"
            onClick={() => dispatch(setClosedDrawer())}
          />
        </h2>
        {cartSneakers.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {cartSneakers.map((items, index) => (
                <div key={index} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${items.imgURL})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{items.title}</p>
                    <b>{items.price} руб.</b>
                  </div>
                  <img
                    onClick={() => dispatch(fetchDELCartSneakers(items.id))}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ
                <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Заказ #${orderId}  будет передан курьерской службе доставки `
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            onClickClose={() => dispatch(setClosedDrawer())}
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
