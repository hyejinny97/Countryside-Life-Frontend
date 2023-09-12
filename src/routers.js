import axios from "axios";
import Cookies from "universal-cookie";
import { createBrowserRouter, redirect } from "react-router-dom";
import {
  Root,
  Login,
  Signup,
  EditProfile,
  ChangePassword,
  MyPage,
  Community,
  CreateCommunity,
  CommunityDetail,
  Location,
  Introduction,
  rootAction,
  signupAction,
  editProfileAction,
  changePasswordAction,
  loginAction,
  communityDetailAction,
  createCommunityAction,
  editCommunityAction,
  locationAction,
  rootLoader,
  requireAuthLoader,
  communityLoader,
  createCommunityLoader,
  editCommunityLoader,
  locationLoader,
} from "@pages";
import {
  PATH_ROOT,
  PATH_LOGIN,
  PATH_LOGOUT,
  PATH_SIGNUP,
  PATH_EDITPROFILE,
  PATH_CHANGEPASSWORD,
  PATH_MYPAGE,
  PATH_COMMUNITY,
  PATH_CREATECOMMUNITY,
  PATH_COMMUNITYDETAIL,
  PATH_EDITCOMMUNITY,
  PATH_LOCATION,
  PATH_INTRODUCTION,
} from "@constants";
import { blacklistRefresh } from "@helpers";
import { resetUserInfo, store } from "@store";

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    loader: rootLoader,
    action: rootAction,
    element: <Root />,
    children: [
      {
        index: true,
        loader: () => redirect(PATH_COMMUNITY),
      },
      {
        path: PATH_LOGIN,
        action: loginAction,
        element: <Login />,
      },
      {
        path: PATH_LOGOUT,
        loader: async () => {
          await blacklistRefresh();
          axios.defaults.headers.common["Authorization"] = "";
          store.dispatch(resetUserInfo());
          const cookies = new Cookies();
          cookies.remove("refresh_token");
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
      {
        path: PATH_COMMUNITY,
        loader: communityLoader,
        element: <Community />,
      },
      {
        path: PATH_CREATECOMMUNITY,
        loader: createCommunityLoader,
        action: createCommunityAction,
        element: <CreateCommunity />,
      },
      {
        path: PATH_COMMUNITYDETAIL,
        action: communityDetailAction,
        element: <CommunityDetail />,
      },
      {
        path: PATH_EDITCOMMUNITY,
        loader: editCommunityLoader,
        action: editCommunityAction,
        element: <CreateCommunity />,
      },
      {
        path: PATH_LOCATION,
        loader: locationLoader,
        action: locationAction,
        element: <Location />,
      },
      {
        path: PATH_INTRODUCTION,
        element: <Introduction />,
      },
    ],
  },
]);

export { router };
