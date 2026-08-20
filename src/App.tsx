import { useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import { Header } from "./components/layout/Header";
import { matchLoader } from "./lib/matchLoader";
import { MatchPage, MatchPageError } from "./routes/MatchPage";
import { SearchPage } from "./routes/SearchPage";
import { type RootContext } from "./hooks/useRootContext";

function RootLayout() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header onOpenFilters={() => setFiltersOpen(true)} />
      <Outlet context={{ filtersOpen, setFiltersOpen } satisfies RootContext} />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <SearchPage /> },
      {
        path: "match/:id",
        element: <MatchPage />,
        loader: matchLoader,
        errorElement: <MatchPageError />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
