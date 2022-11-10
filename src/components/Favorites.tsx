import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import Card from './Card/Card';

const Favorites: React.FC = () => {
  const { favoriteSneakers } = useSelector((state: RootState) => state.fetchFavoriteSlice);
  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои закладки</h1>
        </div>
        {/*основной блок карточек кроссовок в закладках*/}
        <div className="d-flex flex-wrap">
          {favoriteSneakers.map((obj, index) => (
            <Card key={`${index} ${obj.price}`} {...obj} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
