import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import DashboardScreen from "./DashboardScreen";
import RouteScreen from "./RouteScreen";
import NotificationsScreen from "./NotificationsScreen";
import NewCustomerScreen from "./NewCustomerScreen";
import FeedBackScreen from "./FeedBackScreen";
const BottomBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Route") {
            iconName = focused ? "ios-map" : "ios-map-outline";
          } else if (route.name === "Feedback") {
            iconName = focused ? "ios-chatbubbles" : "ios-chatbubbles-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "New Customer") {
            iconName = focused ? "man" : "man-outline";
          } else if (route.name === "Notifications") {
            iconName = focused
              ? "ios-notifications-circle"
              : "ios-notifications-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarBackground: () => (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 50,
              backgroundColor: "#1f457a",
              paddingVertical: 5,
            }}
          />
        ),
      })}
    >
      <Tab.Screen name="Route" component={RouteScreen} />
      <Tab.Screen name="Feedback" component={FeedBackScreen} />
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="New Customer" component={NewCustomerScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

export default BottomBar;
