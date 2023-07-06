import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import axios from "../axios";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";

const NewCustomerScreen = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [shopName, setShopName] = React.useState("");
  const [nicNumber, setNicNumber] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [spinner, setSpinner] = React.useState(false);

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
          textContent={"Fetching Location..."}
          textStyle={styles.spinnerTextStyle}
        />
      )}
      <View className="mt-12 p-3 flex justify-evenly flex-1">
        <View>
          <Text className="text-white text-2xl text-center font-bold">
            Register New Customer
          </Text>
        </View>
        <View className="flex flex-row justify-evenly space-x-3">
          <View className="flex-1">
            <Text className="text-white">First Name</Text>
            <TextInput
              className="bg-white w-full rounded px-2"
              type="text"
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
          </View>
          <View className="flex-1">
            <Text className="text-white">Last Name</Text>
            <TextInput
              className="bg-white w-full rounded px-2"
              type="text"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
          </View>
        </View>

        <View>
          <Text className="text-white">Address</Text>
          <TextInput
            className="bg-white w-full rounded px-2"
            type="text"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </View>

        <View>
          <Text className="text-white">Shop Name</Text>
          <TextInput
            className="bg-white w-full rounded px-2"
            type="text"
            onChangeText={(text) => setShopName(text)}
            value={shopName}
          />
        </View>

        <View>
          <Text className="text-white">NIC Number</Text>
          <TextInput
            className="bg-white w-full rounded px-2"
            type="text"
            onChangeText={(text) => setNicNumber(text)}
            value={nicNumber}
          />
        </View>

        <View>
          <Text className="text-white">Mobile Number</Text>
          <TextInput
            className="bg-white w-full rounded px-2"
            type="text"
            onChangeText={(text) => setMobileNumber(text)}
            value={mobileNumber}
          />
        </View>

        <View>
          <Text className="text-white">Email</Text>
          <TextInput
            className="bg-white w-full rounded px-2"
            type="text"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <TouchableOpacity
          onPress={async () => {
            if (
              firstName === "" ||
              lastName === "" ||
              address === "" ||
              shopName === "" ||
              nicNumber === "" ||
              mobileNumber === "" ||
              email === ""
            ) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please fill all the fields",
              });
              return false;
            } 

            // First Name validation
            if (firstName.length < 2 || firstName.length > 50) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "First name should be between 2 and 50 characters",
              });
              return false;
            }

            const nameRegex = /^[a-zA-Z]+$/;
            if (!nameRegex.test(firstName)) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "First name should contain only alphabetic characters",
              });
              return false;
            }

            // Last Name validation
            if (lastName.length < 2 || lastName.length > 50) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Last name should be between 2 and 50 characters",
              });
              return false;
            }

            const nameRegex1 = /^[a-zA-Z]+$/;
            if (!nameRegex.test(lastName)) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Last name should contain only alphabetic characters",
              });
              return false;
            }

            //NIC validation
            const nicRegex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
            if (!nicRegex.test(nicNumber)) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please enter a valid NIC number",
              });
              return false;
            }

            //Mobile No Validation 071-0990377
            const mobileRegex = /^(0[0-9]{2})-(\d{7})$/;
            if (!mobileRegex.test(mobileNumber)) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please enter a valid mobile number in the format 071-0990377",
              });
              return false;
            }

            else {
              const emailRegex = /\S+@\S+\.\S+/;
              if (!emailRegex.test(email)) {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Please enter a valid email address",
                });
                return;
              }

              setSpinner(true);
              let { status } =
                await Location.requestForegroundPermissionsAsync();

              console.log(status);
              if (status !== "granted") {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Permission to access location was denied",
                });
                setSpinner(false);
                return;
              }

              let location = await Location.getCurrentPositionAsync({});
              console.log(location);
              const newLocationObject = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              };

              axios
                .post("/register", {
                  firstName: firstName,
                  lastName: lastName,
                  address: address,
                  shopName: shopName,
                  NICNumber: nicNumber,
                  mobileNumber: mobileNumber,
                  email: email,
                  location: JSON.stringify(newLocationObject),
                })
                .then(async (response) => {
                  console.log(response.data);
                  Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: response.data.message,
                  });
                })
                .catch((error) => {
                  console.log(error.response.data);
                  Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error",
                    text2: error.response.data.message,
                  });
                })
                .finally(() => {
                  setSpinner(false);
                  setFirstName("");
                  setLastName("");
                  setAddress("");
                  setShopName("");
                  setNicNumber("");
                  setMobileNumber("");
                  setEmail("");
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
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default NewCustomerScreen;
