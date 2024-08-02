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
import colorsConstants from 'src/constants/colors.constants';
import { CustomToast } from 'src/components/alerts/toast.alert';


function App() {
  //get default app theme (light by default)
  const colorScheme = useContext(AppThemeContext);
  //load resources especially custom fonts
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <AppThemeContext.Provider value={'light'}>
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
              <Navigation colorScheme={colorScheme} />
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