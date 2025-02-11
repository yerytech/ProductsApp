import { NavigationContainer } from '@react-navigation/native';
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from "./presentation/provider/AuthProvider";

export const ProductsApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? eva.dark : eva.light;
  const backgroundColor = colorScheme === "dark" ? eva.dark : eva.light;
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={theme}
      >
        <NavigationContainer
          theme={{
            fonts: {
              regular: {
                fontFamily: "",
                fontWeight: "bold",
              },
              medium: {
                fontFamily: "",
                fontWeight: "bold",
              },
              bold: {
                fontFamily: "",
                fontWeight: "bold",
              },
              heavy: {
                fontFamily: "",
                fontWeight: "bold",
              },
            },
            dark: colorScheme === "dark",
            colors: {
              primary: theme["color-primary-500"],
              background: backgroundColor,
              card: theme["color-basic-100"],
              text: theme["text-basic-color"],
              border: theme["border-basic-color-2"],
              notification: theme["color-danger-500"],
            },
          }}
        >
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};