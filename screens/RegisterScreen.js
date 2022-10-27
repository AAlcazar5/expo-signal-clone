import { View } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
      headerTitleStyle: "#fff",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      className="flex-1 items-center justify-center p-2.5 bg-white"
    >
      <StatusBar style="light" />
      <Text h3 className="mb-12">
        Create a Signal Account
      </Text>
      <Input
        placeholder="Full Name"
        autoFocus
        type="text"
        className="mt-8 w-56"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Email"
        autoFocus
        type="email"
        className="mt-8 w-56"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        type="pasword"
        className="mt-8 w-56"
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
      />
      <Input
        placeholder="Profile Picture URL (optional)"
        autoFocus
        type="text"
        className="mt-8 w-56"
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
        onSubmitEditing={register}
        autoCapitalize="none"
      />
      <Button className="w-48" title="Register" raised onPress={register} />
      <View className="h-24" />
    </KeyboardAvoidingView>
  );
}
