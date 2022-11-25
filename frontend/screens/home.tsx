import React, { useState} from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Header from '../common/header';
import SelectProjectList from '../models/SelectProjectList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PORT } from '../port';
import { Box, Flex, Spacer } from "@react-native-material/core";
import { Button as PaperButton, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import { Tab } from '@mui/material';
import {TabPanel, TabContext, TabList} from '@mui/lab';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// The component that deals with the adding a new project
const SubmitProject = ( props: {name: string, client: string, location: string, notes: string, setvis: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const onPress = async () => {
    props.setvis(false)
      try {
          let fetched = await fetch(`${PORT}/add_project`, {
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

const AddProjectModal = () => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [textProject, setTextProject] = useState("");
  const [textClient, setTextClient] = useState("");
  const [textLocation, setTextLocation] = useState("");
  const [textNotes, setTextNotes] = useState("");

  return (
      <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Project</PaperButton>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
            <Dialog.Title>New Project</Dialog.Title>
            <Dialog.Content>
              <View>
                <TextInput value={textProject} label="Project Name" mode="outlined" onChangeText={(text) => setTextProject(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textClient} label="Client Name" mode="outlined" onChangeText={(text) => setTextClient(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textLocation} label="Location" mode="outlined" onChangeText={(text) => setTextLocation(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textNotes} label="Notes" mode="outlined" onChangeText={(text) => setTextNotes(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
              <SubmitProject name={textProject} client={textClient} location={textLocation} notes={textNotes} setvis={setVisible}/>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

const Home = ({ navigation }: Props) => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

  return (
    <View style={styles.container}>
      <Provider>
        <Flex fill flex-grow style={{width:"100%"}}>
            <Box>
                <Header/>
            </Box>
            <TabContext value={value}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                    </TabList>
        
                <TabPanel value="1" style={{backgroundColor: "blue"}}>
                    <Box>
                        <SelectProjectList navigate={navigation}/>
                    </Box>
                    <Spacer />
                    <Box style={{ backgroundColor: "blue" }}>
                        <AddProjectModal/>
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    Item Two
                </TabPanel>
            </TabContext>


        </Flex>
      </Provider>
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
