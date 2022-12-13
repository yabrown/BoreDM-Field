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
            <Text style={{fontWeight: 'normal', fontSize: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>App Purpose{'\n'}</Text>
            {'\u25CF '}The point of the app is to .... INSERT TEXT HERE DESCRIּBING APP PURPOSE{'\n'}
            <Text style={{fontWeight: 'bold', fontSize: 30}}>{'\n'}App Structure{'\n'}</Text>
            {'\u25CF '}The app is structured as follows: projects, logs, borings, maps INSERT TEXT HERE DESCRIּBING APP STRUCTURE{'\n'}
            <Text style={{fontWeight: 'bold', fontSize: 30}}>{'\n'}App Features{'\n'}</Text>
            {'\u25CF '}The app has the following features: INSERT TEXT HERE DESCRIּBING APP FEATURES{'\n'}
            <Text style={{fontWeight: 'bold', fontSize: 30}}>{'\n'}How to use the app effectively{'\n'}</Text>
            {'\u25CF '}BoreDM Field is a web-app that allows geotechnical engineers to 
            directly enter soil information from the field into an online 
            database for storage and later processing.{'\n'}{'\n'}
            {'\u25CF '}The vast majority of geotechnical engineers currently take field 
            notes for soil borings with pieces of paper on a clipboard.{'\n'}{'\n'}
            {'\u25CF '}As younger engineers enter the industry, it is becoming more common 
            for paper field logs to be left (or forgotten) in the office and 
            field notes to be done on native phone apps for notetaking. The 
            result is low-quality field notes, or worse, the occasional loss 
            of field data (resulting in $3,000 of field work needing to be 
            replicated per boring).{'\n'}{'\n'}
            {'\u25CF '}BoreDM Field is solving this problem by providing a lightweight, simple interface for geotechnical engineers to enter data directly from the field. The program has a user-friendly interface optimized for field-work with POS-style data entry, graphic visualizations, and a built-in map so that engineers can spend more time boring, and less time being bored. We're excited to be at the cutting-edge of the geotechnical soil exploration industry and look forward to working with you for all your soil needs.
            </Text>
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