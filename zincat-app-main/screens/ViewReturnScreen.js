import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";

const ViewReturnScreen = ({ navigation }) => {
  const [spinner, setSpinner] = React.useState(true);
  const [orderList, setOrderList] = React.useState([]);

  const handleDecrement = (index) => {
    setOrderList((prevData) =>
      prevData.map((item, indexObj) =>
        indexObj === index
          ? {
              ...item,
              quantity: JSON.stringify(
                Math.max(JSON.parse(item.quantity) - 1, 0)
              ),
            }
          : item
      )
    );

    try {
      AsyncStorage.setItem(
        "return-list",
        JSON.stringify(
          orderList.map((item, indexObj) =>
            indexObj === index
              ? {
                  ...item,
                  quantity: JSON.stringify(
                    Math.max(JSON.parse(item.quantity) - 1, 0)
                  ),
                }
              : item
          )
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = (index) => {
    setOrderList((prevData) =>
      prevData.map((item, indexObj) =>
        indexObj === index
          ? { ...item, quantity: JSON.stringify(JSON.parse(item.quantity) + 1) }
          : item
      )
    );

    try {
      AsyncStorage.setItem(
        "return-list",
        JSON.stringify(
          orderList.map((item, indexObj) =>
            indexObj === index
              ? {
                  ...item,
                  quantity: JSON.stringify(JSON.parse(item.quantity) + 1),
                }
              : item
          )
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getLocalStorage = async () => {
      const value = await AsyncStorage.getItem("return-list");
      if (value !== null) {
        console.log(JSON.parse(value));
        setOrderList(JSON.parse(value));
      }

      setSpinner(false);
    };

    getLocalStorage();
  }, []);

  const renderHeader = () => (
    <View className="flex-row bg-gray-200">
      <Text className="flex-1 p-2 font-bold">Item</Text>
      <Text className="flex-2 p-2 font-bold">Description</Text>
      <Text className="flex-1 p-2 font-bold">Price</Text>
      <Text className="flex-1 p-2 font-bold">Qty</Text>
      <Text className="flex-1 p-2 font-bold">Amount</Text>
      <Text className="flex-1 p-2 font-bold"></Text>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View className="flex-row py-2">
      <Text className="flex-1 p-2">{item.productID}</Text>
      <Text className="flex-2 p-2">{item.product}</Text>
      <Text className="flex-1 p-2">{item.price}</Text>
      <Text className="flex-row items-center p-2 justify-center">
        <TouchableOpacity className="" onPress={() => handleIncrement(index)}>
          <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleDecrement(index)}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </TouchableOpacity>
      </Text>
      <Text className="flex-1 p-2 text-lg">{item.price * item.quantity}</Text>

      <TouchableOpacity
        className="mt-2"
        onPress={() => {
          const newOrderList = orderList.filter(
            (order, indexp) => indexp !== index
          );
          setOrderList(newOrderList);
          try {
            AsyncStorage.setItem("return-list", JSON.stringify(newOrderList));
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "Item removed from order",
            });
          } catch (error) {
            console.log(error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Something went wrong",
            });
          }
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Success",
            text2: "Item removed from order",
          });
        }}
      >
        <MaterialIcons name="remove-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/loginBG.png")}
      style={{ flex: 1, resizeMode: "cover" }}
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
            View Return Items
          </Text>
        </View>
        <FlatList
          className="flex-1 mt-5 mx-3"
          data={orderList}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#ff9900",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            marginHorizontal: 80,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "bold" }}>
            ADD ITEM
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("BottomBar")}
          style={{
            backgroundColor: "#ff9900",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            marginHorizontal: 80,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "bold" }}>
            ADD TO BILL
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

export default ViewReturnScreen;
