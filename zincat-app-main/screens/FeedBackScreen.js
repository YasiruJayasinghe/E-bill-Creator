import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";

const FeedBackScreen = () => {
  const isFocused = useIsFocused();
  const [spinner, setSpinner] = useState(true);
  const [shop, setShop] = useState({});
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const getLocalStorage = async () => {
      const value = await AsyncStorage.getItem("selected-shop");
      if (value !== null) {
        console.log(value);
        setShop(JSON.parse(value));
      }

      setSpinner(false);
    };

    getLocalStorage();
  }, [isFocused]);

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
      {spinner && (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      )}
      <View className="flex-1 bg-white mt-20 rounded-t-xl">
        <View className="mt-2">
          <Text className="text-black text-2xl text-center font-bold">
            Enter Customer Feedback
          </Text>
        </View>

        <View className="p-6 flex justify-evenly flex-1">
          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">Shop Name</Text>
            <TextInput
              className="w-full rounded px-2 h-10 text-black text-lg"
              type="text"
              style={{
                backgroundColor: "#e0fbfc",
              }}
              value={shop.shop_name}
              editable={false}
            />
          </View>

          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">Feedback</Text>
            <TextInput
              className="w-full rounded px-2 h-36 text-black text-lg"
              type="text"
              style={{
                backgroundColor: "#e0fbfc",
              }}
              value={feedback}
              onChangeText={(text) => setFeedback(text)}
            />
          </View>

          <TouchableOpacity
            onPress={async () => {
              if (shop == "" || feedback == "") {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Please fill all fields",
                });

                return;
              }

              const value = await AsyncStorage.getItem("selected-shop");
              if (value !== null) {
                axios
                  .post("/feedback", {
                    SID: JSON.parse(value).SID,
                    comment: feedback,
                  })
                  .then((res) => {
                    Toast.show({
                      type: "success",
                      text1: "Success",
                      text2: res.data.message,
                    });
                    setFeedback("");
                  })
                  .catch((err) => {
                    console.log(err);
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: err.response.data.message,
                    });
                  });
              }
            }}
            style={{
              backgroundColor: "#ff9900",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignItems: "center",
              marginHorizontal: 80,
              marginTop: 20,
            }}
          >
            <Text
              style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "bold" }}
            >
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default FeedBackScreen;
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});
