import React from "react";
import { View, Text } from "react-native";
import { style as tw } from "twrnc";

export default function chatUserComponent({ user, onPress }) {
  return (
    <TouchableOpacity
      key={user.id}
      onPress={onPress}
      style={tw`flex-row items-center w-full bg-blue-500 p-4 gap-4 rounded-lg`}
      activeOpacity={0.7}
    >
      <View style={tw(`w-16 h-16 rounded-full`)}>
        <Image
          source={user.image}
          style={tw(`w-full h-full rounded-full`)}
          resizeMode="cover"
        />
      </View>
      <Text
        style={tw(`text-white`, {
          fontSize: 17,
        })}
      >
        {user.name}
      </Text>
    </TouchableOpacity>
  );
}
