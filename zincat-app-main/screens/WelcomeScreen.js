import { View, Text, ImageBackground, Image } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";

const WelcomeScreen = ({ route, navigation }) => {
  const { data } = route.params;

  const [userName, setUserName] = React.useState("");
  const [imageUrl, setImage] = React.useState("");

  useLayoutEffect(() => {
    setUserName(data[0].fullname);
    setImage(data[0].Image);
    console.log(data[0].Image);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("BottomBar");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/loginBG.png")}
      className="flex-1 object-cover"
    >
      <Image
        className="mt-12 mx-auto"
        source={require("../assets/WELCOME.png")}
      />

      {imageUrl && (
        <Image
          className="mt-32 mx-auto"
          source={{
            uri: imageUrl,
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            borderWidth: 5,
            borderColor: "#fff",
          }}
        />
      )}

      <View className="text-white">
        <Text className="text-white font-bold text-3xl text-center mt-20">
          Welcome
        </Text>
        <Text className="text-white text-2xl font-bold text-center mt-5">
          {userName}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
