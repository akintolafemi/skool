import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackScreenProps } from 'src/types/navigation.types';
import { Image, ScrollView, Text } from 'src/components/themed.components';
import { AuthScreenLabel } from './components/labels.component';
import layoutConstant from 'src/constants/layout.constants';
import fontUtil from 'src/utils/font.utils';
import { DefaultButton } from 'src/components/buttons.components';
import colorsConstant from 'src/constants/colors.constants';
import { DefaultInput } from 'src/components/inputs.components';
import AppThemeContext from 'src/contexts/Theme.context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Line } from 'src/components/line.components';
import { useAppDispatch, useAppSelector } from 'src/hooks/useReduxHooks';
import useAuthenticateUser from 'src/hooks/apis/useAuthenticateUser';
import { showToast } from 'src/components/alerts/toast.alert';

export default function SignInScreen({ navigation, route }: RootStackScreenProps<'SignInScreen'>) {

  const theme = useContext(AppThemeContext)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const { loading, useLogin } = useAuthenticateUser()

  const [username, setUsername] = useState(``)
  const [password, setPassword] = useState("")
  
  const handleLogin = async () => {
    const req = await useLogin({
      username,
      password
    })
    showToast({
      type: req?.status === 200 ? "success" : "error",
      title: `Authentication`,
      message: req?.message
    })
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: fontUtil.h(50),
        paddingTop: fontUtil.h(150)
      }}
    >
      <View style={{
        flex: 1,
      }}>
        <AuthScreenLabel
          label={`Login`}
          subLabel={`Please enter your email and password`}
        />
        <DefaultInput
          placeholder={`example@gmail.com`}
          value={username}
          onChangeText={(t: string) => setUsername(t)}
        />
        <DefaultInput
          placeholder={`Password`}
          value={password}
          onChangeText={(t: string) => setPassword(t)}
          secureTextEntry
          onSubmitEditing={handleLogin}
        />
        <View style={{
          alignItems: "flex-end",
          marginTop: fontUtil.h(-20),
          marginBottom: fontUtil.h(16)
        }}>
          <TouchableOpacity
            activeOpacity={layoutConstant.activeOpacity}
          >
            <Text style={{
              color: colorsConstant.colorPrimary[800],
            }}>
              {`Forgot Password?`}
            </Text>
          </TouchableOpacity>
        </View>
        <DefaultButton
          title={`Sign In`}
          titleStyle={{
            color: colorsConstant.colorWhite
          }}
          loading={loading}
          onPress={handleLogin}
          disabled={username === "" || password === ""}
        />
        <View style={{
          marginVertical: fontUtil.h(32),
          flexDirection: "row",
          alignItems: "center"
        }}>
          <Line
            flex={1}
          />
          <Text style={{
            fontSize: fontUtil.h(16),
            color: colorsConstant.textIconSecondary[theme],
            opacity: 0.65,
            marginHorizontal: fontUtil.w(27)
          }}>
            {`Or`}
          </Text>
          <Line
            flex={1}
          />
        </View>
        <DefaultButton
          buttonHeight={fontUtil.h(48)}
          buttonStyle={{
            backgroundColor: colorsConstant.colorWhite,
          }}
          title={`Continue With Google`}
          titleStyle={{
            fontFamily: fontUtil.sfprodisplay_500,
            fontSize: fontUtil.h(14),
            color: colorsConstant.textIconSecondary[theme],
            opacity: 0.65
          }}
          icon={
            <Image
              source={require("src/assets/images/icons/google-original.png")}
              style={{
                height: fontUtil.h(24),
                width: fontUtil.h(24),
                marginRight: fontUtil.w(8)
              }}
            />
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: layoutConstant.mainViewHorizontalPadding
  }, labelStyle: {
    fontFamily: fontUtil.sfprodisplay_700,
    fontSize: fontUtil.h(24),
    lineHeight: fontUtil.h(30),
  }
});