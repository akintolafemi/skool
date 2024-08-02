import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { RootStackScreenProps } from 'src/types/navigation.types';
import fontUtil, {  } from 'src/utils/font.utils';
import colorsConstant from 'src/constants/colors.constants';
import Animated, {
  ZoomIn,
  FadeIn,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'src/components/themed.components';
import { DefaultButton } from 'src/components/buttons.components';


export default function LandingScreen({ navigation, route }: RootStackScreenProps<'LandingScreen'>) {

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style={Platform.OS === "android" ? `dark` : `light`} backgroundColor={Platform.OS === "android" ? colorsConstant.colorWhite : undefined} />
      <Animated.Text
        entering={ZoomIn.duration(2000)}
        style={{
          fontFamily: fontUtil.sfprodisplay_400,
          color: colorsConstant.colorPrimary[900],
          fontSize: fontUtil.h(30),
          letterSpacing: fontUtil.w(10)
        }}
      >
        {`SKOOL`}
      </Animated.Text>
      <Animated.View
        style={{
          marginTop: fontUtil.h(10)
        }}
        entering={FadeIn.delay(2000).duration(1000)}
      >
        <DefaultButton
          type='clear'
          title={`Press Here to Start`}
          titleStyle={{
            color: colorsConstant.colorPrimary[900],
            fontFamily: fontUtil.sfprodisplay_500
          }}
          icon={{
            name: `long-arrow-right`,
            type: `font-awesome`,
            color: colorsConstant.colorPrimary[900],
            style: {
              marginLeft: fontUtil.w(20)
            }
          }}
          iconPosition='right'
          buttonStyle={{
            paddingHorizontal: fontUtil.w(30)
          }}
          onPress={() => navigation.navigate("SignInScreen")}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});