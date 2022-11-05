import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';
import { useSelector } from 'react-redux';

function Card({
  id,
  title,
  price,
  imgURL,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) {
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const { cartSneakers } = useSelector((state) => state.fetchCartSlice);

  const onClickPlus = () => {
    onPlus({ id, parentId: id, title, price, imgURL });
  };
  const onClickFavorite = () => {
    onFavorite({ id, parentId: id, title, price, imgURL });
    setIsFavorite(!isFavorite);
  };
  const isItemAdded = (id) => {
    return cartSneakers.some((obj) => obj.parentId === id);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={175}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                onClick={onClickFavorite}
                src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'}
                alt="Unliked"
              />
            </div>
          )}

          <img width="100%" heigth={135} src={imgURL} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span> Цена:</span>
              <b> {`${price} руб.`}</b>
            </div>

            {onPlus && (
              <img
                className={styles.btnPlus}
                src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                alt="plus"
                onClick={onClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
