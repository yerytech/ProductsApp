import { registerRootComponent } from 'expo';
import { ProductsApp } from "./src/ProductsApp";
// Only import react-native-gesture-handler on native platforms
import "react-native-gesture-handler";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(ProductsApp);
