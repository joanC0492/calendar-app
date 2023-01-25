import { AuthAppRouter } from "@/app/auth/routes/AuthAppRouter";
import { CalendarAppRouter } from "@/app/calendarApp/routes/CalendarAppRouter";
import { useAuthStore } from "@/shared/hooks";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  // let authStatus = "not-authenticated";

  const { status, checkAuthToken } = useAuthStore();

  console.log({ status });

  // Cada vez que renderice validamos si el token es valido :)
  useEffect(() => {
    // console.log("Ingreso al useEffect");
    checkAuthToken().then();
  }, []);

  // Si estamos en checking esta cargando
  if (status === "checking") return <h3>Cargando...</h3>;

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<AuthAppRouter />} />
          <Route path="/*" element={<Navigate replace to={"/auth/login"} />} />
        </>
      ) : (
        <Route path="/*" element={<CalendarAppRouter />} />
      )}
    </Routes>
  );
};