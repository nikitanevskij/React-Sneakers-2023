import React from 'react';
import { useDispatch } from 'react-redux';
import { setClosedDrawer } from '../redux/fetchCartSlice';

type TInfoProps = {
  image: string;
  title: string;
  description: string;
};

const Info: React.FC<TInfoProps> = ({ image, title, description }) => {
  const dispatch = useDispatch();
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>

      <button className="greenButton" onClick={() => dispatch(setClosedDrawer())}>
        <img src="img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};
export default Info;
