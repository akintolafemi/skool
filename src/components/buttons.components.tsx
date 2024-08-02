import { Button, ButtonProps } from "@rneui/themed"
import React, { useContext } from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import colorsConstant from "src/constants/colors.constants"
import layoutConstant from "src/constants/layout.constants"
import fontUtil from "src/utils/font.utils"
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
