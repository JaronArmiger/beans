import React, { lazy } from 'react';
// const BestSellers = lazy(() => import('../components/home/BestSellers'));
// const CategoryList = lazy(() => import('../components/home/CategoryList'));

// import SubList from '../components/sub/SubList';
import Slider from '../components/slider/Slider';
import NewArrivals from '../components/home/NewArrivals';


const Home = () => {
  return (
    <div className="container-fluid">
      <Slider />
      <p 
        className="text-center p-3 mt-2 mb-2 font-weight-bold"
        style={{fontSize: '20px'}}
      >
        NEW ARRIVALS
      </p>
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
    </div>
  );
}

export default Home;
