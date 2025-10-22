import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { AppLayout } from "./Layout/AppLayout";
import { AuthLayout } from "./Layout/AuthLayout";
import { Provider } from "react-redux";
import { store } from "./app/store";

const LoginPage = lazy(() => import("./Pages/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const ServicePage = lazy(() => import("./Pages/ServicePage"));
const TopupPages = lazy(() => import("./Pages/TopupPages"));
const TransactionPage = lazy(() => import("./Pages/TransactionPage"));
const AkunPage = lazy(() => import("./Pages/AkunPage"));
const EditProfilPage = lazy(() => import("./Pages/EditProfilPage"));

const rootRoute = createRootRoute({
  component: Outlet,
});

// APP LAYOUT
const AppLayoutRoute = createRoute({
  id: "app-layout",
  component: AppLayout,
  getParentRoute: () => rootRoute,
});

const HomeRoute = createRoute({
  path: "/",
  component: HomePage,
  getParentRoute: () => AppLayoutRoute,
});

const TopupRoute = createRoute({
  path: "/topup",
  component: TopupPages,
  getParentRoute: () => AppLayoutRoute,
});

const TransactionRoute = createRoute({
  path: "/transaction",
  component: TransactionPage,
  getParentRoute: () => AppLayoutRoute,
});

const AkunRoute = createRoute({
  path: "/akun",
  component: AkunPage,
  getParentRoute: () => AppLayoutRoute,
});

const ServiceRoute = createRoute({
  path: "/service/$id",
  component: ServicePage,
  getParentRoute: () => AppLayoutRoute,
});

const EditProfilRoute = createRoute({
  path: "/edit-profile",
  component: EditProfilPage,
  getParentRoute: () => AppLayoutRoute,
});

// AUTH LAYOUT
const AuthLayoutRoute = createRoute({
  id: "auth-layout",
  component: AuthLayout,
  getParentRoute: () => rootRoute,
});

const LoginRoute = createRoute({
  path: "/login",
  component: LoginPage,
  getParentRoute: () => AuthLayoutRoute,
});

const RegisterRoute = createRoute({
  path: "/register",
  component: RegisterPage,
  getParentRoute: () => AuthLayoutRoute,
});

//ROUTE TREE
const routeTree = rootRoute.addChildren([
  AppLayoutRoute.addChildren([
    HomeRoute,
    TopupRoute,
    TransactionRoute,
    AkunRoute,
    ServiceRoute,
    EditProfilRoute,
  ]),
  AuthLayoutRoute.addChildren([LoginRoute, RegisterRoute]),
]);

//ROUTER
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="text-center mt-10 text-red-600">Loading...</div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
