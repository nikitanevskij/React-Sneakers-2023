import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card/Card';

const Favorites: React.FC = () => {
  const { favoriteSneakers } = useSelector((state: any) => state.fetchFavoriteSlice);
  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои закладки</h1>
        </div>

        {/*основной блок карточек кроссовок в закладках*/}
        <div className="d-flex flex-wrap">
          {favoriteSneakers.map((obj: any, index: number) => (
            <Card key={`${index} ${obj.price}`} visible={false} {...obj} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
