import debounce from 'lodash.debounce';
import React, { ChangeEvent } from 'react';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchGETSneakers } from '../redux/fetchSneakersSlice';
import { fetchADDFavorite, fetchDELFavorite } from '../redux/fetchFavoriteSlice';
import { fetchADDCartSneakers, fetchDELCartSneakers } from '../redux/fetchCartSlice';

import Card from './Card/Card';

type TSneakersADD = {
  id: string;
  price: number;
  title: string;
  imgURL: string;
  parentId: string;
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [itemInput, setItemInput] = React.useState('');

  const { cartSneakers } = useSelector((state: RootState) => state.fetchCartSlice);
  const { favoriteSneakers } = useSelector((state: RootState) => state.fetchFavoriteSlice);
  const { sneakers, isLoading } = useSelector((state: RootState) => state.fetchSneakersSlice);

  const ADDSneakersToCart = (obj: TSneakersADD) => {
    const findItem = cartSneakers.find((item) => Number(item.parentId) === Number(obj.id));
    findItem ? dispatch(fetchDELCartSneakers(findItem.id)) : dispatch(fetchADDCartSneakers(obj));
  };

  const ADDSneakersToFavorite = (obj: TSneakersADD) => {
    const findItem = favoriteSneakers.find((item) => Number(item.parentId) === Number(obj.id));
    findItem ? dispatch(fetchDELFavorite(findItem.id)) : dispatch(fetchADDFavorite(obj));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = React.useCallback(
    debounce((str) => dispatch(fetchGETSneakers(str)), 500),
    [],
  );

  const valueInput = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    updateSearchValue(searchValue);
    setItemInput(searchValue);
  };

  const clearInput = () => {
    dispatch(fetchGETSneakers());
    setItemInput('');
  };

  const renderItems = () => {
    const render = isLoading ? [...Array(10)] : sneakers;

    return render.map((obj, index) => (
      <Card
        key={index}
        loading={isLoading}
        ADDSneakersToCart={ADDSneakersToCart}
        ADDSneakersToFavorite={ADDSneakersToFavorite}
        {...obj}
      />
    ));
  };
  return (
    <div>
      {/*промежуточный блок с поиском*/}
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{itemInput ? `Поиск по запросу: "${itemInput}"` : 'Все кроссовки'}</h1>
          {/*блок поиска*/}
          <div className="search-block d-flex">
            <img src="img/search.svg" alt="search" />
            <input onChange={valueInput} value={itemInput} placeholder="Поиск..." />
            {itemInput && (
              <img onClick={clearInput} className="cu-p" src="img/btn-remove.svg" alt="clear" />
            )}
          </div>
        </div>
        {/*основной блок карточек кроссовок на главной*/}
        <div className="d-flex flex-wrap">{renderItems()}</div>
      </div>
    </div>
  );
};

export default Home;
