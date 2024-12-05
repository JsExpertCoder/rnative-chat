// src/components/ChatInterface.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { style as tw } from "twrnc";
import useEcho from "src/hooks/echo";
import { api } from "@services/api";
import { useTempUserStore } from "@tempStore/tempUserStore";
import { useLocalSearchParams } from "expo-router";

const Room = () => {
  // const room = useLocalSearchParams();
  const [room, seTRoom] = useState({
    id: 1,
  });
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const [isUserTyping, setIsUserTyping] = useState(false);
  const [userTyping, setUserTyping] = useState("");

  const echo = useEcho();
  const tempUserStore = useTempUserStore();

  const handleSend = async () => {
    if (inputText.trim()) {
      // console.log({
      //   room_id: room?.id,
      //   from: tempUserStore.data.id,
      //   message: inputText,
      // });
      // return;
      setInputText("");
      const options = {
        method: "POST",
        url: "/send-room-message",
        data: {
          room_id: room?.id,
          from: tempUserStore.data.id,
          message: inputText,
        },
      };

      try {
        const response = await api.request(options);
        // console.log("response", response.data);
        // console.log("setMessages", {
        //   id: response.data.data?.message?.id,
        //   from: tempUserStore.data.id,
        //   message: response.data.data?.message?.message,
        // });
        // return;
        // if (response.status === 200) {
        //   const data = response.data.data;
        //   setMessages((prevMessages) => [
        //     ...prevMessages,
        //     {
        //       id: data?.message?.id,
        //       from: tempUserStore.data.id,
        //       message: data?.message?.message,
        //     },
        //   ]);
        // }
      } catch (error) {
        console.error(error);
      }
    }
  };

  function subscribeToChatChannel() {
    if (echo && room) {
      console.log("room to channel", room);
      echo
        .private(`chat.room.${room?.id}`)
        .listen("RoomMessageSent", (e) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: e.message?.id,
              message: e.message?.message,
              from: e.message?.from,
            },
          ]);
        })
        .listenForWhisper("typing", (e) => {
          setIsUserTyping(true);
          setUserTyping(e.user);
        });
    }
  }

  function sendTypeEvent(str) {
    setInputText(str);

    echo.private(`chat.room.${room?.id}`).whisper("typing", {
      user: tempUserStore?.data?.name,
    });
  }

  useEffect(() => {
    if (echo) {
      console.log("user", tempUserStore.data.id);
      console.log("room", room);

      subscribeToChatChannel();
    }
    return () => {
      if (echo && room) {
        echo.leaveChannel(`chat.room?.${room?.id}`);
      }
    };
  }, [echo, room]);

  const renderItem = ({ item }) => (
    <View
      style={tw(
        `flex flex-row  my-2`,
        item.from == tempUserStore.data.id ? `justify-end` : "justify-start"
      )}
    >
      <View
        style={tw(
          `rounded-lg p-6 max-w-3/4`,
          item.from == tempUserStore.data.id ? "bg-[#1EBEA5]" : "bg-[#8696a0]"
        )}
      >
        <Text style={tw`text-white`}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-[#0b141a]`}>
      {isUserTyping && (
        <View style={tw`p-4 border border-gray-700 gap-2`}>
          <View style={tw`bg-blue-500 p-6 rounded-lg`}>
            <Text style={tw`text-white`}>{userTyping} is typing</Text>
          </View>
        </View>
      )}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`p-4`}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={tw`p-4 border border-gray-700 gap-2`}>
          <View style={tw`bg-blue-500 p-6 rounded-lg`}>
            <Text style={tw`text-white`}>{tempUserStore?.data?.name}</Text>
          </View>
        </View>
        <View style={tw`flex flex-row p-4 border-t border-gray-700 gap-2`}>
          <TextInput
            style={tw`flex-1 bg-gray-800 text-white p-6 rounded-lg`}
            value={inputText}
            onChangeText={(str) => sendTypeEvent(str)}
            placeholder="Type a message..."
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            onPress={handleSend}
            style={tw`bg-blue-500 p-6 rounded-lg`}
          >
            <Text style={tw`text-white`}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Room;