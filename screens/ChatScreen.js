import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function ChatScreen({ navigation, route }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      //headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.5}
          >
            <Avatar
              rounded
              source={{
                uri: messages[0]?.data.photoURL,
              }}
            />
          </TouchableOpacity>

          <Text className="text-white ml-2.5 font-bold">
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => <TouchableOpacity></TouchableOpacity>,
      headerRight: () => (
        <View className="flex-row justify-between w-20 mr-5">
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unSubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unSubscribe;
  }, [route]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        behavior={Platform.OS === "ios" ? "padding" : null}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView className="pt-3.5">
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View
                    key={id}
                    style={{ maxWidth: "80%" }}
                    className="p-3.5 bg-gray-200 self-end rounded-lg mr-3.5 mb-5 relative"
                  >
                    <Avatar
                      position="absolute"
                      rounded
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text className="text-black ml-3 font-medium">
                      {data.message}
                    </Text>
                  </View>
                ) : (
                  <View
                    key={id}
                    style={{ maxWidth: "80%" }}
                    className="p-3.5 bg-blue-400 self-start rounded-lg m-3.5 relative"
                  >
                    <Avatar
                      position="absolute"
                      rounded
                      bottom={-15}
                      left={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text className="bg-white font-medium ml-2.5 mb-3.5">
                      {data.message}
                    </Text>
                    <Text className="left-2.5 pr-2.5 text-xs text-white">
                      {data.displayName}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>
            <View className="flex-row align-center w-100 p-3.5">
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
                placeholder="Send Message"
                className="b-0 h-10 flex-1 mr-3.5 border-transparent bg-gray-100 p-2.5 text-gray rounded-md"
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
