import React from 'react';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';
import Slider from 'react-simple-image-slider';

const images = [
  { url: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F12%2Fdrake-nike-nocta-apparel-collection-release-date-price-collaboration-4.jpg?q=90&w=1400&cbr=1&fit=max' },
  { url: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F12%2Fdrake-nike-nocta-apparel-collection-release-date-price-collaboration-3.jpg?q=90&w=1400&cbr=1&fit=max' },
];

const Home = () => {
  return (
  	<React.Fragment>
      <Slider
        style={{
          marginTop: '20px',
        }}
        width={896}
        height={504}
        images={images}
      />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
  	  <NewArrivals />

      {/*<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />*/}

      {/*<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub-Categories
      </h4>
      <SubList />*/}

      <br /> 
      <br /> 
  	</React.Fragment>
  );
}

export default Home;
