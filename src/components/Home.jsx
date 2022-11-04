import React from "react";
import Card from "../components/Card/Card";

function Home({
  itemInput,
  valueInput,
  setItemInput,
  sneakers,
  favoriteCart,
  setToCard,
  cardSneakers,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = sneakers.filter((item) =>
      item.title.toLowerCase().includes(itemInput.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filtredItems).map((obj, index) => (
      <Card
        key={`${index} `}
        onFavorite={(item) => favoriteCart(item)}
        onPlus={(item) => setToCard(item)}
        // added={cardSneakers.some((item) => item.id === obj.id)}
        // added={isItemAdded(obj && obj.id)}
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
          <h1>
            {itemInput ? `Поиск по запросу: "${itemInput}"` : "Все кроссовки"}
          </h1>
          {/*блок поиска*/}
          <div className="search-block d-flex">
            <img src="img/search.svg" alt="search" />
            <input
              onChange={valueInput}
              value={itemInput}
              placeholder="Поиск..."
            />
            {itemInput && (
              <img
                onClick={() => setItemInput("")}
                className="cu-p"
                src="img/btn-remove.svg"
                alt="clear"
              />
            )}
          </div>
        </div>

        {/*основной блок карточек кроссовок на главной*/}
        <div className="d-flex flex-wrap">{renderItems()}</div>
      </div>
    </div>
  );
}

export default Home;
