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
import { useIsFocused } from "@react-navigation/native";

const ProductListScreen = () => {
  const isFocused = useIsFocused();
  const [spinner, setSpinner] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getLocalStorage = async () => {
      axios
        .get("/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setSpinner(false);
          setFilteredProducts(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };

    getLocalStorage();
  }, [isFocused]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = products.filter((product) => {
      const productName = product.Pname.toLowerCase();
      const searchLowerCase = text.toLowerCase();
      return productName.includes(searchLowerCase);
    });
    setFilteredProducts(filtered);
  };

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
            Product List
          </Text>
          <View className="flex-row items-center mx-10 mt-3">
            <TextInput
              className="bg-gray-200 p-2 rounded w-full"
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <Ionicons name="search" size={24} color="gray" className="ml-2" />
          </View>
        </View>
        <ScrollView className="flex-1 space-y-2 mt-5" stickyHeaderIndices={[0]}>
          <View className="flex-row justify-evenly bg-orange-200 p-3 mx-5 rounded">
            <Text className="text-black text-xl font-bold underline">Name</Text>
            <Text className="text-black text-xl font-bold underline">
              Description
            </Text>
          </View>

          {filteredProducts.map((product, index) => (
            <View
              className="flex-row justify-evenly bg-orange-100 p-5 mx-5 rounded"
              key={index}
            >
              <Text className="text-black text-lg flex-1">{product.Pname}</Text>
              <Text className="text-black text-lg flex-1">
                {product.shortdescription}
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
export default ProductListScreen;
