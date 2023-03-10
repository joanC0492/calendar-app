import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
export const CalendarAppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
      <Route path="*" element={<Navigate replace to={"/"} />} />
    </Routes>
  );
};