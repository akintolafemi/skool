import { useNavigation } from "@react-navigation/native"
import { Button, ButtonProps, Icon } from "@rneui/themed"
import React, { useContext } from "react"
import { TouchableOpacity as RNTouchableOpacity, StyleProp, TextStyle, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import colorsConstant from "src/constants/colors.constants"
import layoutConstant from "src/constants/layout.constants"
import fontUtil from "src/utils/font.utils"
import { Text } from "./themed.components"
import { MaterialIcons } from "@expo/vector-icons"
import AppThemeContext from "src/contexts/Theme.context"

export const DefaultButton = ({
  buttonHeight = layoutConstant.buttonHeight,
  titleStyle = {},
  buttonStyle = {},
  type = "solid",
  borderRadius = fontUtil.h(8),
  ...props
} : {
  type?: "outline" | "solid" | "clear"
  titleStyle?: StyleProp<TextStyle>
  buttonStyle?: StyleProp<ViewStyle>
  buttonHeight?: number
  borderRadius?: number
} & ButtonProps) => {
  const theme = useContext(AppThemeContext);

  return (
    <Button
      titleStyle={[{
        fontFamily: fontUtil.sfprodisplay_400,
        fontSize: fontUtil.h(14),
        color: 
          type === "clear" ? 
            colorsConstant[theme].text 
            : type === "outline" ? 
            colorsConstant.colorPrimary[900]
            : type === "solid" ?
            colorsConstant[theme].text 
            : undefined
      }, titleStyle]}
      type={type}
      activeOpacity={layoutConstant.activeOpacity}
      buttonStyle={[{
        height: buttonHeight,
        borderRadius: borderRadius,
        backgroundColor: type === "solid" ? 
          colorsConstant.colorPrimary[900]
          : undefined,
        borderWidth: type === "outline" ? 
          fontUtil.h(1)
          : undefined,
        borderColor: type === "outline" ? 
          colorsConstant.colorPrimary[900]
          : undefined
      }, buttonStyle]}
      containerStyle={{
        height: buttonHeight,
        borderRadius: borderRadius,
      }}
      radius={borderRadius}
      disabledStyle={{
        backgroundColor: colorsConstant.convertToRgba(colorsConstant.colorPrimary[900], 0.2)
      }}
      disabledTitleStyle={{
        color: colorsConstant.colorPrimary[900]
      }}
      {...props}
        
    />
  )
} 

export const BackButtonWithLabel = ({
  label = "Back",
  containerStyle,
  style
} : {
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={[{
      flexDirection: "row",
      alignItems: "center",
    }, style]}
      containerStyle={[{
        marginBottom: fontUtil.h(40),
        marginLeft: fontUtil.w(-5),
        maxWidth: fontUtil.w(120)
      }, containerStyle]}
      activeOpacity={layoutConstant.activeOpacity}
      onPress={() => navigation.canGoBack() ? navigation.goBack() : null}
    >
      <MaterialIcons
        name='keyboard-arrow-left'
        size={fontUtil.h(20)}
        color={colorsConstant.accent.accent}
      />
      <Text style={[{
        textTransform: "capitalize",
        color: colorsConstant.accent.accent,
        fontFamily: fontUtil.sfprodisplay_500,
        fontSize: fontUtil.h(14),
      }]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export const BackButton= ({
  containerStyle,
  style,
  size = fontUtil.h(20)
} : {
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  size?: number
}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={[{
      
      }, style]}
      containerStyle={[{
        marginBottom: fontUtil.h(40),
        marginLeft: fontUtil.w(-5)
      }, containerStyle]}
      activeOpacity={layoutConstant.activeOpacity}
      onPress={() => navigation.canGoBack() ? navigation.goBack() : null}
    >
      <MaterialIcons
        name='keyboard-arrow-left'
        size={size}
        color={colorsConstant.accent.accent}
      />
    </TouchableOpacity>
  )
}

export const CloseButton= ({
  onPress = () => null,
  containerStyle
} : {
  onPress?: Function
  containerStyle?: StyleProp<ViewStyle>
}) => {
  const navigation = useNavigation()
  const theme = useContext(AppThemeContext)
  return (
    <RNTouchableOpacity style={[{
    }, containerStyle]}
      activeOpacity={layoutConstant.activeOpacity}
      onPress={() => onPress ? onPress() : navigation.canGoBack() ? navigation.goBack() : null}
    >
      <Icon
        type="ionicon"
        name="close-outline"
        color={colorsConstant.textIconDisabled[theme]}
      />
    </RNTouchableOpacity>
  )
}