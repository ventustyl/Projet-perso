//Import de react router dom pour les routes
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "../src/pages/Home";
import Profil from "../src/pages/Profil";
import Trending from "../src/pages/Trending";
import Plantation from "./pages/Plantation";
import "../src/styles/styles.scss";

//Creation de la structure des pages dans un layout avec outlet de react router dom
const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

// Creation de la constante de la création de la route principale
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/plantation",
       element: <Plantation /> },
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/trending",
        element: <Trending />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
