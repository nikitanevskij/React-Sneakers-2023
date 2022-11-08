import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card/Card';

const Favorites = ({ ADDSneakersToCart, ADDSneakersToFavorite }) => {
  const { favoriteSneakers } = useSelector((state) => state.fetchFavoriteSlice);
  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои закладки</h1>
        </div>

        {/*основной блок карточек кроссовок в закладках*/}
        <div className="d-flex flex-wrap">
          {favoriteSneakers.map((obj, index) => (
            <Card
              key={`${index} ${obj.price}`}
              visible={false}
              {...obj}
              onFavorite={(obj) => ADDSneakersToFavorite(obj)}
              onPlus={(obj) => ADDSneakersToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
