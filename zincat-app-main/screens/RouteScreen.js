import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import axios from "../axios";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const RouteScreen = () => {
  const isFocused = useIsFocused();

  const [markers, setMarkers] = useState([]);

  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const getLocalStorage = async () => {
      const value = await AsyncStorage.getItem("user-data");
      if (value !== null) {
        axios
          .get("/routes", {
            params: {
              SRID: JSON.parse(value).SRID,
            },
          })
          .then((res) => {
            setMarkers(JSON.parse(res.data[0].location));
            setSpinner(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    getLocalStorage();
  }, [isFocused]);

  return (
    <>
      {spinner ? (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      ) : (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: markers[0].latitude,
            longitude: markers[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers.map((data, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}
            />
          ))}
        </MapView>
      )}
    </>
  );
};

export default RouteScreen;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});
