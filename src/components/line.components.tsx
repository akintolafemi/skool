import React from "react"
import { DimensionValue, StyleProp, View, ViewStyle } from "react-native"
import colorsConstant from "src/constants/colors.constants";
import useColorScheme from "src/hooks/useColorScheme";
import fontUtil from "src/utils/font.utils";

export const Line = ({
  height = fontUtil.h(1),
  flex,
  width,
  containerStyle = {}
} : {
  height?: DimensionValue;
  flex?: number;
  width?: DimensionValue;
  containerStyle?: StyleProp<ViewStyle>;
}) => {

  const theme = useColorScheme();

  return (
    <View
      style={[{
        flex: flex ? flex : undefined,
        backgroundColor: colorsConstant.background.lightBase,
        height: height,
        width: width ? width : undefined
      }, containerStyle]}
    ></View>
  )
}