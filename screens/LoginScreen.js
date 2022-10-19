import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unSubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      className="flex-1 items-center justify-center"
    >
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png",
        }}
        className="w-48 h-48"
      />
      <View className="w-72">
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="pasword"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
          autoCapitalize="none"
        />
      </View>
      <Button className="w-48 mt-2.5 font-lg" onPress={signIn} title="Login" />
      <Button
        className="w-48 mt-2.5"
        title="Register"
        type="outline"
        onPress={() => navigation.navigate("Register")}
      />
      <View className="h-24" />
    </KeyboardAvoidingView>
  );
}
