import { GlobalStyle } from './styles/globalStytles';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';

import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router';
import Home from './pages/Home';
import { Footer, Header } from './layout';
import { Category, ProductDetail, Checkout } from './pages';
import ProtectedRoute from './utils/ProtectedRoute';

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <Main>
      <Header />
      <Outlet />
      <Footer />
    </Main>
  );
}

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const categoryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/category/$category/',
  component: Category,
});

const detailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/product/$id',
  component: ProductDetail,
});

const checkoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: Checkout,
});
const errorRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <div>404</div>,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  categoryRoute,
  errorRoute,
  detailRoute,
  checkoutRoute,
]);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return <RouterProvider router={router} />;
};

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
`;
export default App;
