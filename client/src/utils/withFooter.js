import React from 'react';
import Footer from '../components/Footer';

const withFooter = WrappedComponent => () => [
  <WrappedComponent key ='1' />,
  <Footer key='2' />
]

export default withFooter;