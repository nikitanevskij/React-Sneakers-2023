import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../components/context";

function Favorites() {
  const { cardFavorite, favoriteCart } = React.useContext(AppContext);
  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои закладки</h1>
        </div>

        {/*основной блок карточек кроссовок в закладках*/}
        <div className="d-flex flex-wrap">
          {cardFavorite.map((obj, index) => (
            <Card
              key={`${index} ${obj.price}`}
              {...obj}
              favorited={true}
              onFavorite={(obj) => favoriteCart(obj)}
              // onPlus={(item) => setToCard(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
