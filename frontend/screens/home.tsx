import { Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { google } from 'googleapis';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import Header from '../common/header';
import { PORT } from '../env';
import SelectProjectList from '../models/SelectProjectList';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import * as Location from 'expo-location';
import PagerView from 'react-native-pager-view';
import Project from "./project";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type SubmitProps = { project: { name: string, client: string, location: string, notes: string }, setvis: React.Dispatch<React.SetStateAction<boolean>>, onUpdate: () => void}

// The component that deals with the adding a new project
const SubmitProject = ( { project, setvis, onUpdate } : SubmitProps ) => {
  const onPress = async () => {
    setvis(false)
      try {
          let fetched = await fetch(`${PORT}/add_project`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({project_name: project.name, client_name: project.client, project_location: project.location, project_notes: project.notes})
          })
          onUpdate();
          console.log("status:", fetched.status)
      } catch(error) {
              console.error('Error:', error);
          }
  }

  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Create</PaperButton>);
}

//This returns a scrollable view containing the projectButton components

// Returns text to go above changing view-- Ex: Project, Map, Mariner's Apartment
const Title = (props: { name:string }) =>{
  return(
      <View style={styles.titleView}>
          <Text style={{fontWeight:'500', fontSize: 20, color: 'black'}}>{props.name}</Text>
      </View>
  )
}

const AddProjectModal = ({ onUpdate }) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [textFields, setTextFields] = useState({name: "", client: "", location: "", notes: ""});

  return (
      <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Project</PaperButton>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
            <Dialog.Title style={{color: 'black'}}>New Project</Dialog.Title>
            <Dialog.Content>
              <View>
                <TextInput value={textFields.name} label={"Project Name"} mode={"outlined"} onChangeText={(projectText) => setTextFields({ ...textFields, name: projectText })} style={styles.textInput} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={textFields.client} label="Client Name" mode="outlined" onChangeText={(clientText) => setTextFields({ ...textFields, client: clientText })} style={styles.textInput} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={textFields.location} label="Location" mode="outlined" onChangeText={(textLocation) => setTextFields({ ...textFields, location: textLocation })} style={styles.textInput} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={textFields.notes} label="Notes" mode="outlined" onChangeText={(notesText) => setTextFields({ ...textFields, notes: notesText })} style={styles.textInput} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
              <SubmitProject project={textFields} setvis={setVisible} onUpdate={onUpdate}/>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

const Tab = createMaterialTopTabNavigator();
const Map = (logs, navigate) => {
  
  const default_location= {
  coords: {
    accuracy: 16.548999786376953, 
    altitude: -20.100000381469727, 
    altitudeAccuracy: 1, 
    heading: 0, 
    latitude: 40.6240629, 
    longitude: -73.9631628, 
    speed: 0},
  mocked: false, 
   timestamp: 1669592647218
  }
  const [location, setLocation] = useState<Location.LocationObject>(default_location);
  const [errorMsg, setErrorMsg] = useState('');

  
    /*(async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currLocation = await Location.getCurrentPositionAsync({});
      setLocation(currLocation);
      console.log(currLocation)
    })();*/
  
    const MarkerToLogScreen = (marker) => {

    }

  return(
    <View style={{
      ...StyleSheet.absoluteFillObject,
      height: '100%', // you can customize this
      width: '100%',  // you can customize this
      alignItems: "center"
    }}>

    <MapView style={{ ...StyleSheet.absoluteFillObject }}

      initialRegion={{
        latitude: logs[0].latitude,
        longitude: logs[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsMyLocationButton={true}
      provider = {PROVIDER_GOOGLE}
      mapType = {"hybrid"}
    >
        {/* This is what shows up on the map-- a list of markers, each corresponding to a log, with it's key and coordinates*/}
        {logs.map(log=>
          (<Marker coordinate={{latitude: log.latitude,
          longitude: log.longitude}} key={log.id}
          onPress={e => navigate.navigate('Log', {log})}
          />))}

      </MapView>
      
    </View>
)
    }



const Home = ({ navigation }: Props) => {

  const [projectsList, setProjectsList] = useState<project[]>([{name: "default", id: -1, client:"default", location:"default", notes:"default"}])
  //Important: the default log includes a coordinate set, w
  const [logs, setLogs] = useState([{project_id: -1, id: -1, name: "default", driller: "default", logger: "default", notes: "default", latitude: 40.6240629, longitude: -73.9631628}]);

  const getProjectsList: () => void = async () => {
    try{
        const fetched = await fetch(`${PORT}/get_all_projects`);
        const projects_list = await fetched.json()
        setProjectsList(projects_list)
    } catch(error) {
        console.error(error)
    }
  }

  const getAllLogs = async () => {
    try{
        const fetched = await fetch(`${PORT}/get_all_logs_absolute`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }
      });
        const logs = await fetched.json()
        setLogs(logs)
        console.log("got all logs for markers")
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

  useEffect(() => {
    getProjectsList();
    getAllLogs()
  }, []);

  // This is what shows up in the 'Projects' tab screen.
  const ProjectsComponent = () => {
    return(
      <View style={{backgroundColor: 'white'}}>
        <Box>
          <SelectProjectList navigate={navigation} projects={projectsList} onUpdate={getProjectsList}/>
        </Box>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Flex fill flex-grow style={{width:"100%"}}>
        <Box>
          <Header/>
        </Box>
        <Box style={{minHeight: "70%"}}>
          <Tab.Navigator
            initialRouteName="Projects"
            screenOptions={{
              tabBarActiveTintColor: '#000000',
              tabBarLabelStyle: { fontSize: 12 },
              tabBarStyle: { backgroundColor: 'white' },
              tabBarIndicatorStyle: { backgroundColor: 'black' },
              lazy: true
            }}
            sceneContainerStyle= {{backgroundColor: 'white'}}
          >
            <Tab.Screen
              name="Projects"
              component = {ProjectsComponent} 
              options={{ tabBarLabel: 'Projects' }}/>

            <Tab.Screen
              name="Maps"
              component={MapComponent}  //Had to use intermediary because can't put props directly in component-- probably a type issue
              options={{ tabBarLabel: 'Map' }}
            />
          </Tab.Navigator>
        </Box>
        <Spacer />
        <Box style={{ margin: 6 }}>
          <AddProjectModal onUpdate={getProjectsList}/>
        </Box>
      </Flex>
    </View>
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
