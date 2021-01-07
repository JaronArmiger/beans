import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
import { LoadingOutlined } from '@ant-design/icons';

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
// const Checkout = lazy(() => import('./pages/Checkout'));
const PreCheckout = lazy(() => import('./pages/PreCheckout'));
// const BetaCheckout = lazy(() => import('./pages/BetaCheckout'));
const GammaCheckout = lazy(() => import('./pages/GammaCheckout'));
const ProductView = lazy(() => import('./pages/ProductView'));
const Payment = lazy(() => import('./pages/Payment'));
const OrderReceipt = lazy(() => import('./pages/OrderReceipt'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'));

const Header = lazy(() => import('./components/nav/Header'));
// const AltMainHeader = lazy(() => import('./components/nav/AltMainHeader'));
// const MobileHeader = lazy(() => import('./components/nav/MobileHeader'));
const AltMobileHeader = lazy(() => import('./components/nav/AltMobileHeader'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));

const App = () => {
  const intialWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const [windowWidth, setWindowWidth] = useState(intialWidth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    })
    }
  }, []);
  // to check fireabse auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
              dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              }
            });
          })
          .catch((err) => {
            console.log(err);
          })
      }
    });

    // cleanup
    return () => unsubscribe();
  }, [dispatch])
  return (
    <Suspense fallback={
        <div className="col text-center p-5">
          <h1>
            Pilsen Vint
            <LoadingOutlined className='h1'/>
            ge
          </h1>
        </div>
      }
    >
      {windowWidth > 900 ? 
         (<Header />) : 
         (<AltMobileHeader />)
      }
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <UserRoute exact path='/user/dashboard' component={UserDashboard} />
        {/*<UserRoute exact path='/checkout' component={Checkout} />*/}
        <UserRoute exact path='/payment' component={Payment} />
        <AdminRoute exact path='/admin/dashboard/:key?' component={AdminDashboard} />
        <AdminRoute 
          exact 
          path='/admin/category/:slug' 
          component={CategoryUpdate} 
        />
        <AdminRoute 
          exact 
          path='/admin/sub/:slug' 
          component={SubUpdate} 
        />
        <AdminRoute 
          exact 
          path='/admin/product/:slug' 
          component={ProductUpdate} 
        />

        <Route exact path='/product/:slug' component={ProductView} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/sub/:slug' component={SubHome} />
        <Route exact path='/shop' component={() => <Shop windowWidth={windowWidth} />} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/pre-checkout' component={PreCheckout} />
        {/*<Route exact path='/beta-checkout' component={BetaCheckout} />*/}
        <Route exact path='/gamma-checkout' component={GammaCheckout} />
        <Route exact path='/order/:orderId' component={OrderReceipt} />
      </Switch>
    </Suspense>
  );
};

export default App;
