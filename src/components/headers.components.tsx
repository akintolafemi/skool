import React, { useContext, useEffect, useRef, useState } from "react"
import { Icon, Text, View } from "./themed.components"
import fontUtil from "src/utils/font.utils"
import layoutConstant from "src/constants/layout.constants"
import { LayoutChangeEvent, StyleProp, TextStyle, TouchableOpacity, ViewStyle, View as RNView, Keyboard } from "react-native"
import { useNavigation } from "@react-navigation/native"
import colorsConstants from "src/constants/colors.constants"
import { FlatList } from "react-native-gesture-handler"
import AppThemeContext from "src/contexts/Theme.context"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { DefaultInput } from "./inputs.components"
import { useAppSelector } from "src/hooks/useReduxHooks"

export const ScreenHeader = ({
  title = "Screen",
  rightIcon = {
    size: fontUtil.h(25),
    name: '',
    type: '',
    color: colorsConstants.accent.accent
  },
  useThemeColorForIcon = false,
  onPressRightIcon = () => null,
  rightIconComponent,
  titleStyle,
  containerStyle,
  hideBackButton = false,
  backButtonColor
} : {
  title?: string | JSX.Element
  rightIcon?: {
    name: string,
    type: string,
    size: number,
    color?: string,
    disabled?: boolean
  }
  useThemeColorForIcon?: boolean
  onPressRightIcon?: any
  rightIconComponent?: JSX.Element
  titleStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  hideBackButton?: boolean
  backButtonColor?: string
}) => {

  const navigation = useNavigation();
  const theme = useContext(AppThemeContext);

  return (
    <View style={[{
      flexDirection: "row",
      height: fontUtil.h(80),
      alignItems: "flex-end",
      paddingBottom: fontUtil.h(10),
      backgroundColor: colorsConstants[theme].screenGb
    }, containerStyle]}>
      {typeof title === "string" ? <RNView style={{
        flex: 1,
      }}>
        <Text style={[{
        fontFamily: fontUtil.sfprodisplay_500,
        fontSize: fontUtil.h(16),
      }, titleStyle]}>
        {title}
      </Text>
        </RNView> : title }
      {rightIconComponent ? rightIconComponent : rightIcon && (
        <Icon
          onPress={onPressRightIcon}
          activeOpacity={layoutConstant.activeOpacity}
          type={rightIcon?.type}
          name={rightIcon?.name}
          size={rightIcon?.size}
          disabled={rightIcon?.disabled}
          color={useThemeColorForIcon ? colorsConstants.colorPrimary[900]: rightIcon?.color}
        /> 
      )}
    </View>
  )
}