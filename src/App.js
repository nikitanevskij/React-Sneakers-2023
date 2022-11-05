import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSneakers, setIsLoading } from './redux/fetchSneakersSlice';
import Drawer from './components/Drawer/index';
import Header from './components/Header';
import Home from './components/Home';
import Favorites from './components/Favorites';
import AppContext from './components/context';
import Orders from './components/Orders';
import {
  fetchGETCartSneakers,
  fetchADDCartSneakers,
  fetchDELCartSneakers,
} from './redux/fetchCartSlice';

function App() {
  const dispatch = useDispatch();
  const { sneakers } = useSelector((state) => state.fetchSneakersSlice);
  const { cartSneakers } = useSelector((state) => state.fetchCartSlice);

  const [cardFavorite, setCardFavorite] = React.useState([]); //карточки кроссовок в закладках
  const [closeDrawer, setCloseDrawer] = React.useState(false); // закрытие корзины

  React.useEffect(() => {
    async function fetchData() {
      try {
        dispatch(fetchSneakers());
        dispatch(fetchGETCartSneakers());

        const favoriteResponse = await axios.get(
          'https://6161517ee46acd001777c003.mockapi.io/favorites',
        );

        dispatch(setIsLoading(false));
        setCardFavorite(favoriteResponse.data);
      } catch (error) {
        alert('Не получили ответы');
      }
    }
    fetchData();
  }, []);

  const ADDSneakersToCart = (obj) => {
    const findItem = cartSneakers.find((item) => Number(item.parentId) === Number(obj.id));
    findItem ? dispatch(fetchDELCartSneakers(findItem.id)) : dispatch(fetchADDCartSneakers(obj));
  }; //добавляем кроссовки в хранилище корзины

  const totalPriceCart = (arr) => arr.reduce((acc, obj) => acc + obj.price, 0); // получаем итоговую сумму товаров в корзине

  const favoriteCart = async (obj) => {
    try {
      if (cardFavorite.find((items) => items.id === obj.id)) {
        axios.delete(`https://6161517ee46acd001777c003.mockapi.io/favorites/${obj.id}`);
        setCardFavorite((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          'https://6161517ee46acd001777c003.mockapi.io/favorites',
          obj,
        );
        setCardFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  }; // добавляем понравившиеся кроссовки d favorites

  return (
    <AppContext.Provider
      value={{
        sneakers,
        cardFavorite,
        favoriteCart,
        setCloseDrawer,
        ADDSneakersToCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onClickClose={() => setCloseDrawer(false)}
          sneakers={cartSneakers}
          itogo={totalPriceCart(cartSneakers)}
          opened={closeDrawer}
        />
        <Header onClickClose={() => setCloseDrawer(true)} itogo={totalPriceCart(cartSneakers)} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                sneakers={sneakers}
                favoriteCart={favoriteCart}
                ADDSneakersToCart={ADDSneakersToCart}
              />
            }
          />
          <Route path="/favorite" exact element={<Favorites />} />
          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
