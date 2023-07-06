import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";
import RegisterCustomer from "./screens/RegisterCustomer";
import WelcomeScreen from "./screens/WelcomeScreen";
import BottomBarScreen from "./screens/BottomBarScreen";
import AddReturnItem from "./screens/AddReturnItem";
import NewOrderScreen from "./screens/NewOrderScreen";
import ViewOrderScreen from "./screens/ViewOrderScreen";
import ViewReturnScreen from "./screens/ViewReturnScreen";
import Toast from "react-native-toast-message";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="RegisterCustomer" component={RegisterCustomer} />
          <Stack.Screen name="BottomBar" component={BottomBarScreen} />
          <Stack.Screen name="AddReturnItem" component={AddReturnItem} />
          <Stack.Screen name="AddNewOrder" component={NewOrderScreen} />
          <Stack.Screen name="ViewOrder" component={ViewOrderScreen} />
          <Stack.Screen name="ViewReturnItems" component={ViewReturnScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
