import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";

const ViewOrderScreen = ({ navigation }) => {
  const [spinner, setSpinner] = React.useState(true);
  const [orderList, setOrderList] = React.useState([]);

  useEffect(() => {
    const getLocalStorage = async () => {
      const value = await AsyncStorage.getItem("order-list");
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
        "order-list",
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
        "order-list",
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
            AsyncStorage.setItem("order-list", JSON.stringify(newOrderList));
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
            View Order
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
          onPress={async () => {
            try {
              const value = await AsyncStorage.getItem("order-list");
              const r_value = await AsyncStorage.getItem("return-list");

              if (
                JSON.parse(value).length == 0 &&
                JSON.parse(r_value).length == 0
              ) {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "No items in order",
                });
                return;
              }
            } catch (error) {
              console.log(error);
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Something went wrong",
              });

              return;
            }
            Alert.alert(
              "Invoice Option",
              "Please select one of the following options:",
              [
                {
                  text: "E-mail",
                  onPress: async () => {
                    try {
                      setSpinner(true);
                      const value = await AsyncStorage.getItem("order-list");
                      const r_value = await AsyncStorage.getItem("return-list");
                      const shopName = await AsyncStorage.getItem(
                        "selected-shop"
                      );

                      if (
                        JSON.parse(value).length == 0 &&
                        JSON.parse(r_value).length == 0
                      ) {
                        Toast.show({
                          type: "error",
                          text1: "Error",
                          text2: "No items in order",
                        });
                        setSpinner(false);
                        return;
                      }

                      const orderList = JSON.parse(value);
                      const returnList = JSON.parse(r_value);

                      const order = {
                        orderList,
                        returnList,
                        total: orderList.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        ),
                        shopName: JSON.parse(shopName),
                      };

                      const response = await axios.post("/sendEbill", order);
                      if (response.status === 200) {
                        setSpinner(false);

                        Toast.show({
                          type: "success",
                          text1: "Success",
                          text2: "Order sent successfully",
                        });

                        Linking.openURL(response.data.previewURL);

                        try {
                          setOrderList([]);
                          await AsyncStorage.setItem(
                            "order-list",
                            JSON.stringify([])
                          );
                          await AsyncStorage.setItem(
                            "return-list",
                            JSON.stringify([])
                          );

                          setSpinner(false);

                          Toast.show({
                            type: "success",
                            text1: "Success",
                            text2: "Order sent successfully",
                          });

                          navigation.navigate("BottomBar");
                        } catch (error) {
                          console.log(error);
                          Toast.show({
                            type: "error",
                            text1: "Error",
                            text2: "Something went wrong",
                          });
                        }
                      }
                      console.log(response.data);
                    } catch (error) {
                      console.log(error);
                      Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Something went wrong",
                      });
                      setSpinner(false);
                    }
                  },
                },
                {
                  text: "SMS",
                  onPress: async () => {
                    try {
                      setSpinner(true);

                      const value = await AsyncStorage.getItem("order-list");
                      const orderList = JSON.parse(value);

                      const selectedShop = await AsyncStorage.getItem(
                        "selected-shop"
                      );

                      const order = {
                        total: orderList.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        ),
                        shopNumber: JSON.parse(selectedShop).phoneNo,
                      };

                      const response = await axios.post("/sendTotal", order);
                      if (response.status === 200) {
                        try {
                          setOrderList([]);
                          await AsyncStorage.setItem(
                            "order-list",
                            JSON.stringify([])
                          );
                          await AsyncStorage.setItem(
                            "return-list",
                            JSON.stringify([])
                          );

                          setSpinner(false);

                          Toast.show({
                            type: "success",
                            text1: "Success",
                            text2: "Order sent successfully",
                          });

                          navigation.navigate("BottomBar");
                        } catch (error) {
                          console.log(error);
                          Toast.show({
                            type: "error",
                            text1: "Error",
                            text2: "Something went wrong",
                          });
                        }
                      }
                    } catch (error) {
                      console.log(error);
                      Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Something went wrong",
                      });
                      setSpinner(false);
                    }
                  },
                },
                {
                  text: "Close",
                  onPress: () => console.log("Option 3 selected"),
                },
                {
                  text: "Option 4",
                  onPress: () => console.log("Option 3 selected"),
                },
              ]
            );
          }}
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
            SEND BILL
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

export default ViewOrderScreen;
