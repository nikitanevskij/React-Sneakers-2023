import React from 'react';
import { useAppDispatch } from './redux/store';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Orders from './components/Orders';
import Header from './components/Header';
import Drawer from './components/Drawer/index';
import Favorites from './components/Favorites';

import { fetchGETSneakers } from './redux/fetchSneakersSlice';
import { fetchGETFavorite } from './redux/fetchFavoriteSlice';
import { fetchGETCartSneakers } from './redux/fetchCartSlice';

const App = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchGETSneakers());
    dispatch(fetchGETCartSneakers());
    dispatch(fetchGETFavorite());
  }, []);

  return (
    <div className="wrapper clear">
      <Header />
      <Drawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
