import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { HomePage } from '../pages/homePage/homePage'
import { NotFound } from '../pages/notfoundPage/notfound'
import { Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 none" style={{display: 'none'}}>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <div className="p-2">About Us</div>,
})


const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
})


const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, notFoundRoute])
const router = createRouter({
  routeTree,
})


export default router;
