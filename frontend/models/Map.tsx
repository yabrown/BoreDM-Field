import { Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { google } from 'googleapis';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import Header from '../common/header';
import { PORT } from '../env';
import SelectProjectList from '../models/SelectProjectList';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import { logout } from "../common/logout";
import { LoginContext } from "../contexts/LoginContext";
import { getToken } from "../utils/secureStore";
import { useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SubmitProject} from "../backend-calls/SubmitButtons"
import AddProjectModal from "../dialogs/AddProjectModal"


const Map = (logs, navigate) => {

  return(
    <View style={{
      ...StyleSheet.absoluteFillObject,
      height: '100%', // you can customize this
      width: '100%',  // you can customize this
      alignItems: "center"
    }}>

    <MapView style={{ ...StyleSheet.absoluteFillObject }}

initialRegion={
  {
  latitude: logs[0] && logs[0].latitude,
  longitude: logs[0] && logs[0].longitude,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
  }   

// initialRegion={
      //   logs[0] ? {
      //   latitude: logs[0] && logs[0].latitude,
      //   longitude: logs[0] && logs[0].longitude,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // } : {}
}
      // showsMyLocationButton={true}
      provider = {PROVIDER_GOOGLE}
      mapType = {"hybrid"}
    >
        {/* This is what shows up on the map-- a list of markers, each corresponding to a log, with it's key and coordinates*/}
        {logs.map(log=>
          (<Marker coordinate={{latitude: log.latitude,
          longitude: log.longitude}} key={log.id}
          // onPress={() => navigate.navigate('Log', {log, updateLogList})}
          onPress={() => navigate.navigate('Log', {log })}
          />))}

      </MapView>
      
    </View>
)
}

export default Map