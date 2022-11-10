import React from 'react';
import axios from 'axios';
import Card from './Card/Card';

import { TSneakers } from '../redux/fetchCartSlice';

type TOrder = {
  id: string;
  items: TSneakers[];
};

const Orders: React.FC = () => {
  const [orders, setOrders] = React.useState<TSneakers[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get<TOrder[]>(
          'https://6161517ee46acd001777c003.mockapi.io/orders',
        );
        const result = data.reduce((prev: TSneakers[], obj) => [...prev, ...obj.items], []);
        setOrders(result);
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои заказы</h1>
        </div>

        {/*основной блок карточек кроссовок в закладках*/}
        <div className="d-flex flex-wrap">
          {(isLoading ? [...Array(8)] : orders).map((obj, index) => (
            <Card key={index} loading={isLoading} {...obj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
