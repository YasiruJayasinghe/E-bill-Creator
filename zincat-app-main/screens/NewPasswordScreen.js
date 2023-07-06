import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TextInput,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios";

const NewPasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

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
      <View className="flex-1 bg-white mt-20 rounded-t-xl p-5">
        <View className="mt-2">
          <Text className="text-black text-2xl text-left font-bold">
            Create New Password
          </Text>
          <Text className="text-black text-lg text-left">
            Your new password must be different from previous used password
          </Text>
        </View>

        <View className="p-6 flex justify-evenly flex-1">
          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">
              Old Password
            </Text>
            <TextInput
              className="w-full rounded px-2 h-10 text-black text-lg"
              type="text"
              style={{
                backgroundColor: "#d9d9d9",
              }}
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
            />
          </View>

          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">
              New Password
            </Text>
            <View>
              <TextInput
                className="w-full rounded px-2 h-10 text-black text-lg"
                type="text"
                style={{
                  backgroundColor: "#d9d9d9",
                }}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
              />
            </View>
          </View>

          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">
              Confirm Password
            </Text>
            <View>
              <TextInput
                className="w-full rounded px-2 h-10 text-black text-lg"
                type="text"
                style={{
                  backgroundColor: "#d9d9d9",
                }}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <Text className="text-black">Both passwords must match</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={async () => {
              try {
                if (
                  oldPassword === "" ||
                  newPassword === "" ||
                  confirmPassword === ""
                ) {
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Please fill all the fields",
                  });
                  return;
                }

                if (newPassword !== confirmPassword) {
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Both passwords must match",
                  });
                  return;
                }

                const value = await AsyncStorage.getItem("user-data");
                if (value !== null) {
                  console.log(value);
                  const user = JSON.parse(value);

                  axios
                    .post("/resetPassword", {
                      NIC: user.NIC,
                      oldPassword: oldPassword,
                      newPassword: newPassword,
                    })
                    .then((res) => {
                      Toast.show({
                        type: "success",
                        text1: "Success",
                        text2: "Password reset successfully",
                      });

                      setOldPassword("");
                      setNewPassword("");
                      setConfirmPassword("");

                      navigation.goBack();
                    })
                    .catch((err) => {
                      console.log(err);

                      if (err.response.status === 403) {
                        Toast.show({
                          type: "error",
                          text1: "Error",
                          text2: err.response.data.message,
                        });
                        return;
                      }
                      Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Something went wrong",
                      });
                    });
                }
              } catch (error) {
                console.log(error);

                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Something went wrong",
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
              RESET
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default NewPasswordScreen;
