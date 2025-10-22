// Importação do modo de navegação externo a renderização React
import {
  createBrowserRouter,
} from "react-router";

// Importação das páginas 
import { LandingPage, LoginPage, Dashboard, RegisterPage, ProfilePage, About, Informatives, FrequentlyAskedQuestions, Shop, AqualinkClassicPage } from "./pages";

// Importação dos layouts
import { DefaultLayout, ShopLayout } from "./layouts";

import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/informatives",
        Component: Informatives,
      },
      {
        path: "/faq",
        Component: FrequentlyAskedQuestions,
      }
    ],
  },
  {
    path: "/shop",
    Component: ShopLayout,
    children: [
      {
        path: "/shop",
        Component: Shop,
      },
      {
        path: "/shop/aqualink-classic",
        Component: AqualinkClassicPage,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/dashboard",
    Component: () => (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    Component: () => (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
]);