import { View, Text, ImageBackground, StatusBar } from "react-native";
import React from "react";

const ContactUsScreen = () => {
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
        <View className="mt-2">
          <Text className="text-black text-2xl text-center font-bold">
            Contact Us
          </Text>
        </View>

        <View className="flex-1 justify-center space-y-4">
          <View className="flex-row mx-auto items-center">
            <Text className="text-black text-xl">Tel: </Text>
            <Text className="text-black text-2xl font-bold">
              +94 11 291 5625
            </Text>
          </View>

          <View className="flex-row mx-auto items-center">
            <Text className="text-black text-xl">Website: </Text>
            <Text className="text-black text-2xl font-bold">
              www.deranaselection.lk
            </Text>
          </View>

          <View className="flex-row mx-auto items-center">
            <Text className="text-black text-xl">Email: </Text>
            <Text className="text-black text-2xl font-bold">
              admin@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ContactUsScreen;
