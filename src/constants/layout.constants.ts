import { Dimensions, Platform } from 'react-native';
import fontUtil from 'src/utils/font.utils';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  tabBarHeight: Platform.OS === "android" ? 
    fontUtil.h(65) :
    fontUtil.h(60),
  activeOpacity: 0.6,
  mainViewHorizontalPadding: fontUtil.w(16),
  buttonHeight: fontUtil.h(40),
  inputHeight: fontUtil.h(40),
};
