import axios from 'axios';
import Cookies from 'universal-cookie';
import {
    createBrowserRouter,
    redirect
  } from "react-router-dom";
import { 
  Root, Login, Signup, EditProfile, ChangePassword, MyPage,
  signupAction, editProfileAction, changePasswordAction, loginAction,
  rootLoader, requireAuthLoader
} from '@pages';
import { 
  PATH_ROOT, 
  PATH_LOGIN, 
  PATH_LOGOUT, 
  PATH_SIGNUP, 
  PATH_EDITPROFILE, 
  PATH_CHANGEPASSWORD, 
  PATH_MYPAGE 
} from '@constants';
import { blacklistRefresh } from '@helpers';
import { resetUserInfo, store } from '@store';

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    loader: rootLoader,
    element: <Root />,
    children: [
      {
        path: PATH_LOGIN,
        action: loginAction,
        element: <Login />,
      },
      {
        path: PATH_LOGOUT,
        loader: () => {
          blacklistRefresh();
          axios.defaults.headers.common['Authorization'] = '';
          store.dispatch(resetUserInfo());
          const cookies = new Cookies();
          cookies.remove('refresh_token')
          return redirect(PATH_ROOT);
        },
      },
      {
        path: PATH_SIGNUP,
        action: signupAction,
        element: <Signup />,
      },
      {
        path: PATH_EDITPROFILE,
        loader: requireAuthLoader,
        action: editProfileAction,
        element: <EditProfile />,
      },
      {
        path: PATH_CHANGEPASSWORD,
        loader: requireAuthLoader,
        action: changePasswordAction,
        element: <ChangePassword />,
      },
      {
        path: PATH_MYPAGE,
        loader: requireAuthLoader,
        element: <MyPage />,
      },
    ]
  },
]);

export {router};