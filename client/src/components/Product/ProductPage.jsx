import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ListPage from "./ListPage";
import AddPage from "./AddPage";
import EditPage from "./EditPage";
import ViewPage from "./ViewPage";

const ProductPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/list"
          element={
            <>
              <ListPage />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <AddPage />
            </>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <>
              <EditPage />
            </>
          }
        />
        <Route
          path="/view/:id"
          element={
            <>
              <ViewPage />
            </>
          }
        />

        <Route index element={<Navigate to="list" />} />
      </Route>
    </Routes>
  );
};

export default ProductPage;
