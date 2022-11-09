import React, { ChangeEvent } from 'react';
import Card from './Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGETSneakers } from '../redux/fetchSneakersSlice';
import debounce from 'lodash.debounce';
import { fetchADDCartSneakers, fetchDELCartSneakers } from '../redux/fetchCartSlice';
import { fetchADDFavorite, fetchDELFavorite } from '../redux/fetchFavoriteSlice';

type TSneakersADD = {
  id: string;
  imgURL: string;
  parentId: string;
  price: number;
  title: string;
};

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [itemInput, setItemInput] = React.useState('');

  const { cartSneakers } = useSelector((state: any) => state.fetchCartSlice);
  const { favoriteSneakers } = useSelector((state: any) => state.fetchFavoriteSlice);
  const { sneakers, isLoading } = useSelector((state: any) => state.fetchSneakersSlice);

  const ADDSneakersToCart = (obj: TSneakersADD) => {
    const findItem = cartSneakers.find((item: any) => Number(item.parentId) === Number(obj.id));
    //@ts-ignore
    findItem ? dispatch(fetchDELCartSneakers(findItem.id)) : dispatch(fetchADDCartSneakers(obj));
  };

  const ADDSneakersToFavorite = (obj: TSneakersADD) => {
    const findItem = favoriteSneakers.find((item: any) => Number(item.parentId) === Number(obj.id));
    //@ts-ignore
    findItem ? dispatch(fetchDELFavorite(findItem.id)) : dispatch(fetchADDFavorite(obj));
  };

  const updateSearchValue = React.useCallback(
    //@ts-ignore
    debounce((str) => dispatch(fetchGETSneakers(str)), 500),
    [],
  );

  const valueInput = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    updateSearchValue(searchValue);
    setItemInput(searchValue);
  };

  const clearInput = () => {
    //@ts-ignore
    dispatch(fetchGETSneakers());
    setItemInput('');
  };

  const renderItems = () => {
    const render = isLoading ? [...Array(10)] : sneakers;

    return render.map((obj: any, index: number) => (
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
