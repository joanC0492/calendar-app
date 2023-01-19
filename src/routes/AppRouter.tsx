import { AuthAppRouter } from "@/app/auth/routes/AuthAppRouter";
import { CalendarAppRouter } from "@/app/calendarApp/routes/CalendarAppRouter";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  let authStatus = "authenticated";

  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        <Route path="/auth/*" element={<AuthAppRouter />} />
      ) : (
        <Route path="/*" element={<CalendarAppRouter />} />
      )}
      <Route path="*" element={<Navigate replace to={"/auth/login"} />} />
    </Routes>
  );
};
