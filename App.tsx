/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  LogBox,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { persistor, store } from 'src/services/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import useCachedResources from 'src/hooks/useCachedResources';
import Navigation from 'src/navigation';
import AppThemeContext from 'src/contexts/Theme.context';
import { useAppTheme } from 'src/hooks/useColorScheme';
import colorsConstants from 'src/constants/colors.constants';
import { CustomToast } from 'src/components/alerts/toast.alert';


function App() {
  const colorScheme = useContext(AppThemeContext);
  const isLoadingComplete = useCachedResources();
  const [appTheme, setAppTheme] = useState<any>(null);
  const [initialRouteName, setInitialRouteName] = useState<any>(undefined)

  useEffect(() => {
    useAppTheme().then((theme) => setAppTheme(theme)).catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
      'This synthetic event is reused for performance reason',
      'Possible Unhandled Promise Rejection',
      'new NativeEventEmitter()',
      'ReactImageView: Image source "null" doesn\'t exist',
      'Sending `onAnimatedValueUpdate` with no listeners registered',
      'Sentry Logger [warn]: You appear to have multiple versions of the "promise" package installed.'
    ]);
  }, [])

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <AppThemeContext.Provider value={appTheme || colorScheme}>
        <StatusBar 
          translucent
          style={colorScheme === `dark` ? `light` : colorScheme === 'light' ? `dark` : `auto`}
          backgroundColor={colorScheme === `dark` ? colorsConstants.background.light : colorsConstants.background.dark}
        />
        <SafeAreaProvider>
          <Provider
            store={store}
          >
            <PersistGate 
              loading={null} 
              persistor={persistor}
            >
              <Navigation colorScheme={colorScheme} initialRouteName={initialRouteName} />
              <CustomToast
              />
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </AppThemeContext.Provider>
    </GestureHandlerRootView>
  );
}

export default App;