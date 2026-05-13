import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import MainLayout from './components/templates/layouts/main.layout';
import AuthLayout from './components/templates/layouts/auth.layout';
import MainPage from './components/pages/main/main.page';
import NotFoundPage from './components/pages/notfound.page';
import SignInPage from './components/pages/auth/signin.page';
import SignUpPage from './components/pages/auth/signup.page';

const routes: RouteObject[] = [
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const browserRouter: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);

export { routes };
export default browserRouter;
