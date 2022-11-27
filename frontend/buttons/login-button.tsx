import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button, Text, View } from "react-native";

export const LoginButton = ({setUser}) => {
  const { loginWithRedirect, user } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
    if (user) setUser(user);
  };

  return (<>
    <Button onPress={handleLogin} title="Log In"/>
    <View>
    <Text>{JSON.stringify(user)}</Text>
    </View>
    </>
  );
};