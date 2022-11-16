import React, { useState} from 'react'
import { Dimensions, Pressable, Alert, Modal, StyleSheet, TextInput, Text, View, SafeAreaView} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import SelectBoringList from '../models/SelectBoringList';
import Header from '../common/header';
import { PORT } from '../port';
import { Box, Flex, Spacer, Button } from "@react-native-material/core";


interface project  {
    id:         number
    name:       string
    client:     string
    location:   string
    notes:      string
  }

  interface log  {
    project_id: number
    name:       string
    driller: string
    logger:  string
    notes:      string
  }

type RootStackParamList = {
  Home: undefined;
  Project: { project: project };
};

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
        <Flex fill flex-grow style={{width:"100%"}}>
          <Box>
            <Header/>
          </Box>
          <Box>
            <Title name={route.params.project.name}/>
          </Box>
          <Box>
          <SelectBoringList id={route.params.project.id} navigate={navigation}/>
          </Box>
          <Spacer />
          <Box style={{ justifyContent: "center" }}>
            <Box style={{ margin: 4 }}>
              <AddBoringModal project_id={route.params.project.id}/>
            </Box>
            <Box style={{ margin: 4 }}>
              <EditProjectModal project={route.params.project}/>
            </Box>
          </Box>
        </Flex>
    </View>
  );
}

// The button that deals with submitting a new boring
const SubmitBoring = ({log, setModalVisible}) => {
    const onPress = async () => {
        setModalVisible(false)
        try {
            let fetched = await fetch(`${PORT}:4000/add_boring_to_project`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: log.name, project_id: log.project_id, driller:log.driller, logger: log.logger, notes:log.notes})
            })
            let json_text = await fetched.json()
            console.log(json_text)
        } catch(error) {
                console.error('Error:', error);
            }
    }
  
    return (<Button
        onPress={onPress}
        title="Add Boring"
        color="#000000"
        accessibilityLabel="Learn more about this purple button"/>);
  }

// The component that deals with the adding a new project
const UpdateProject = ( {project, setModalVisible}) => {
    const onPress = async () => {
        setModalVisible(false)
        try {
            let fetched = await fetch(`${PORT}:4000/update_project`, {
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

const AddBoringModal = ({project_id}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [textBoring, setTextBoring] = useState("");
    const [textDrilled, setTextDrilled] = useState("");
    const [textLogged, setTextLogged] = useState("");
    const [textNotes, setTextNotes] = useState("");
    
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
                    onChangeText={setTextBoring}
                    placeholder = "Log Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setTextDrilled}
                    placeholder = "Drilled By"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setTextLogged}
                    placeholder = "Logged By"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setTextNotes}
                    placeholder = "Log Notes"
                />
                <SubmitBoring setModalVisible={setModalVisible} log={{project_id: project_id, name: textBoring, driller: textDrilled, logger: textLogged, notes: textNotes}} />
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
            title="+ Boring"
            color="#000000"
            accessibilityLabel="Activates popup Modal for project detail entry"/>
    </View>
    )
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