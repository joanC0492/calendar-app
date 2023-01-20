import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { IinitialForm } from "@/app/auth/domain";
import { calendarApi } from "@/shared/api";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  interface IPostLogin {
    email: string;
    password: string;
  }

  // Es asincrona porque consultara al backend
  const startLogin = async ({
    email,
    password,
  }: IinitialForm): Promise<void> => {
    const body: IPostLogin = {
      email: email as string,
      password: password as string,
    };

    // Como puede ocurrir un error lo manejamos con un try catch
    try {
      const res = await calendarApi.post("/auth", body);
      console.log({ res });
    } catch (error) {
      console.log(error);
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
