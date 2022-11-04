import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import Drawer from './components/Drawer/index';
import Header from './components/Header';
import Home from './components/Home';
import Favorites from './components/Favorites';
import AppContext from './components/context';
import Orders from './components/Orders';

function App() {
  const [sneakers, setSneakers] = React.useState([]); // карточки кроссовок на главной
  const [cardSneakers, setCardSneakers] = React.useState([]); //карточки кроссовок в корзине
  const [cardFavorite, setCardFavorite] = React.useState([]); //карточки кроссовок в закладках
  const [closeDrawer, setCloseDrawer] = React.useState(false); // закрытие корзины
  const [itemInput, setItemInput] = React.useState(''); // хранилище input
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      // fetch("https://6161517ee46acd001777c003.mockapi.io/items")
      //   .then((res) => res.json())
      //   .then((items) => setSneakers(items));
      async function fetchData() {
        const favoriteResponse = await axios.get(
          'https://6161517ee46acd001777c003.mockapi.io/cart',
        ); // получаем кроссовки из БД для favorites

        const itemsResponse = await axios.get(
          'https://6161517ee46acd001777c003.mockapi.io/favorites',
        ); // получаем кроссовки из БД для корзины
        const cartResponse = await axios.get('https://6161517ee46acd001777c003.mockapi.io/items'); // получаем кроссовки из БД для главной страницы

        setIsLoading(false);
        setCardSneakers(favoriteResponse.data);
        setCardFavorite(itemsResponse.data);
        setSneakers(cartResponse.data);
      }
      fetchData();
    } catch (error) {
      alert('Не получили ответы ');
    }
  }, []);

  const setToCard = async (obj) => {
    try {
      const findItem = cardSneakers.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCardSneakers((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://6161517ee46acd001777c003.mockapi.io/cart/${findItem.id}`);
      } else {
        const { data } = await axios.post('https://6161517ee46acd001777c003.mockapi.io/cart', obj);
        setCardSneakers((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    }
  }; //добавляем кроссовки в хранилище корзины

  const sumToCard = (arr) => arr.reduce((acc, obj) => acc + obj.price, 0); // получаем итоговую сумму товаров в корзине

  const valueInput = (e) => {
    return setItemInput(e.target.value);
  }; // вытягиваем текст из input

  const onRemove = (id) => {
    axios.delete(`https://6161517ee46acd001777c003.mockapi.io/cart/${id}`);
    setCardSneakers((prev) => prev.filter((item) => item.id !== id));
  }; // удаляем кроссовки из корзины

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

  const isItemAdded = (id) => {
    return cardSneakers.some((obj) => obj.parentId === id);
  };

  return (
    <AppContext.Provider
      value={{
        sneakers,
        cardSneakers,
        cardFavorite,
        isItemAdded,
        favoriteCart,
        setCloseDrawer,
        setCardSneakers,
        setToCard,
      }}
    >
      <div className="wrapper clear">
        {/*блок корзины*/}

        <Drawer
          onClickClose={() => setCloseDrawer(false)}
          sneakers={cardSneakers}
          itogo={sumToCard(cardSneakers)}
          removeCart={onRemove}
          opened={closeDrawer}
        />

        {/*верхний блок Header и кнопка корзины*/}
        <Header onClickClose={() => setCloseDrawer(true)} itogo={sumToCard(cardSneakers)} />
        <Routes>
          <Route path="/favorite" exact element={<Favorites />} />
          <Route path="/orders" exact element={<Orders />} />
          {/*основной блок с карточками  */}
          <Route
            path="/"
            exact
            element={
              <Home
                itemInput={itemInput}
                valueInput={valueInput}
                setItemInput={setItemInput}
                sneakers={sneakers}
                favoriteCart={favoriteCart}
                setToCard={setToCard}
                cardSneakers={cardSneakers}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
