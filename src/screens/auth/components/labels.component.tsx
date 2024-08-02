import { useNavigation } from "@react-navigation/native"
import React, { useContext } from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "src/components/themed.components"
import colorsConstant from "src/constants/colors.constants"
import layoutConstant from "src/constants/layout.constants"
import AppThemeContext from "src/contexts/Theme.context"
import fontUtil from "src/utils/font.utils"

export const AuthScreenLabel = ({
  label = "",
  subLabel,
  labelStyle = {},
  containerStyle = {}
} : {
  label: string | JSX.Element
  subLabel?: string
  labelStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}) => {
  const theme = useContext(AppThemeContext);
  return (
    <View
      style={[{
        marginBottom: fontUtil.h(30)
      }, containerStyle]}
    >
      <Text style={[{
        fontFamily: fontUtil.outfit_700,
        fontSize: fontUtil.h(24),
        lineHeight: fontUtil.h(30),
        color: colorsConstant.background[theme]
      }, labelStyle]}>
        {label}
      </Text>
      {subLabel && <Text style={{
        marginTop: fontUtil.h(16),
        fontSize: fontUtil.h(14),
        color: colorsConstant.background[theme],
        lineHeight: fontUtil.h(19),
        opacity: 0.5
      }}>
        {subLabel}
      </Text>}
    </View>  
  )
}

export const AuthScreenExtra = ({
  isSignUp = true,
  containerStyle = {}
} : {
  isSignUp?: boolean
  containerStyle?: StyleProp<ViewStyle>
}) => {

  const navigation = useNavigation()

  return (
    <View
      style={[{
        alignItems: "center"
      }, containerStyle]}
    >
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: fontUtil.h(11),
      }}>
        <Text style={[{
          fontFamily: fontUtil.outfit_500,
          fontSize: fontUtil.h(14),
        }]}>
          {isSignUp ? `Already have an account? ` : `Don't have an account? `}
        </Text>
        <TouchableOpacity
          activeOpacity={layoutConstant.activeOpacity}
          onPress={() => navigation.navigate(isSignUp ? "SignInScreen" : "JoinScreen")}  
        >
          <Text style={[{
            fontFamily: fontUtil.outfit_500,
            fontSize: fontUtil.h(14),
            color: colorsConstant.colorPrimary[800]
            }]}
          >
            {isSignUp ? `Sign In` : `Sign Up`}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[{
        fontFamily: fontUtil.outfit_500,
        fontSize: fontUtil.h(10),
        opacity: 0.5
      }]}>
        {`If you sign up, `}
        <Text style={[{
          textDecorationLine: "underline",
          fontFamily: fontUtil.outfit_500,
          fontSize: fontUtil.h(10)
        }]}
          onPress={() => alert("T&C")}
        >
          {`Terms & Conditions and Privacy Policy`}
        </Text>
        {` apply`}
      </Text>
    </View>
  )
}