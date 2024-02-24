import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// PAGE
const Home = lazy(async () => await import("@/pages/home"));
const Results = lazy(async () => await import("@/pages/result"));

export const publicRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <Suspense fallback={<></>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="results"
        element={
          <Suspense fallback={<></>}>
            <Results />
          </Suspense>
        }
      />
    </Route>
  )
);
