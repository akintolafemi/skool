import { Input, InputProps } from "@rneui/themed"
import { useContext, useState } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import colorsConstant from "src/constants/colors.constants"
import layoutConstant from "src/constants/layout.constants"
import fontUtil from "src/utils/font.utils"
import { Icon, Text } from "./themed.components"
import React from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import AppThemeContext from "src/contexts/Theme.context"

const defaultErrorMessageStyle: TextStyle = {
  marginTop: fontUtil.h(5),
  fontFamily: fontUtil.space_mono,
  fontSize: fontUtil.h(10),
  lineHeight: fontUtil.h(12)
}

export type defaultInputProps = {
  inputHeight?: number
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  secureTextEntry?: boolean
  hasError?: boolean
  wrapperStyle?: StyleProp<ViewStyle>
  labelPosision?: "top" | "bottom"
  inputRef?: any,
  errorType?: "error" | "info" | "success"
} & InputProps

export const DefaultInput = ({
  inputHeight = layoutConstant.inputHeight,
  containerStyle = {},
  labelStyle = {},
  secureTextEntry = false,
  errorMessage,
  errorType = "error",
  hasError,
  inputContainerStyle = {},
  inputStyle = {},
  inputRef = null,
  label,
  wrapperStyle,
  labelPosision = "top",
  ...props
} : defaultInputProps) => {

  const theme = useContext(AppThemeContext);

  const [showEntry, setShowEntry] = useState(secureTextEntry);
  
  return (
    <View style={[{
      marginBottom: fontUtil.h(10)
    }, wrapperStyle]}>
      {label && labelPosision === "top" ? (
        <Text style={[{
          marginBottom: fontUtil.h(5)
        }, labelStyle]}>{label}</Text>
      ) : null}
      <Input
        ref={inputRef}
        inputStyle={[{
          fontFamily: fontUtil.sfprodisplay_400,
          paddingHorizontal: fontUtil.w(15),
          fontSize: fontUtil.h(14),
          color: colorsConstant.textIconSecondary[theme],
          opacity: 0.65
        }, inputStyle]}
        placeholderTextColor={colorsConstant.textIconSecondary[theme]}
        cursorColor={colorsConstant.colorPrimary[100]}
        label={undefined}
        labelStyle={[{
          fontFamily: fontUtil.sfprodisplay_500,
          fontSize: fontUtil.w(15),
          marginBottom: fontUtil.h(5)
        }, labelStyle]}
        inputContainerStyle={[{
          height: inputHeight,
          borderRadius: fontUtil.h(8),
          backgroundColor: colorsConstant[theme].background,
          borderBottomWidth: 0
        }, inputContainerStyle]}
        containerStyle={[{
          height: inputHeight,
          paddingLeft: 0,
          paddingRight: 0,
          marginBottom: fontUtil.w(20)
        }, containerStyle]}
        rightIcon={ secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setShowEntry(!showEntry)}
          >
            <Icon
              name={showEntry ? `eye-off` : `eye`}
              type="ionicon"
              size={fontUtil.h(16)}
              color={colorsConstant.textIconDisabled[theme]}
              iconStyle={{
                opacity: 0.5
              }}
              containerStyle={{
                marginRight: fontUtil.w(10)
              }}
            />
          </TouchableOpacity>
        ) : undefined}
        {...props}
        errorMessage={errorMessage}
        secureTextEntry={showEntry}
        errorStyle={[defaultErrorMessageStyle, {
          color: errorType === "success" ? colorsConstant.success[900] : errorType === "info" ? colorsConstant.textLabel[theme] : colorsConstant.colorDanger,
          fontFamily: fontUtil.sfprodisplay_500,
          fontSize: fontUtil.h(12)
        }]}
      />
      {label && labelPosision === "bottom" ? (
        <Text style={[{
          marginBottom: fontUtil.h(5)
        }, labelStyle]}>{label}</Text>
      ) : null}
    </View>
  )
}