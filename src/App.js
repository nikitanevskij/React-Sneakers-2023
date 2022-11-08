import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './components/Home';
import Orders from './components/Orders';
import Header from './components/Header';
import Drawer from './components/Drawer/index';
import Favorites from './components/Favorites';

import {
  fetchGETCartSneakers,
  fetchADDCartSneakers,
  fetchDELCartSneakers,
} from './redux/fetchCartSlice';
import { fetchGETSneakers, setIsLoading } from './redux/fetchSneakersSlice';
import { fetchADDFavorite, fetchDELFavorite, fetchGETFavorite } from './redux/fetchFavoriteSlice';

const App = () => {
  const dispatch = useDispatch();
  const { cartSneakers } = useSelector((state) => state.fetchCartSlice);
  const { favoriteSneakers } = useSelector((state) => state.fetchFavoriteSlice);

  React.useEffect(() => {
    dispatch(fetchGETSneakers());
    dispatch(fetchGETCartSneakers());
    dispatch(fetchGETFavorite());
    dispatch(setIsLoading(false));
  }, []);

  const ADDSneakersToCart = (obj) => {
    const findItem = cartSneakers.find((item) => Number(item.parentId) === Number(obj.id));
    findItem ? dispatch(fetchDELCartSneakers(findItem.id)) : dispatch(fetchADDCartSneakers(obj));
  };

  const ADDSneakersToFavorite = (obj) => {
    const findItem = favoriteSneakers.find((item) => Number(item.parentId) === Number(obj.id));
    findItem ? dispatch(fetchDELFavorite(findItem.id)) : dispatch(fetchADDFavorite(obj));
  };

  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              ADDSneakersToFavorite={ADDSneakersToFavorite}
              ADDSneakersToCart={ADDSneakersToCart}
            />
          }
        />
        <Route
          path="/favorite"
          exact
          element={
            <Favorites
              ADDSneakersToCart={ADDSneakersToCart}
              ADDSneakersToFavorite={ADDSneakersToFavorite}
            />
          }
        />
        <Route path="/orders" exact element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
