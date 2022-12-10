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
import Map from "../models/Map"
import { ProjectListContext } from "../contexts/ProjectListContext";


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;



// const Drawer = createDrawerNavigator();





const Tab = createBottomTabNavigator();


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
    return Map(logs, navigation)
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
          <ProjectsComponent/>
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

