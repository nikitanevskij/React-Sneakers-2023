import styles from './Card.module.scss';
import { useSelector } from 'react-redux';
import Skeleton from './Skeleton';

type TCardProps = {
  id: string;
  title: string;
  price: number;
  imgURL: string;
  loading: boolean;
  ADDSneakersToCart?: any;
  ADDSneakersToFavorite?: any;
};

const Card: React.FC<TCardProps> = ({
  id,
  title,
  price,
  imgURL,
  ADDSneakersToCart,
  ADDSneakersToFavorite,
  loading = false,
}) => {
  const { cartSneakers } = useSelector((state: any) => state.fetchCartSlice);
  const { favoriteSneakers } = useSelector((state: any) => state.fetchFavoriteSlice);

  const onClickADDCart = () => ADDSneakersToCart({ id, parentId: id, title, price, imgURL });

  const onClickADDFavorite = () =>
    ADDSneakersToFavorite({ id, parentId: id, title, price, imgURL });

  const isItemAddedToCart = (id: string) => cartSneakers.some((obj: any) => obj.parentId === id);

  const isItemAddedToFavorite = (id: string) =>
    favoriteSneakers.some((obj: any) => obj.parentId === id);

  return (
    <div className={styles.card}>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div className={styles.favorite}>
            {onClickADDFavorite && (
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

            {onClickADDCart && (
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
