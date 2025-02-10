import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { LoadingScreen } from "../screens/loading/LoadingScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { ProductScreen } from "../screens/product/ProductScreen";

export type RootStartParams ={
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  LoadingScreen: undefined;
  ProductScreen: {productId: string};
}

const Stack = createStackNavigator<RootStartParams>();

export const StackNavigator =()=> {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false,
      // animation:"fade"
      animationTypeForReplace: "push",
    
      
    }}
    
     initialRouteName="LoginScreen"
    >
      <Stack.Screen 
       
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
}
