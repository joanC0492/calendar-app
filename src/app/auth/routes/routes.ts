import { Login } from "@/app/auth/pages";

export enum AUTH_ROUTES {
  LOGIN = "login",
}

interface Iroutes {
  path: string;
  component: () => JSX.Element;
  name: string;
  to?: string;
}

export const routes: Iroutes[] = [
  {
    path: "login",
    component: Login,
    name: AUTH_ROUTES.LOGIN,
  },
];
