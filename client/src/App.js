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
const History = lazy(() => import('./pages/user/History'));
const Password = lazy(() => import('./pages/user/Password'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const CreateCouponPage = lazy(() => import('./pages/admin/coupon/CreateCouponPage'));
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ProductView = lazy(() => import('./pages/ProductView'));
const Payment = lazy(() => import('./pages/Payment'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'));

const Header = lazy(() => import('./components/nav/Header'));
const MobileHeader = lazy(() => import('./components/nav/MobileHeader'));
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
            Pilsen Vinta
            <LoadingOutlined className='h1'/>
            ge
          </h1>
        </div>
      }
    >
      {windowWidth > 900 ? 
         (<Header />) : 
         (<MobileHeader />)
      }
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <UserRoute exact path='/user/history' component={History} />
        <UserRoute exact path='/user/password' component={Password} />
        <UserRoute exact path='/user/wishlist' component={Wishlist} />
        <UserRoute exact path='/checkout' component={Checkout} />
        <UserRoute exact path='/payment' component={Payment} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/category' component={CategoryCreate} />
        <AdminRoute 
          exact 
          path='/admin/category/:slug' 
          component={CategoryUpdate} 
        />
        <AdminRoute exact path='/admin/sub' component={SubCreate} />
        <AdminRoute 
          exact 
          path='/admin/sub/:slug' 
          component={SubUpdate} 
        />
        <AdminRoute exact path='/admin/product' component={ProductCreate} />
        <AdminRoute exact path='/admin/products' component={AllProducts} />
        <AdminRoute 
          exact 
          path='/admin/product/:slug' 
          component={ProductUpdate} 
        />
        <AdminRoute 
          exact 
          path='/admin/coupon' 
          component={CreateCouponPage} 
        />
        <Route exact path='/product/:slug' component={ProductView} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/sub/:slug' component={SubHome} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/cart' component={Cart} />
      </Switch>
    </Suspense>
  );
};

export default App;
