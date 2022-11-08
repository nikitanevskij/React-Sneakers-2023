import React from 'react';
import Card from '../components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGETSneakers } from '../redux/fetchSneakersSlice';
import debounce from 'lodash.debounce';

const Home = ({ ADDSneakersToFavorite, ADDSneakersToCart }) => {
  const dispatch = useDispatch();

  const { sneakers, isLoading } = useSelector((state) => state.fetchSneakersSlice);
  const [itemInput, setItemInput] = React.useState('');

  const updateSearchValue = React.useCallback(
    debounce((str) => dispatch(fetchGETSneakers(str)), 500),
    [],
  );

  const valueInput = (e) => {
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
        key={`${index} `}
        onFavorite={(item) => ADDSneakersToFavorite(item)}
        onPlus={(item) => ADDSneakersToCart(item)}
        loading={isLoading}
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
