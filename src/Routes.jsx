import {  createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Error from "./Component/Home/Error Page/Error";

export const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<Error></Error>,
      element: <Root></Root>
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);
  