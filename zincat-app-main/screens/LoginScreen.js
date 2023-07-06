import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import axios from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [nic, setNic] = React.useState("");
  const [password, setPassword] = React.useState("");

  const validateLoginFields = () => {
    if (nic === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "NIC cannot be empty",
      });
      return false;
    }

    if (password === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password cannot be empty",
      });
      return false;
    }

    return true;
  };

  return (
    <ImageBackground
      source={require("../assets/loginBG.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
      }}
    >
      <ImageBackground
        source={require("../assets/Whitepaint01.png")}
        style={{
          resizeMode: "cover",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <Image source={require("../assets/Derana.png")} />
        <Image source={require("../assets/FromSriLanka.png")} />
      </ImageBackground>

      <View className="items-center">
        <Image source={require("../assets/Delivary-boy-transformed1.png")} />
      </View>

      <View>
        <View>
          <TextInput
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "#FFFFFF",
              color: "black",
              marginTop: 5,
              paddingBottom: 5,
              marginHorizontal: 20,
              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            placeholder="Enter your NIC"
            placeholderTextColor="#A1A1A1"
            onChangeText={(text) => setNic(text)}
            value={nic}
          />
        </View>

        <View>
          <TextInput
            secureTextEntry={true}
            style={{
              borderBottomWidth: 2,
              borderBottomColor: "#FFFFFF",
              color: "black",
              marginTop: 15,
              paddingBottom: 5,
              marginHorizontal: 20,
              backgroundColor: "white",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            placeholder="Enter your password"
            placeholderTextColor="#A1A1A1"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            textAlign: "right",
            marginRight: 20,
            marginTop: 10,
          }}
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
        >
          Forgot Password?
        </Text>

        <TouchableOpacity
          onPress={() => {
            if (validateLoginFields()) {
              axios
                .post("/login", {
                  username: nic,
                  password: password,
                })
                .then(async (res) => {
                  console.log(res.data);
                  if (res.status === 200) {
                    try {
                      await AsyncStorage.setItem(
                        "user-data",
                        JSON.stringify(res.data.results[0])
                      );
                      await AsyncStorage.setItem(
                        "order-list",
                        JSON.stringify([])
                      );
                      await AsyncStorage.setItem(
                        "return-list",
                        JSON.stringify([])
                      );
                      Toast.show({
                        type: "success",
                        text1: "Success",
                        text2: "Login successful",
                        position: "bottom",
                      });

                      navigation.navigate("WelcomeScreen", {
                        data: res.data.results,
                      });
                    } catch (error) {
                      console.log("Error storing data: ", error);

                      Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Something went wrong!",
                      });
                    }
                  }
                })
                .catch((err) => {
                  console.log(err.response.data.message);
                  if (err.response.status === 403) {
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: err.response.data.message,
                    });
                  } else {
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: "Something went wrong",
                    });
                  }
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
          <Text style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "bold" }}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <View className="items-center">
          <Image source={require("../assets/zincat.png")} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
