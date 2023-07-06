import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "../axios";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";

const DailyItemListScreen = () => {
  const isFocused = useIsFocused();
  const [spinner, setSpinner] = useState(true);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const getLocalStorage = async () => {
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        console.log(value);
        axios
          .get("/dailyItemList", {
            params: {
              SRID: JSON.parse(value).SRID,
            },
          })
          .then((res) => {
            console.log(res.data);
            setShops(res.data);
            setSpinner(false);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
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
            Daily Item List
          </Text>
        </View>
        <ScrollView className="flex-1 space-y-2 mt-5" stickyHeaderIndices={[0]}>
          <View className="flex-row justify-evenly bg-orange-200 p-3 mx-5 rounded">
            <Text className="text-black text-xl font-bold underline">Name</Text>
            <Text className="text-black text-xl font-bold underline">
              Description
            </Text>
            <Text className="text-black text-xl font-bold underline">QTY</Text>
          </View>

          {shops.map((shop, index) => (
            <View
              className="flex-row justify-evenly bg-orange-100 p-5 mx-5 rounded"
              key={index}
            >
              <Text className="text-black text-lg flex-1 text-center">
                {shop.productname}
              </Text>
              <Text className="text-black text-lg flex-1 text-center">
                {shop.stockID}
              </Text>
              <Text className="text-black text-lg flex-1 text-center">
                {shop.qty}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default DailyItemListScreen;
