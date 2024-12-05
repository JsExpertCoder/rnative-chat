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

import { setBearerToken } from "../services/api";
import { Auth } from "../services/auth";
import { useTempUserStore } from "@tempStore/tempUserStore";
import { StatusBar } from "expo-status-bar";
import LoadingModal from "@components/loadingModal";

export default function App() {
  const tempUserStore = useTempUserStore();
  const [loading, setLoading] = useState(false);

  const users = [
    {
      id: 1,
      name: "Shadow Walker",
      image: require("@assets/users/shadow-walker.png"),
      credentials: {
        email: "marquardt.leif@example.com",
        password: "password",
      },
    },
    {
      id: 2,
      name: "Mister Glody",
      image: require("@assets/users/john.jpeg"),
      credentials: {
        email: "isabella43@example.com",
        password: "password",
      },
    },
    {
      id: 3,
      name: "WhiteSpot",
      image: require("@assets/users/whitespot.png"),
      credentials: {
        email: "isabell.kirlin@example.com",
        password: "password",
      },
    },
    {
      id: 4,
      name: "Mister Bug",
      image: require("@assets/users/mister-bug.jpeg"),
      credentials: {
        email: "hayley.fay@example.com",
        password: "password",
      },
    },
    {
      id: 5,
      name: "Mister JS",
      image: require("@assets/users/mister-js.jpeg"),
      credentials: {
        email: "vlarkin@example.org",
        password: "password",
      },
    },
  ];

  async function handleLogin(userCredentials) {
    userCredentials = [userCredentials.email, userCredentials.password];

    try {
      setLoading(true);
      const response = await Auth.login(...userCredentials);
      if (response.status == 200) {
        const data = response.data;
        console.log(data);
        setBearerToken(data.token);
        tempUserStore.save(data.user);
        setLoading(false);
        router.navigate("chat");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <View style={tw(`flex-1 bg-[#252526]`)}>
      <StatusBar style="light" />
      <LoadingModal visible={loading} />
      <Text
        style={tw(`bg-[#1e1e1e] text-white pt-13 pb-5 pl-4`, {
          fontSize: 25,
        })}
      >
        Login as :
      </Text>
      <ScrollView
        contentContainerStyle={tw(
          `flex-1 items-center justify-center p-4 gap-4`
        )}
      >
        {users.map((user) => {
          return (
            <TouchableOpacity
              key={user.id}
              onPress={() => handleLogin(user.credentials)}
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
      </ScrollView>
    </View>
  );
}
