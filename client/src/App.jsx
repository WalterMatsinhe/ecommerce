import './App.css';
import Adminlayout from './components/admin-view/layout';
import Authlayout from './components/auth/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminFeatures from './pages/admin-view/features';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/products';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import { Routes, Route } from 'react-router-dom';
import ShoppingLayout from './components/shopping-view/layout';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import NotFound from './pages/not-found';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';

function App() {
  const { user, isAuthenticated, checkingAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (checkingAuth) return <div>Loading...</div>;

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>

        {/* ✅ Public Routes (no CheckAuth) */}
        <Route path='/auth' element={<Authlayout />}>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>

        {/* ✅ Protected Admin Routes */}
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Adminlayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>

        {/* ✅ Protected Shop Routes */}
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='checkcout' element={<ShoppingCheckout />} />
          <Route path='account' element={<ShoppingAccount />} />
        </Route>

        <Route path='*' element={<NotFound />} />
        <Route path='/unauth-page' element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
