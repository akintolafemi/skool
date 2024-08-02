export const expo = {
  name: "Skool",
  slug: "skool",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "skool",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.skool.makintola"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.skool.makintola"
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./src/assets/images/favicon.png"
  },
  extra: {
    eas: {
      projectId: "3cfe9788-c597-45fd-8132-6b9d3720909e"
    },
  },
  plugins: [
    "expo-font",
    "expo-secure-store"
  ],
  hooks: {
  },
  experiments: {
    typedRoutes: true
  }
};
