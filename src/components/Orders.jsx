import React from 'react';
import axios from 'axios';
import Card from '../components/Card/Card';

function Orders() {
  const [orders, setOrders] = React.useState([]); // заказы в orders
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await axios.get('https://6161517ee46acd001777c003.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      }
      fetchData();
    } catch (error) {
      alert('Ошибка при запросе заказов');
    }
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
            <Card key={`${index} `} loading={isLoading} {...obj} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
