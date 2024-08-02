import React, { useEffect, useState } from "react";
import { DeviceEventEmitter, StyleProp, View, ViewStyle } from "react-native";
import { Icon } from "@rneui/themed";
import Animated, { Easing, FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import { APP_TOAST } from "src/constants/app.constants";
import colorsConstants from "src/constants/colors.constants";
import fontUtils, { deivceWidth } from "src/utils/font.utils";
import { Text } from "../themed.components";

type ToastProps = {
  duration?: number;
  position?: "top" | "bottom";
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  message?: string;
  onDismiss?: Function;
  displacement?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const defaultToastOptions: ToastProps = {
  duration: 3.5,
  position: "top",
  onDismiss: () => null,
  title: 'Your email has been verified',
  message: "",
  type:  "success",
  displacement: 50,
  containerStyle: {}
}

export const CustomToast = () => {
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState(defaultToastOptions.duration || 5);
  const [position, setPosition] = useState(defaultToastOptions.position);
  const [title, setTitle] = useState(defaultToastOptions.title);
  const [message, setMessage] = useState(defaultToastOptions.message);
  const [type, setType] = useState(defaultToastOptions.type);
  const [displacement, setDisplacement] = useState(defaultToastOptions.displacement || 0);
  const [containerStyle, setContainerStyle] = useState(defaultToastOptions.containerStyle);

  const onShowToast = (opt: ToastProps) => {
    setVisible(true);
    setDuration(opt?.duration || duration);
    setPosition(opt?.position || position);
    setTitle(opt?.title || "");
    setMessage(opt?.message || "");
    setType(opt?.type || "info");
    setDisplacement(opt?.displacement || 50);
    setContainerStyle(opt?.containerStyle || containerStyle);
  }

  useEffect(() => {
    DeviceEventEmitter.addListener(APP_TOAST, onShowToast);

    return () => {
      DeviceEventEmitter.removeAllListeners(APP_TOAST);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, duration * 1000);
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <Animated.View 
      entering={FadeIn.duration(200).easing(Easing.ease)} 
      exiting={FadeOut.duration(200).easing(Easing.ease)} 
      layout={LinearTransition.springify()}
      style={[{
      backgroundColor: type === "info" ? 
        colorsConstants.textDisabled
        : type === "success" ? 
        colorsConstants.success.primary
        : type === "error" ? 
        colorsConstants.colorError
        : colorsConstants.colorWarning,
      paddingVertical: fontUtils.h(15),
      alignItems: "center",
      position: "absolute",
      top: position === "top" ? fontUtils.h(displacement) : undefined,
      bottom: position === "bottom" ? fontUtils.h(displacement) : undefined,
      zIndex: 1000,
      width: deivceWidth - fontUtils.w(40),
      alignSelf: "center",
      borderRadius: fontUtils.w(20)
    }, containerStyle]}>
      <View style={{
        flexDirection: "row",
        alignItems: "center"
      }}>
        <Icon
          type='ionicon'
          name={type === "success" ? `checkmark-circle` : type === "info" ? `information-outline` : type === "warning" ? `alert-outline` : `close-circle`}
          size={fontUtils.h(22)}
          color={colorsConstants.colorWhite}
          containerStyle={{
          }}
        />
        <View style={{
          marginLeft: fontUtils.w(5)
        }}>
          <Text style={{
            fontFamily: fontUtils.sfprodisplay_500,
            fontSize: fontUtils.h(16),
            color: colorsConstants.colorWhite
          }}>
            {title}
          </Text>
        </View>
      </View>
      {message ? (
        <Text style={{
          fontSize: fontUtils.h(13),
          lineHeight: fontUtils.h(15),
          marginTop: fontUtils.h(5),
          color: colorsConstants.colorWhiteOpaq["0.8"],
          paddingHorizontal: fontUtils.w(10),
        }}>
          {message}
        </Text>
      ) : null} 
    </Animated.View>
  )
}

export const showToast = (options: ToastProps) => {
  DeviceEventEmitter.emit(APP_TOAST, options);
}
