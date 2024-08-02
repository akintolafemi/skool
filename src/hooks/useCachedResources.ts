import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {

  const [fontsLoaded] = useFonts({
    ...FontAwesome.font,
    "sfprodisplay-regular": require("../assets/fonts/SFProdisplay/sfprodisplayregular.otf"),
    "sfprodisplay-medium": require("../assets/fonts/SFProdisplay/sfprodisplaymedium.otf"),
    "sfprodisplay-bold": require("../assets/fonts/SFProdisplay/sfprodisplaybold.otf"),    
    "lato-regular": require("../assets/fonts/Lato/Lato-Regular.ttf"),
    "lato-bold": require("../assets/fonts/Lato/Lato-Bold.ttf")
  });

  return fontsLoaded;

}
