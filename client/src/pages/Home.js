import React, { lazy } from 'react';
// const BestSellers = lazy(() => import('../components/home/BestSellers'));
// const CategoryList = lazy(() => import('../components/home/CategoryList'));

// import SubList from '../components/sub/SubList';
const Slider = lazy(() => import('../components/slider/Slider'));
const NewArrivals = lazy(() => import ('../components/home/NewArrivals'));


const Home = () => {
  return (
    <div className="container-fluid">
      <Slider />
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
    </div>
  );
}

export default Home;
