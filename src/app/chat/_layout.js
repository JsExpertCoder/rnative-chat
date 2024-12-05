import React from "react";
import { View, Text, StatusBar } from "react-native";

import { Slot } from "expo-router";
import { Stack } from "expo-router/stack";

export default function bookingsLayout() {
  return (
    <Stack
      // https://reactnavigation.org/docs/headers#sharing-common-options-across-screens
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: "",
        // },
        // headerTintColor: "",
        // headerTitleStyle: {
        //   fontWeight: "bold",
        // },
      }}
    >
      {/* Optionally configure static options outside the route. */}
      {/* <Stack.Screen name="index" options={{}} /> */}
      {/* <Stack.Screen name="space/[id]" options={{}} />
      <Stack.Screen name="space/schedule" options={{}} />
      <Stack.Screen name="space/book" options={{}} />
      <Stack.Screen name="space/booked/[id]" options={{}} /> */}
    </Stack>
  );
}
