import {
    createBrowserRouter,
  } from "react-router-dom";
import { 
  Root, Login, Signup, EditProfile, ChangePassword, MyPage,
  signupAction
} from '@pages';
import { PATH_ROOT, PATH_LOGIN, PATH_SIGNUP, PATH_EDITPROFILE, PATH_CHANGEPASSWORD, PATH_MYPAGE } from '@constants';

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <Root />,
    children: [
      {
        path: PATH_LOGIN,
        element: <Login />,
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