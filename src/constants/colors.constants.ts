const colorWhite = "#FFFFFF";
const colorDanger = "#D85D57";
const colorWarning = "#ffc107";

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
    100: 'rgba(149, 61, 0, 0.1)',
    700: 'rgba(149, 61, 0, 0.7)',
    800: 'rgba(149, 61, 0, 0.8)',
    900: '#953d00'
  },
  error: {
    700: '#E1817C',
    900: '#D85D57'
  },
  colorWhite,
  colorDanger,
  colorWarning,
  textDisabled: "#A4A7B0",
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
  textIconSecondary: {
    light: "#151515",
    dark: "#fff"
  },
  textPrimary: {
    light: "#010A23",
    dark: `rgba(255, 255, 255, 0.9)`
  },
  success: {
    primary: "#01BA4C"
  },
  convertToRgba,
};
