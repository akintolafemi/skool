import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';
import { APP_THEME } from 'src/constants/app.constants';
import SecureStoreManager from 'src/utils/SecureStoreManager';

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}

export async function useAppTheme () {
  try {
    const theme = await SecureStoreManager.getItemFromAsyncStorage(`${APP_THEME}`);
    return theme !== null ? theme : "light";
  } catch (e) { 
    console.log(e)
    return useColorScheme();
  } 
}
