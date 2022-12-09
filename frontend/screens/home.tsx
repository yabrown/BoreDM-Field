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
import { ProjectListContext } from "../contexts/ProjectListContext";


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;



// const Drawer = createDrawerNavigator();





const Tab = createBottomTabNavigator();
const Map = (logs, navigate, updateLogList) => {

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



const Home = ({ navigation }: Props) => {

  const { projectList, setProjectList } = useContext(ProjectListContext);
  // {name: "default", id: -1, client:"default", location:"default", notes:"default"}
  const { setIsLoggedIn } = useContext(LoginContext);
  const isFocused = useIsFocused();
  //Important: the default log includes a coordinate set, w
  const [logs, setLogs] = useState<log[]>([]);
  // const insets = useSafeAreaInsets();

  useEffect(() => {
    const refresh = async () => {
    if (isFocused) { 
      await Promise.all([getProjectsList(), getAllLogs()]);
    }
  }
  refresh();
  console.log('refreshed')
  }, [isFocused]);
  

  const getProjectsList: () => void = async () => {
    try {
      const token = await getToken();  
      const fetched = await fetch(`${PORT}/get_all_projects`, {
        headers: {
          'Authorization': `Bearer ${token ? token : ''}`
        }
      });
        if (fetched.status === 401) {
          if (setIsLoggedIn) await logout(setIsLoggedIn);
        } 
        else if (fetched.ok) {
          const projects_list = await fetched.json()
          if (projects_list.length > 0 && setProjectList) setProjectList(projects_list)
        }
    } catch(error) {
        console.error(error)
    }
  }

  const getAllLogs = async () => {
    try{
        const token = await getToken();
        const fetched = await fetch(`${PORT}/get_all_logs_absolute`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token ? token : ''}`
          }
      });
        if (fetched.ok) {
          const logs = await fetched.json()
          setLogs(logs)
          console.log("got all logs for markers")
        }
        if (fetched.status === 401) {
          if (setIsLoggedIn) await logout(setIsLoggedIn);
        }
    } catch(error) {
        console.error(error)
    }
  }

  // This is what shows up in the 'Map' tab screen. 
  // This only exists because for some reason I can't put Map(logs) directly in the component field of Tab.screen-- 
  // probably just some esoteric type issue
  const MapComponent = () => {
    return Map(logs, navigation, getAllLogs)
  }

  // This is what shows up in the 'Projects' tab screen.
  const ProjectsComponent = () => {
    return(
      <View style={{backgroundColor: 'white'}}>
        <Box>
          <SelectProjectList navigate={navigation} projects={projectList} onUpdate={getProjectsList}/>
        </Box>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Flex fill flex-grow style={{width:"100%"}}>
      <View>
          <Header/>
        </View>
        <View style={{minHeight: "85%"}}>
          <Tab.Navigator
            initialRouteName="Project List"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName;
    
                if (route.name === 'Project List') {
                  iconName = focused ? 'ios-list' : 'ios-list-outline';
                } else if (route.name === 'Maps') {
                  iconName = focused ? 'map' : 'map-outline';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={(Dimensions.get('window').height * Dimensions.get('window').width) / 35000} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              lazy: true,
              tabBarScrollEnabled: false,
              tabBarStyle: { height: '10%' },
              tabBarLabelStyle: { fontSize: (Dimensions.get('window').height * Dimensions.get('window').width) / 35000 },
            })}
            // screenOptions={{
            //   tabBarActiveTintColor: '#000000',
            //   tabBarLabelStyle: { fontSize: 12 },
            //   tabBarStyle: { backgroundColor: 'white' },
            //   // tabBarIndicatorStyle: { backgroundColor: 'black' },
            //   lazy: true,
            //   tabBarScrollEnabled: false,
            // }}
            sceneContainerStyle= {{backgroundColor: 'white'}}
          >
            <Tab.Screen
              name="Project List"
              component = {ProjectsComponent} 
              options={{ tabBarLabel: 'Project List' }}/>

            <Tab.Screen
              name="Maps"
              component={MapComponent}  //Had to use intermediary because can't put props directly in component-- probably a type issue
              options={{ tabBarLabel: 'Map' }}
            />
          </Tab.Navigator>
        </View>
        <Spacer />
        <View style={{ marginHorizontal: 6, marginBottom: 6, minHeight: '5%' }}>
          <AddProjectModal onUpdate={getProjectsList}/>
        </View>
      </Flex>
    </SafeAreaView>
  )
    }



const showViews = 0
//TODO: change this so that it only calulcates once, in the right place
let height = Dimensions.get('window').height
let width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: showViews,
    borderColor: 'red',
    padding: 10,
  },
  titleView: {
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: showViews,
    borderColor: 'red'
  },
  modalView: {
    margin: 20,
    height: height/2,
    width: width/2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-evenly',
    borderWidth: showViews,
    borderColor: 'red'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#000000",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textInput: {
    backgroundColor: 'white',
    marginBottom:4
  }
});

export default Home;

