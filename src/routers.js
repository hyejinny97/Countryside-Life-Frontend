import {
    createBrowserRouter,
  } from "react-router-dom";
import { Root, Login, Signup, EditProfile } from '@pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/edit-profile',
        element: <EditProfile />,
      },
    ]
  },
]);

export {router};