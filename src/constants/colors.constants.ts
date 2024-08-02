const colorWhite = "#FFFFFF";
const colorBlack = "#000000";
const colorError = "#FF0606";
const colorDanger = "#D85D57";
const colorWarning = "#ffc107";
const colorErrorDark = "#620E13"

const colorPrimaryDisabled = 'rgba(151, 84, 203, 0.6)'
const colorWhiteOpaq = {
  '0.2': `rgba(255, 255, 255, 0.2)`,
  '0.4': `rgba(255, 255, 255, 0.4)`,
  '0.6': `rgba(255, 255, 255, 0.6)`,
  '0.8': `rgba(255, 255, 255, 0.8)`,
};
const colorBlackOpaq = {
  '0.2': `rgba(0, 0, 0, 0.2)`,
  '0.4': `rgba(0, 0, 0, 0.4)`,
  '0.6': `rgba(0, 0, 0, 0.6)`,
}

function convertToRgba(color: string, alpha = 1) {
  // Regular expressions to check for rgb(a) strings
  const rgbaPattern = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(\d*(?:\.\d+)?))?\)$/;

  // Check if the input is already an rgb(a) string
  const rgbaMatch = color.match(rgbaPattern);

  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10);
    const g = parseInt(rgbaMatch[2], 10);
    const b = parseInt(rgbaMatch[3], 10);
    // Use the provided alpha or default to 1 if not present
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // If not rgb(a), assume it's a hex color
  // Remove the leading '#' if present
  color = color.replace(/^#/, '');

  // Check for shorthand hex code and expand it
  if (color.length === 3) {
    color = color.split('').map(char => char + char).join('');
  }

  // Parse the hex values to get red, green, and blue components
  const bigint = parseInt(color, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGBA string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default {
  colorPrimary: {
    100: '#FDCEEB',
    700: '#FA5DBC',
    800: '#F835AC',
    900: '#F70C9B'
  },
  error: {
    700: '#E1817C',
    900: '#D85D57'
  },
  highlight: {
    highlight: "#E15B0F"
  },
  colorWhite,
  colorError,
  colorErrorDark,
  colorBlack,
  colorDanger,
  colorWarning,
  colorPrimaryDisabled,
  textDisabled: "#A4A7B0",
  colorWhiteOpaq,
  colorBlackOpaq,
  light: {
    text: '#000',
    background: '#fff',
    screenGb: "#F4F4F9",
  },
  dark: {
    text: '#fff',
    background: '#000',
    screenGb: "#1B1C1E",
  },
  background: {
    light: "#2c2c2c",
    dark: "#fff",
    lightBase: "#EAEAEB"
  },
  textIconDisabled: {
    light: "#151515",
    dark: "#fff"
  },
  textIconSecondary: {
    light: "#151515",
    dark: "#fff"
  },
  background400: {
    light: "#444444",
    dark: "#EEEEEE"
  },
  accent: {
    accent: "#5d5FEF",
    accentLight: "#3C7AFF"
  },
  neutral: {
    300: "#B9B9B9"
  },
  success: {
    700: "#6EE68C",
    900: "#45DF6B",
    primary: "#01BA4C"
  },
  colorPurple: "#4F17AA",
  colorPurple2: '#7D36F1',
  textPrimary: {
    light: "#010A23",
    dark: `rgba(255, 255, 255, 0.9)`
  },
  textSecondary: "#2F364B",
  textLabel: {
    dark: `rgba(96, 96, 96, 1)`,
    light: `rgba(47, 54, 75, 1)`
  },
  colorPurple3: `#9148EF`,
  convertToRgba,
  colorHeightLightsLabel: `rgba(250, 93, 188, 1)`,
  themeColors: [`#5d5FEF`, `#F70C9B`, `rgba(49, 94, 231, 1)`, `rgba(15, 167, 226, 1)`, `rgba(83, 176, 125, 1)`, `rgba(225, 91, 15, 1)`, `rgba(193, 55, 63, 1)`],
  transactions: {
    refund: `rgba(233, 33, 46, 1)`,
    credit: `rgba(1, 186, 76, 1)`,
    withdrawal: `rgba(248, 53, 172, 1)`,
    pending: `rgba(255, 187, 83, 1)`,
    successful: `rgba(1, 186, 76, 1)`,
    cancelled: `rgba(233, 33, 46, 1)`
  },
  borderColor: `rgba(192, 194, 200, 1)`
};
