import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';


const Home = () => {
  return (
  	<React.Fragment>
  	  <div 
  	    className='jumbotron text-danger h1 font-weight-bold text-center'
  	  >
        <Jumbotron 
          text={[
          	'Marni on Marni on me', 
            'Too Many Monograms It\'s Alphabet Soup',
          ]}
        />
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
  	  <NewArrivals />
      <br /> 
      <br /> 
  	</React.Fragment>
  );
}

export default Home;
