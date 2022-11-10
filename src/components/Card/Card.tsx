import Skeleton from './Skeleton';
import styles from './Card.module.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { TSneakers } from '../../redux/fetchCartSlice';

type TCardProps = {
  id: string;
  title: string;
  price: number;
  imgURL: string;
  loading?: boolean;
  ADDSneakersToCart?: (arg: TSneakers) => void;
  ADDSneakersToFavorite?: (arg: TSneakers) => void;
};

const Card: React.FC<TCardProps> = ({
  id,
  title,
  price,
  imgURL,
  loading = false,
  ADDSneakersToCart,
  ADDSneakersToFavorite,
}) => {
  const { cartSneakers } = useSelector((state: RootState) => state.fetchCartSlice);
  const { favoriteSneakers } = useSelector((state: RootState) => state.fetchFavoriteSlice);

  const onClickADDCart = () =>
    ADDSneakersToCart && ADDSneakersToCart({ id, parentId: id, title, price, imgURL });

  const onClickADDFavorite = () =>
    ADDSneakersToFavorite && ADDSneakersToFavorite({ id, parentId: id, title, price, imgURL });

  const isItemAddedToCart = (id: string) => cartSneakers.some((obj) => obj.parentId === id);

  const isItemAddedToFavorite = (id: string) => favoriteSneakers.some((obj) => obj.parentId === id);

  return (
    <div className={styles.card}>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div className={styles.favorite}>
            {ADDSneakersToCart && (
              <img
                onClick={onClickADDFavorite}
                src={isItemAddedToFavorite(id) ? 'img/liked.svg' : 'img/unliked.svg'}
                alt="Unliked"
              />
            )}
          </div>
          <img width="100%" height={135} src={imgURL} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span> Цена:</span>
              <b> {`${price} руб.`}</b>
            </div>

            {ADDSneakersToFavorite && (
              <img
                className={styles.btnPlus}
                src={isItemAddedToCart(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                alt="plus"
                onClick={onClickADDCart}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
