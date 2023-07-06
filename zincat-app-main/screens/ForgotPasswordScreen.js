import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "../axios";

const ForgotPasswordScreen = ({ navigation }) => {
  const [nic, setNic] = useState("");
  const [username, setUsername] = useState("");

  const handleNicChange = (text) => {
    setNic(text);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    // You can use the `nic` and `username` values for further processing
    console.log("Submit button clicked");
    console.log("NIC:", nic);
    console.log("Username:", username);
  };

  return (
    <ImageBackground
      source={require("../assets/loginBG.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          maragin: 20,
        }}
      >
        <View className="bg-white items-center p-12 px-2 rounded-lg">
          <Text
            style={{ fontSize: 20, marginBottom: 20 }}
            className="font-bold"
          >
            Forgot Password
          </Text>
          <TextInput
            className="bg-gray-200 p-2 rounded w-full"
            style={{
              width: 300,
              height: 40,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
            placeholder="NIC"
            value={nic}
            onChangeText={handleNicChange}
          />
          <TextInput
            className="bg-gray-200 p-2 rounded w-full"
            style={{
              width: 300,
              height: 40,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
            placeholder="Username"
            value={username}
            onChangeText={handleUsernameChange}
          />
          <Text style={{ marginBottom: 20 }}>
            Enter your NIC and username to reset your password.
          </Text>
          <Text className="font-semibold">
            This request will sent to admin. If you have any issue please
            contact admin.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#ff9900",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignItems: "center",
              marginHorizontal: 80,
              marginTop: 20,
            }}
            onPress={() => {
              if (nic == "" || username == "") {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Fields cannot be empty",
                });
                return;
              }
              axios
                .post("/forgotPassword", {
                  NIC: nic,
                  SRID: username,
                })
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    Toast.show({
                      type: "success",
                      text1: "Success",
                      text2: "Password reset request sent",
                    });

                    navigation.goBack();
                  }
                })
                .catch((err) => {
                  console.log(err.response.data?.message);

                  if (err.response.status === 403) {
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: "User not found",
                    });
                    return;
                  }
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Something went wrong",
                  });
                });
            }}
          >
            <Text
              style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "bold" }}
            >
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;
