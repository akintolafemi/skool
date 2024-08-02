import React, { useContext } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Icon, Text } from "src/components/themed.components"
import colorsConstants from "src/constants/colors.constants"
import layoutConstants from "src/constants/layout.constants"
import AppThemeContext from "src/contexts/Theme.context"
import fontUtils from "src/utils/font.utils"
//@ts-ignore
import MathView, { MathText } from 'react-native-math-view';

export const OptionsSelect = ({
  label,
  selected,
  onSelect
} : {
  label: string
  selected?: boolean
  onSelect?: any
}) => {
  const theme = useContext(AppThemeContext)
  return (
    <TouchableOpacity
      style={{
        marginBottom: fontUtils.h(10),
        backgroundColor: selected ? colorsConstants.colorPrimary[900] : colorsConstants[theme].background,
        paddingHorizontal: fontUtils.w(15),
        paddingVertical: fontUtils.h(10),
        borderRadius: fontUtils.h(8),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
      activeOpacity={layoutConstants.activeOpacity}
      onPress={onSelect}
    >
      {/* <Text> */}
      {/* <MathView
        math={`${label || ""}`}
      /> */}
      <MathText
        value={label}
            // direction="ltr"
            // CellRendererComponent={<TouchableOpacity />}
        />
     {/* </Text> */}
      <Icon
        name={selected ? `checkmark-circle` : `ellipse-outline`}
        type="ionicon"
        color={colorsConstants.colorWhite}
      />
    </TouchableOpacity>
  )
}