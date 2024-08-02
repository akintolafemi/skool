import SignInScreen from "src/screens/auth/signin.screen";
import AppScreen from "src/screens/app";
import LandingScreen from "src/screens/landing.screen";
import { RenderProps } from "src/types/navigation.types";


export const AuthRoutes: Array<RenderProps> = [{
  name: "LandingScreen",
  component: LandingScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}, {
  name: "SignInScreen",
  component: SignInScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}];

export const UserRoutes: Array<RenderProps> = [{
  name: "AppScreen",
  component: AppScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}]


export const AppRoutes = (user: any) => {
  const routes = user?.id === null || user?.id === undefined 
    ? AuthRoutes 
    : UserRoutes

  return routes;
}