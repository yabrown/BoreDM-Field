import React, { useState} from 'react'
import { Dimensions, Pressable, Alert, Modal, Button, StyleSheet, Text, View, SafeAreaView} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import SelectLogList from '../models/SelectLogList';
import Header from '../common/header';
import { PORT } from '../port';
import { Box, Flex, Spacer } from "@react-native-material/core";
import { Button as PaperButton, Dialog, Portal, Provider, TextInput } from 'react-native-paper';


type Props = NativeStackScreenProps<RootStackParamList, 'Project'>;

const Title = (props: { name:string }) =>{
  return(
      <View style={styles.titleView}>
          <Text style={{fontWeight:'500', fontSize: 20, color: 'black'}}>{props.name}</Text>
      </View>
  )
}

const Project = ({navigation, route}: Props) => {
  return (
    <View style={styles.container}>
      <Provider>
        <Flex fill flex-grow style={{width:"100%"}}>
          <Box>
            <Header/>
          </Box>
          <Box>
            <Title name={route.params.project.name}/>
          </Box>
          <Box>
          <SelectLogList id={route.params.project.id} navigate={navigation}/>
          </Box>
          <Spacer />
          <Box style={{ justifyContent: "center" }}>
            <Box style={{ margin: 4 }}>
              <AddLogModal project_id={route.params.project.id}/>
            </Box>
            <Box style={{ margin: 4 }}>
              <EditProjectModal project={route.params.project}/>
            </Box>
          </Box>
        </Flex>
      </Provider>
    </View>
  );
}

// The button that deals with submitting a new Log
const SubmitLog = ({log, setModalVisible}) => {
    const onPress = async () => {
        setModalVisible(false)
        try {
            let fetched = await fetch(`${PORT}/add_boring_to_project`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: log.name, project_id: log.project_id, driller:log.driller, logger: log.logger, notes:log.notes})
            })
            // let json_text = await fetched.json()
            // console.log(json_text)
        } catch(error) {
                console.error('Error:', error);
            }
    }
  
    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Create</PaperButton>);
  }

// The component that deals with the adding a new project
const UpdateProject = ( {project, setModalVisible}) => {
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
        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<Button
        onPress={onPress}
        title="Update Project"
        color="#000000"
        accessibilityLabel="Learn more about this purple button"/>);
  }

const AddLogModal = ({project_id}) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [textLog, setTextLog] = useState("");
  const [textDrilled, setTextDrilled] = useState("");
  const [textLogged, setTextLogged] = useState("");
  const [textNotes, setTextNotes] = useState("");

  return (
      <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Log</PaperButton>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
            <Dialog.Title>New Log</Dialog.Title>
            <Dialog.Content>
              <View>
                <TextInput value={textLog} label="Log Name" mode="outlined" onChangeText={(text) => setTextLog(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textDrilled} label="Drilled by" mode="outlined" onChangeText={(text) => setTextDrilled(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textLogged} label="Logged by" mode="outlined" onChangeText={(text) => setTextLogged(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textNotes} label="Notes" mode="outlined" onChangeText={(text) => setTextNotes(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
              <SubmitLog setModalVisible={setVisible} log={{project_id: project_id, name: textLog, driller: textDrilled, logger: textLogged, notes: textNotes}} />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
}

const EditProjectModal = ({project}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [textProject, setTextProject] = useState(project.name);
    const [textClient, setTextClient] = useState(project.client);
    const [textLocation, setTextLocation] = useState(project.location);
    const [textNotes, setTextNotes] = useState(project.notes);
    
    return(
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}

        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextProject(text)}
                    value={textProject}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextClient(text)}
                    value={textClient}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextLocation(text)}
                    value={textLocation}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextNotes(text)}
                    value={textNotes}
                />
                <UpdateProject setModalVisible={setModalVisible} project={{id: project.id, name: textProject, client: textClient, location: textLocation, notes: textNotes}}/>
                <Button 
                    onPress={() => setModalVisible(false)}
                    title="Done"
                    color="#000000"
                    accessibilityLabel="Gets rid of modal"/>
           </View>
        </View>
      </Modal>
      <Button 
            onPress={() => setModalVisible(true)}
            title="Edit Project"
            color="#000000"
            accessibilityLabel="Activates popup Modal for project detail entry"/>
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
  }
});

export default Project;