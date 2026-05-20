import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import About from "../pages/about/page";
import Partnerships from "../pages/partnerships/page";
import Testimonials from "../pages/testimonials/page";
import ImpactReport from "../pages/impact-report/page";
import FamilyProgramming from "../pages/family-programming/page";
import Events from "../pages/events/page";
import NashvilleGala from "../pages/events/nashville/page";
import Donate from "../pages/donate/page";
import Contact from "../pages/contact/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/partnerships",
    element: <Partnerships />,
  },
  {
    path: "/testimonials",
    element: <Testimonials />,
  },
  {
    path: "/impact-report",
    element: <ImpactReport />,
  },
  {
    path: "/family-programming",
    element: <FamilyProgramming />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/nashville",
    element: <NashvilleGala />,
  },
  {
    path: "/donate",
    element: <Donate />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;