import { View, Text, ImageBackground, StatusBar } from "react-native";
import React from "react";

const NotificationsScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/loginBG.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View className="flex-1 bg-white mt-20 rounded-t-xl">
        <View className="px-6 flex flex-row items-center justify-between mt-3">
          <Text className="font-bold text-2xl">Notifications</Text>
          <Text className="text-base text-blue-400 font-semibold">
            Mark as read
          </Text>
        </View>

        {/* NOTIFICATION STARTS */}
        <View className="mx-3">
          <View className="border-b-2">
            <View className="flex flex-row items-center justify-evenly px-6 py-4">
              <View className="flex flex-row items-center mr-4">
                <View className="bg-blue-400 rounded-full h-8 w-8 flex items-center justify-center">
                  <Text className="text-white text-sm">A</Text>
                </View>
              </View>
              <View className="flex flex-col justify-center">
                <Text className="text-base font-semibold text-clip">
                  You password has been successfully changed
                </Text>
                <Text className="text-sm text-gray-400">2 hours ago</Text>
              </View>
            </View>
          </View>
        </View>
        {/* NOTIFICATION ENDS */}
      </View>
    </ImageBackground>
  );
};

export default NotificationsScreen;
