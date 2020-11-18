import React from 'react';
import { Card, Skeleton } from 'antd';

const LoadingCards = ({ count }) => {
  const cards = () => {
    const totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
      	<Card className='col-md-4' key={i}>
      		<Skeleton active></Skeleton>
      	</Card>
      );
    }
    return totalCards;
  }
  return (
    <div className="row pb-5">
      {cards()}
    </div>
  );
};

export default LoadingCards;