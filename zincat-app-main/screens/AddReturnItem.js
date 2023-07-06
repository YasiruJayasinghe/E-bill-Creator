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
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";

const AddReturnItem = ({ navigation }) => {
  const [spinner, setSpinner] = useState(true);

  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const [manufacturer, setManufacturer] = useState([]);
  const [selectedValueManufacturer, setSelectedValueManufacturer] =
    useState("");

  const [products, setProducts] = useState([]);
  const [selectedValueProduct, setSelectedValueProduct] = useState("");

  const [productID, setProductID] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("1");

  useEffect(() => {
    const getLocalStorage = async () => {
      const value = await AsyncStorage.getItem("selected-shop");
      if (value !== null) {
        setShopName(JSON.parse(value).shop_name);
        axios
          .get("/categories")
          .then((res) => {
            console.log(res.data);
            setCategory(res.data);
            setSpinner(false);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    };

    getLocalStorage();
  }, []);
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
            New Return Item
          </Text>
        </View>

        <View className="px-6 flex justify-evenly flex-1">
          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">Shop Name</Text>
            <TextInput
              className="w-full rounded px-2 h-10 text-black text-lg"
              type="text"
              style={{
                backgroundColor: "#e0fbfc",
              }}
              value={shopName}
              editable={false}
            />
          </View>

          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">
              Category Name
            </Text>
            <Picker
              style={{
                backgroundColor: "#e0fbfc",
              }}
              selectedValue={selectedValue}
              onValueChange={(itemValue) => {
                setSpinner(true);
                setSelectedValue(itemValue);

                axios
                  .get("/manufacturers", {
                    params: {
                      categoryID: itemValue.categoryID,
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    setManufacturer(res.data);
                    setSpinner(false);
                  })
                  .catch((err) => {
                    console.log(err.response.data);
                  });
              }}
              placeholder="Select Category"
            >
              <Picker.Item label={"Select Category"} enabled={false} />

              {category.map((item, index) => (
                <Picker.Item
                  label={item.categoryName}
                  value={item}
                  key={index}
                />
              ))}
            </Picker>
          </View>

          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">
              Manufacturer Name
            </Text>
            <Picker
              style={{
                backgroundColor: "#e0fbfc",
              }}
              selectedValue={selectedValueManufacturer}
              onValueChange={(itemValue) => {
                setSpinner(true);
                setSelectedValueManufacturer(itemValue);

                console.log("itemValue", itemValue);
                console.log("selectedValue", selectedValue);

                axios
                  .get("/productsByCategoryAndManufacturer", {
                    params: {
                      categoryID: itemValue.categoryID,
                      manufacturerID: itemValue.MID,
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    setProducts(res.data);
                    setSpinner(false);
                  })
                  .catch((err) => {
                    console.log(err.response.data);
                  });
              }}
            >
              <Picker.Item label={"Select Manufacturer"} enabled={false} />

              {manufacturer.map((item, index) => (
                <Picker.Item label={item.Mname} value={item} key={index} />
              ))}
            </Picker>
          </View>

          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">
              Product Name
            </Text>
            <Picker
              style={{
                backgroundColor: "#e0fbfc",
              }}
              selectedValue={selectedValueProduct}
              onValueChange={(itemValue) => {
                setSelectedValueProduct(itemValue);
                setProductID(itemValue.PID.toString());
                setPrice(itemValue.sellingprice.toString());
              }}
            >
              <Picker.Item label={"Select Product"} enabled={false} />

              {products.map((item, index) => (
                <Picker.Item label={item.Pname} value={item} key={index} />
              ))}
            </Picker>
          </View>

          <View className="space-y-2">
            <Text className="text-black text-lg font-semibold">Product ID</Text>
            <TextInput
              className="w-full rounded px-2 h-10 text-black text-lg"
              type="text"
              style={{
                backgroundColor: "#e0fbfc",
              }}
              value={productID}
              editable={false}
            />
          </View>

          <View className="flex-row justify-evenly space-x-2">
            <View className="space-y-2 flex-1">
              <Text className="text-black text-lg font-semibold">
                Product Price
              </Text>
              <TextInput
                className="w-full rounded px-2 h-10 text-black text-lg"
                type="text"
                style={{
                  backgroundColor: "#e0fbfc",
                }}
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
            </View>

            <View className="space-y-2 flex-1">
              <Text className="text-black text-lg font-semibold">Quantity</Text>
              <TextInput
                className="w-full rounded px-2 h-10 text-black text-lg"
                type="text"
                style={{
                  backgroundColor: "#e0fbfc",
                }}
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
              />
            </View>
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={async () => {
                if (
                  shopName == "" ||
                  selectedValue == "" ||
                  selectedValueManufacturer == "" ||
                  selectedValueProduct == "" ||
                  productID == "" ||
                  price == "" ||
                  quantity == ""
                ) {
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Please fill all fields",
                  });

                  return;
                }

                try {
                  const value = await AsyncStorage.getItem("return-list");
                  if (value == null) {
                    await AsyncStorage.setItem(
                      "return-list",
                      JSON.stringify([
                        {
                          shopName: shopName,
                          category: selectedValue.categoryName,
                          manufacturer: selectedValueManufacturer.Mname,
                          product: selectedValueProduct.Pname,
                          productID: productID,
                          price: price,
                          quantity: quantity,
                        },
                      ])
                    );
                  } else {
                    const list = JSON.parse(value);
                    list.push({
                      shopName: shopName,
                      category: selectedValue.categoryName,
                      manufacturer: selectedValueManufacturer.Mname,
                      product: selectedValueProduct.Pname,
                      productID: productID,
                      price: price,
                      quantity: quantity,
                    });
                    await AsyncStorage.setItem(
                      "return-list",
                      JSON.stringify(list)
                    );
                  }

                  Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Order Added Successfully",
                  });
                } catch (error) {
                  console.log("Error storing data: ", error);
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Error storing data",
                  });
                }
              }}
              className="bg-orange-300 rounded-2xl p-2 flex-1"
            >
              <Text
                className="text-center"
                style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "bold" }}
              >
                ADD ITEM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ViewReturnItems")}
              className="bg-orange-300 rounded-2xl p-2 flex-1"
            >
              <Text
                className="text-center"
                style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "bold" }}
              >
                VIEW RETURN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default AddReturnItem;
