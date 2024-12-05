import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import { style as tw } from "twrnc";

import { useTempUserStore } from "@tempStore/tempUserStore";
import { StatusBar } from "expo-status-bar";
import LoadingModal from "@components/loadingModal";

export default function ChatUserComponent() {
  const [loading, setLoading] = useState(false);
  const tempUserStore = useTempUserStore();
  // console.log(tempUserStore);

  const users = [
    {
      id: 1,
      name: "Shadow Walker",
      image: require("@assets/users/shadow-walker.png"),
      credentials: {
        email: "sw@example.com",
        password: "password",
      },
    },
    {
      id: 2,
      name: "Mister Glody",
      image: require("@assets/users/john.jpeg"),
      credentials: {
        email: "mr.glody@example.com",
        password: "password",
      },
    },
    {
      id: 3,
      name: "WhiteSpot",
      image: require("@assets/users/whitespot.png"),
      credentials: {
        email: "wsp@example.com",
        password: "password",
      },
    },
    {
      id: 4,
      name: "Mister Bug",
      image: require("@assets/users/mister-bug.jpeg"),
      credentials: {
        email: "mr.bug@example.com",
        password: "password",
      },
    },
    {
      id: 5,
      name: "Mister JS",
      image: require("@assets/users/mister-js.jpeg"),
      credentials: {
        email: "mr.js@example.com",
        password: "password",
      },
    },
  ].filter((user) => user.id != tempUserStore.data.id);

  async function handleLogin() {
    try {
      setLoading(true);

      setLoading(false);
      router.navigate("chat");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <View style={tw(`bg-[#252526] flex-1`)}>
      <StatusBar style="light" />
      <LoadingModal visible={loading} />
      <Text
        style={tw(`bg-[#1e1e1e] text-white pt-13 pb-5 pl-4`, {
          fontSize: 25,
        })}
      >
        Chat with :
      </Text>
      <ScrollView
        contentContainerStyle={tw(
          `items-center justify-center pt-10 px-4 gap-4 pb-20`
        )}
        showsVerticalScrollIndicator={false}
      >
        {users.map((user) => {
          return (
            <TouchableOpacity
              key={user.id}
              onPress={() => {
                router.push({
                  pathname: `/chat/oneToOne`,
                  params: user,
                });
              }}
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
        })}
        <View style={tw`w-20 h-2 bg-orange-500 rounded-full`}></View>
        <TouchableOpacity
          onPress={() => {
            router.push({ pathname: "/chat/room", params: { roomId: 1 } });
          }}
          style={tw`flex-row items-center w-full bg-orange-300 p-4 gap-4 rounded-lg`}
          activeOpacity={0.7}
        >
          <View style={tw(`w-16 h-16 rounded-full`)}>
            <Image
              source={require("@assets/fenix.jpg")}
              style={tw(`w-full h-full rounded-full`)}
              resizeMode="cover"
            />
          </View>
          <Text
            style={tw(`text-white`, {
              fontSize: 17,
            })}
          >
            Fenix Group
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
