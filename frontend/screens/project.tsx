import { Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import { PORT } from '../env';
import Header from '../common/header';
import SelectLogList from '../models/SelectLogList';
import * as Location from 'expo-location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';


type Props = NativeStackScreenProps<RootStackParamList, 'Project'>;

const Title = (props: { name:string }) =>{
  return(
      <View style={styles.titleView}>
          <Text style={{fontWeight:'500', fontSize: 20, color: 'black'}}>{props.name}</Text>
      </View>
  )
}

const Project = ({ navigation, route}: Props) => {

  let default_log: log = {project_id: -1, id: -1, name: "default", driller: "default", logger: "default", notes: "default"}
  const [logsList, setLogsList] = useState<log[]>([default_log]);
  const [latitude, setLat] = useState(10);
  const [longitude, setLon] = useState(10);
  const [currProject, setProject] = useState(route.params.project);

  const refreshProject = async () => {
    try {
        const fetched = await fetch(`${PORT}/projects/${currProject.id}`);
        const updated_project = await fetched.json()
        setProject(updated_project)
    } catch(error) {
        console.error(error)
    }
  }

  const getLogs = async () => {
      try{
          const fetched = await fetch(`${PORT}/get_all_logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({project_id: currProject.id})
        });
          const logs_list = await fetched.json()
          setLogsList(logs_list)
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
  getLatLon();

  return (
    <View style={styles.container}>
        <Flex fill flex-grow style={{width:"100%"}}>
          <Box>
            <Header/>
          </Box>
          <Box>
            <Title name={currProject.name}/>
          </Box>
          <Box>
          <SelectLogList id={currProject.id} navigate={navigation} logsList={logsList} getLogs={getLogs}/>
          </Box>
          <Spacer />
          <Box style={{ justifyContent: "center" }}>
            <Box style={{ margin: 4 }}>
              <AddLogModal project_id={currProject.id} getLogs={getLogs} getLatLon={getLatLon} setLat={setLat} setLon={setLon} lat={latitude} lon={longitude}/>
            </Box>
            <Box style={{ margin: 4 }}>
              <EditProjectModal project={currProject} updateProject={refreshProject} navigation={navigation} updateProjectList={route.params.onUpdate}/>
            </Box>
          </Box>
        </Flex>
    </View>
  );
}

// The button that deals with submitting a new Log
const SubmitLog = ( { log, setModalVisible, getLogs, setLogText }) => {
    const onPress = async () => {
        setModalVisible(false)
        try {
          let fetched = await fetch(`${PORT}/add_boring_to_project`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...log, project_id: log.project_id })
          })
          let status = await fetched.status
          console.log(status)
      } catch(error) {
              console.error('Error:', error);
          }
        getLogs();
        setLogText({ name: "", drilled: "", logged: "", notes: "" })
    }

    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Create</PaperButton>);
  }

// The component that deals with the adding a new project
const UpdateProject = ({ project, setModalVisible, updateProject }) => {
    const onPress = async () => {
        setModalVisible(false)
        try {
            let fetched = await fetch(`${PORT}/update_project`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({project_id: project.id, project_name: project.name, client_name: project.client, project_location: project.location, project_notes: project.notes})
            })
            console.log("status:", fetched.status)
            updateProject();
        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Submit</PaperButton>);
  }

  // The component that deals with the adding a new project
const DeleteProject = ({ project, setModalVisible, navigation, updateProjectList }) => {
  const onPress = async () => {
      setModalVisible(false)
      try {
          let fetched = await fetch(`${PORT}/delete_project`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({project_id: project.id})
          })
          console.log("status:", fetched.status)
          updateProjectList()
          navigation.navigate('Home')
      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Delete</PaperButton>);
}

const Map = ({getLatLon, latitude, longitude, setLat, setLon}) => {
  
  getLatLon();

  return(
    <View style={{
      ...StyleSheet.absoluteFillObject,
      height: '100%', // you can customize this
      width: '100%',  // you can customize this
      alignItems: "center",
      }}>

      <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={true}
        provider = {PROVIDER_GOOGLE}
        mapType = {"hybrid"}
      >
        <Marker
          coordinate={{latitude: latitude, longitude: longitude}}
          draggable
          onDragEnd={
            (async (e) => {
            setLat(e.nativeEvent.coordinate.latitude);
            setLon(e.nativeEvent.coordinate.longitude);
          })}
        />
      </MapView>
    </View>
)
}

const AddLogModal = ({ project_id, getLogs, getLatLon, lat, lon, setLat, setLon }) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [logText, setLogText] = useState({ name: "", drilled: "", logged: "", notes: "" })
  return (
      <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Log</PaperButton>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
            <Dialog.Title style={{color: 'black'}}>New Log</Dialog.Title>
            <Dialog.Content>
              <View>
                <TextInput value={logText.name} label="Log Name" mode="outlined" onChangeText={(text) => setLogText({...logText, name: text})} style={{ backgroundColor: 'white', marginBottom: 4}} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={logText.drilled} label="Drilled by" mode="outlined" onChangeText={(text) => setLogText({...logText, drilled: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={logText.logged} label="Logged by" mode="outlined" onChangeText={(text) => setLogText({...logText, logged: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={logText.notes} label="Notes" mode="outlined" onChangeText={(text) => setLogText({...logText, notes: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              </View>
              <View style={{marginTop: "2%", minHeight: "50%"}}>
                <Map getLatLon={getLatLon} latitude={lat} longitude={lon} setLat={setLat} setLon={setLon}></Map>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
              <SubmitLog setModalVisible={setVisible} getLogs={getLogs} log={{ project_id: project_id, name: logText.name, driller: logText.drilled, logger: logText.logged, notes: logText.notes, latitude: lat, longitude: lon }} setLogText={setLogText} />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
}


const EditProjectModal = ({ project, updateProject, updateProjectList, navigation }) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [textProject, setTextProject] = useState(project.name);
  const [textClient, setTextClient] = useState(project.client);
  const [textLocation, setTextLocation] = useState(project.location);
  const [textNotes, setTextNotes] = useState(project.notes);

  return (
      <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>Edit Project Metadata</PaperButton>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
            <Dialog.Title style={{color: 'black'}}>New Log</Dialog.Title>
            <Dialog.Content>
              <View>
                <TextInput value={textProject} label="Project Name" mode="outlined" onChangeText={(text) => setTextProject(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={textClient} label="Client Name" mode="outlined" onChangeText={(text) => setTextClient(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={textLocation} label="Location" mode="outlined" onChangeText={(text) => setTextLocation(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={textNotes} label="Notes" mode="outlined" onChangeText={(text) => setTextNotes(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
              <UpdateProject setModalVisible={setVisible} updateProject={updateProject} project={{id: project.id, name: textProject, client: textClient, location: textLocation, notes: textNotes}}/>
              <DeleteProject setModalVisible={setVisible} project={{id: project.id}} navigation={navigation} updateProjectList={updateProjectList}/>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
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
  }
});

export default Project;
