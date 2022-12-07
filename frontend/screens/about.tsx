import { Flex, Box, Spacer } from "@react-native-material/core";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text } from "react-native";
import Header from "../common/header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

const About = () => {

  return (
    <SafeAreaView style={styles.container}>
        <Flex flex-grow style={{width:"100%"}}>
        <Header/>
          <ScrollView style={styles.aboutText}>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>App Purpose</Text>
            <Text style={{fontWeight: 'normal', fontSize: 16}}>The point of the app is to .... INSERT TEXT HERE DESCRIּBING APP PURPOSE{'\n'}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>App Structure</Text>
            <Text style={{fontWeight: 'normal', fontSize: 16}}>The app is structured as follows: projects, logs, borings, maps INSERT TEXT HERE DESCRIּBING APP STRUCTURE{'\n'}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>App Features</Text>
            <Text style={{fontWeight: 'normal', fontSize: 16}}>The app has the following features: INSERT TEXT HERE DESCRIּBING APP FEATURES{'\n'}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>How to use the app effectively</Text>
            <Text style={{fontWeight: 'normal', fontSize: 16}}>The app is structured as follows: projects, logs, borings, maps INSERT TEXT HERE DESCRIּBING APP STRUCTURE{'\n'}</Text>
          </ScrollView>
        </Flex>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  aboutText: {
    marginHorizontal: '4%',
    marginTop: 0,
    paddingTop: 0,

  }
});

export default About;