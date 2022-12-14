import { Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import { PORT } from '../env';
import Header from '../common/header';
import SelectLogList from '../models/SelectLogList';
import * as Location from 'expo-location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { LoginContext } from "../contexts/LoginContext";
import { getToken } from "../utils/secureStore";
import { logout } from "../common/logout";
import { useIsFocused } from "@react-navigation/native";
import {SubmitLog} from "../backend-calls/SubmitButtons"
import {DeleteProject} from "../backend-calls/DeleteButtons"
import {UpdateProject} from "../backend-calls/UpdateButtons"
import Ionicons from "react-native-vector-icons/Ionicons";
import AddLogModal from "../dialogs/AddLogModal"
import EditProjectModal from "../dialogs/EditProjectModal"
import Map from "../models/Map"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProjectListContext } from "../contexts/ProjectListContext";
import SelectProjectList from "../models/SelectProjectList";
import { LogListContext } from "../contexts/LogListContext";


const Tab = createBottomTabNavigator();

type Props = NativeStackScreenProps<RootStackParamList, 'Project'>;

const Title = (props: { name:string }) =>{
  return(
      <View style={styles.titleView}>
          <Text style={{fontWeight:'600', fontSize: 30, color: 'black'}}>{props.name}</Text>
      </View>
  )
}

const Project = ({ navigation, route}: Props) => {

  const [latitude, setLat] = useState(10);
  const [longitude, setLon] = useState(10);
  const [currProject, setProject] = useState(route.params.project);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const isFocused = useIsFocused();
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const { logList, setLogList } = useContext(LogListContext);

  const refreshProject = async () => {
    try {
      const token = await getToken();
      const fetched = await fetch(`${PORT}/projects/${currProject.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token ? token : ''}`,
        }
      });
      if (fetched.ok) {
        const updated_project = await fetched.json()
        setProject(updated_project)
      }
      else if (fetched.status === 401) {
        if (setIsLoggedIn) await logout(setIsLoggedIn);
      } 
    } catch(error) {
        console.error(error)
    }
  }

  const refreshProjectList = async () => {
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
            if (setProjectList) setProjectList(projects_list)
          }
      } catch(error) {
          console.error(error)
      }
    }

  const getLogs = async () => {
      try{
        const token = await getToken();
          const fetched = await fetch(`${PORT}/get_all_logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`
            },
            body: JSON.stringify({project_id: currProject.id})
        });
          if (fetched.ok) {
            const logs_list = await fetched.json()
            if (setLogList) setLogList(logs_list)
          }
          else if (fetched.status === 401) {
            if (setIsLoggedIn) await logout(setIsLoggedIn);
          } 
      } catch(error) {
          console.error(error)
      }
  }

  const getLatLon = async () => {
    if(latitude == 10 && longitude == 10) {
      try{
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
          let currLocation = await Location.getCurrentPositionAsync({});
          console.log("Retrieved location")
          setLat(currLocation.coords.latitude);
          setLon(currLocation.coords.longitude);
        })();
      } catch(error) {
          console.error(error)
      }
    }
  }
  //getLatLon();

  // This is what shows up in the 'Map' tab screen. 
  // This only exists because for some reason I can't put Map(logs) directly in the component field of Tab.screen-- 
  // probably just some esoteric type issue
  const MapComponent = () => Map(logList, navigation);

  useEffect(() => {
    if (isFocused) { 
      getLogs();
    }
  }, [isFocused]);

  // This is what shows up in the 'Logs' tab screen.
  const LogsComponent = () => {
    return(
      <View style={{backgroundColor: 'white'}}>
        <Box>
        <SelectLogList id={currProject.id} navigate={navigation} getLogs={getLogs} route={route}/> 
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
        <View style={{minHeight: "80%"}}>
          <Tab.Navigator
            initialRouteName="Log List"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Logs List') {
                  iconName = focused ? 'ios-list' : 'ios-list-outline';
                } else if (route.name === 'Maps') {
                  iconName = focused ? 'map' : 'map-outline';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
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
              name="Logs List"
              component = {LogsComponent} 
              options={{ tabBarLabel: 'Logs List' }}/>

            <Tab.Screen
              name="Maps"
              component={MapComponent}  //Had to use intermediary because can't put props directly in component-- probably a type issue
              options={{ tabBarLabel: 'Map' }}
            />
          </Tab.Navigator>
          </View>
            <Spacer />
            <View style={{ marginHorizontal: 6, marginBottom: 6, minHeight: '5%' }}>
            <Box style={{ margin: 4 }}>
              <AddLogModal project_id={currProject.id} getLogs={getLogs} getLatLon={getLatLon} setLat={setLat} setLon={setLon} lat={latitude} lon={longitude}/>
            </Box>
            <Box style={{ margin: 4 }}>
              {/* TODO: refresh */}
              <EditProjectModal project={currProject} updateProject={refreshProject} navigation={navigation} updateProjectList={refreshProjectList}/>
            </Box>
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
    height: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red',
    marginLeft: '2%'
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
  }
});

export default Project;
