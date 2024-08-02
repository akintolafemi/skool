/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from 'src/types/navigation.types';


const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), "https://app.projectone.com"],
  config: {
    screens: {
     
    },
  },
  async getInitialURL() {
   // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url !== null) {
      return url;
    }
  },
};

export default linking;
