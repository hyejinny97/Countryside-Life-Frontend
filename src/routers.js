import {
    createBrowserRouter,
  } from "react-router-dom";
import { Root, Login } from '@pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Login />,
      }
    ]
  },
]);

export {router};