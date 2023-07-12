import axios from 'axios';
import {
    createBrowserRouter,
    redirect
  } from "react-router-dom";
import { 
  Root, Login, Signup, EditProfile, ChangePassword, MyPage,
  signupAction, loginAction,
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
        element: <EditProfile />,
      },
      {
        path: PATH_CHANGEPASSWORD,
        element: <ChangePassword />,
      },
      {
        path: PATH_MYPAGE,
        element: <MyPage />,
      },
    ]
  },
]);

export {router};