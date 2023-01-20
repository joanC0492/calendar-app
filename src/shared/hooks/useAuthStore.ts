import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { IinitialForm } from "@/app/auth/domain";
import { calendarApi } from "@/shared/api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "@/store/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  interface IPostLogin {
    email: string;
    password: string;
  }
  interface ILoginResponse {
    name: string;
    ok: boolean;
    token: string;
    uid: string;
  }

  // Es asincrona porque consultara al backend
  const startLogin = async ({
    email,
    password,
  }: IinitialForm): Promise<void> => {
    // Iniciamos la autenticación en checking
    dispatch(onChecking());
    const body: IPostLogin = {
      email: email as string,
      password: password as string,
    };
    // Como puede ocurrir un error lo manejamos con un try catch
    try {
      const res = await calendarApi.post("/auth", body);
      const data: ILoginResponse = res.data;
      console.log(data);
      //Guardamos nuestro token en localstorage
      localStorage.setItem("TOKEN", data.token);
      localStorage.setItem("TOKEN-INIT-DATE", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log({ error });
      dispatch(onLogout("Credenciales incorrectas"));

      //Limpiamos el mensaje de error
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  return {
    // Properties
    errorMessage,
    status,
    user,
    // methods
    startLogin,
  };
};
