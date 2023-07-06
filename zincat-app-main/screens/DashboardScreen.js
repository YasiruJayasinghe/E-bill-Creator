import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios";
import Spinner from "react-native-loading-spinner-overlay";

  const DashboardScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const getLocalStorage = async () => {
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        axios
          .get("/shops", {
            params: {
              SRID: JSON.parse(value).SRID,
            },
          })
          .then((res) => {
            setShops(res.data);
            setSpinner(false);
          })
          .catch((err) => {
            console.log(err);
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

      <View className="mx-16 mt-12">
        <Picker
          style={{
            backgroundColor: "#e0fbfc",
            borderRadius: 10,
          }}
          selectedValue={selectedValue}
          onValueChange={async (itemValue) => {
            console.log(itemValue);
            setSelectedValue(itemValue);

            try {
              await AsyncStorage.setItem(
                "selected-shop",
                JSON.stringify(itemValue)
              );
            } catch (error) {
              console.log("Error storing data: ", error);
            }
          }}
        >
          <Picker.Item label={"Select Shop"} enabled={false} />
          {shops.map((shop, index) => (
            <Picker.Item key={index} label={shop.shop_name} value={shop} />
          ))}
        </Picker>
      </View>

      <View className="flex-1 justify-center space-y-16">
        <TouchableOpacity
          onPress={() => navigation.navigate("AddNewOrder")}
          style={{
            backgroundColor: "#ff9900",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 20,
          }}
          className="mx-16"
        >
          <Text style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "bold" }}>
            NEW ORDER
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("AddReturnItem")}
          style={{
            backgroundColor: "#ff9900",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 20,
          }}
          className="mx-16"
        >
          <Text style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "bold" }}>
            RETURN ITEM
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DailyList")}
          style={{
            backgroundColor: "#ff9900",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 20,
          }}
          className="mx-16"
        >
          <Text style={{ fontSize: 18, color: "#FFFFFF", fontWeight: "bold" }}>
            DAILY ITEM LIST
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});
