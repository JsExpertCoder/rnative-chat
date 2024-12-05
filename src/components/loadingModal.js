import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { style as tw } from "twrnc";

const LoadingModal = ({ visible = false, label }) => {
  return (
    visible && (
      <View
        style={tw(`absolute z-50 w-full h-full items-center justify-center`, {
          backgroundColor: " rgba(0, 0, 0, 0.5)",
        })}
      >
        <ActivityIndicator style={tw``} size={"large"} color={"#007acc"} />
        {/* <View style={tw`bg-gray-200 items-center py-10 justify-center w-80 h-32 rounded`}>
        <Text  style={[tw`font-semibold  text-black`, {
          fontSize: 20
        }]}>{ label }</Text>
      </View> */}
      </View>
    )
  );
};

export default LoadingModal;

const styles = StyleSheet.create({});
