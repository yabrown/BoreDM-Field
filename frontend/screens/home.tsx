import React, { useState} from 'react'
import { Dimensions, Pressable, Alert, Modal, Button, StyleSheet, TextInput, Text, View, SafeAreaView } from 'react-native';
import Header from '../common/header';
import SelectProjectList from '../models/SelectProjectList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PORT } from '../port';
import { Box, Flex, Spacer } from "@react-native-material/core";


interface project  {
    id:         number
    name:       string
    client:     string
    location:   string
    notes:      string
  }

type RootStackParamList = {
  Home: undefined;
  Project: { project: project };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


// The component that deals with the adding a new project
const SubmitProject = ( props: {name: string, client: string, location: string, notes: string, setModalVisible}) => {
  const onPress = async () => {
    props.setModalVisible(false)
      try {
          let fetched = await fetch(`${PORT}:4000/add_project`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({project_name: props.name, client_name: props.client, project_location: props.location, project_notes: props.notes})
          })
          console.log("status:", fetched.status)
      } catch(error) {
              console.error('Error:', error);
          }
  }

  return (<Button
      onPress={onPress}
      title="Add Project"
      color="#000000"
      accessibilityLabel="Learn more about this purple button"/>);
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


const AddProjectModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [textProject, setTextProject] = useState("");
    const [textClient, setTextClient] = useState("");
    const [textLocation, setTextLocation] = useState("");
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
                    onChangeText={(text) => setTextProject(text)}
                    placeholder = "Enter Project Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextClient(text)}
                    placeholder = "Enter Client Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextLocation(text)}
                    placeholder = "Enter Location"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextNotes(text)}
                    placeholder = "Enter Notes"
                />
                <SubmitProject name={textProject} client={textClient} location={textLocation} notes={textNotes} setModalVisible={setModalVisible}/>
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
            title="+ Project"
            color="#000000"
            accessibilityLabel="Activates popup Modal for project detail entry"
      />
    </View>
    )
}

const Home = ({ navigation }: Props) => {

  return (
    <View style={styles.container}>
        <Flex fill flex-grow style={{width:"100%"}}>
          <Box>
            <Header/>
          </Box>
          <Box>
            <Title name="Projects"/>
          </Box>
          <Box>
            <SelectProjectList navigate={navigation}/>
          </Box>
          <Spacer />
          <Box style={{ margin: 4 }}>
            <AddProjectModal/>
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
  }
});

export default Home;