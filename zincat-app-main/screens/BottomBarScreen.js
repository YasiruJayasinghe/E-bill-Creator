import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import BottomBar from "./BottomBar";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import CalculatorScreen from "./CalculatorScreen";
import NewPasswordScreen from "./NewPasswordScreen";
import ContactUsScreen from "./ContactUsScreen";
import ProductListScreen from "./ProductListScreen";
import LogOutScreen from "./LogOutScreen";
import DailyItemListScreen from "./DailyItemListScreen";
import LoginScreen from "./LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [user, setUser] = React.useState({});

  useEffect(() => {
    const getLocalStorage = async () => {
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    };

    getLocalStorage();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View
        className="p-4 flex-row items-center"
        style={{
          backgroundColor: "#ff9900",
        }}
      >
        <Image
          className="w-12 h-12 rounded-full"
          source={require("../assets/dp.png")}
        />
        <View className="ml-4">
          <Text className="text-black text-lg font-bold">{user?.fullname}</Text>
          <Text className="text-black text-sm">{user?.NIC}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const BottomBarScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          drawerLabel: "Home",
        }}
        name="Main"
        component={BottomBar}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Change Password",
        }}
        name="NewPassword"
        component={NewPasswordScreen}
      />
      <Drawer.Screen name="Calculator" component={CalculatorScreen} />
      <Drawer.Screen
        options={{
          drawerLabel: "Contact Us",
        }}
        name="ContactUs"
        component={ContactUsScreen}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Product List",
        }}
        name="ProductList"
        component={ProductListScreen}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Daily Items",
        }}
        name="DailyList"
        component={DailyItemListScreen}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Settings",
          unmountOnBlur: true,
        }}
        name="Settings"
        component={LogOutScreen}
      />
      <Drawer.Screen
        options={{
          drawerLabel: "Log Out",
          unmountOnBlur: true,
        }}
        name="LogOut"
        component={LoginScreen}
      />
    </Drawer.Navigator>
  );
};

export default BottomBarScreen;
