/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React, { useContext } from 'react';
import { 
  ScrollViewProps as DefaultScrollViewProps, 
  Text as DefaultText, 
  View as DefaultView,
  TouchableOpacity, } from 'react-native';
import { ScrollView as DefaultScrollView, } from 'react-native-gesture-handler';

import { 
  SafeAreaView as DefaultSafeAreaView, 
  SafeAreaViewProps as DefaultSafeAreaViewProps,
 } from 'react-native-safe-area-context';
import ColorsConstants from 'src/constants/colors.constants';
import fontUtils from 'src/utils/font.utils';
import layoutConstants from 'src/constants/layout.constants';
import { Image as ExpoImage, ImageProps } from 'expo-image';
import { imageLoadBlur, imageTransition } from 'src/constants/app.constants';
import AppThemeContext from 'src/contexts/Theme.context';
import { IconProps } from '@rneui/base';
import { Icon as RNEIcon } from '@rneui/themed';


export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof ColorsConstants.light & keyof typeof ColorsConstants.dark
) {
  const theme = useContext(AppThemeContext);
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return ColorsConstants[theme][colorName];
  }
}

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaViewProps;
export type ScrollViewProps = ThemeProps & DefaultScrollViewProps;

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color, fontFamily: fontUtils.sfprodisplay_400, fontSize: fontUtils.h(12) }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'screenGb');

  return <DefaultSafeAreaView 
    edges={['right', 'bottom', 'left']}
    style={[{ backgroundColor, 
      paddingHorizontal: layoutConstants.mainViewHorizontalPadding,
      paddingTop: layoutConstants.mainViewHorizontalPadding
    }, style]} {...otherProps} 
  />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "screenGb"
  );

  return (
    //@ts-ignore
    <DefaultScrollView 
      showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false}
      style={[{ backgroundColor }, style]} 
      {...otherProps} 
    />
  );
}

export function Image(props: ImageProps & {
  onPress?: any
}) {
  
  const { onPress, ...otherProps } = props;

  return <TouchableOpacity
    onPress={onPress}
    activeOpacity={onPress ? layoutConstants.activeOpacity : 1}
  >
      <ExpoImage
        placeholder={{
          blurhash: imageLoadBlur
        }}
        transition={imageTransition}
        {...otherProps}
    />
    </TouchableOpacity>
}


export function Icon(props: IconProps & {
  onPress?: any
}) {

  const { onPress, disabled, ...otherProps } = props;

  return (
    <TouchableOpacity
      activeOpacity={layoutConstants.activeOpacity}
      onPress={onPress}
      disabled={disabled}
    >
      <RNEIcon
        {...otherProps}
      />
    </TouchableOpacity>
  )
}