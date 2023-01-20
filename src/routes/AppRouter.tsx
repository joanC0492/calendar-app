import { AuthAppRouter } from "@/app/auth/routes/AuthAppRouter";
import { CalendarAppRouter } from "@/app/calendarApp/routes/CalendarAppRouter";
import { getEnvVariables } from "@/shared/helpers";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  let authStatus = "not-authenticated";
  console.log(getEnvVariables());
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

