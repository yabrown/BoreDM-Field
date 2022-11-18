import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';
import { PORT } from '../port'
import { ListItem, Box, Divider} from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Button as PaperButton, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

// The component that deals with the adding a new project
const SubmitProject = ( props: {name: string, client: string, location: string, notes: string, setvis: React.Dispatch<React.SetStateAction<boolean>>, refresh: any}) => {
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
          props.refresh()
      } catch(error) {
              console.error('Error:', error);
          }
  }

  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Create</PaperButton>);
}

const SelectProjectButton = ({project: project, navigate }) => {
    return(
      <ListItem title={project.name} onPress={() => navigate.navigate('Project', {project})}/>
    )
  }

  const AddProjectModal = ({refresh}) => {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
  
    const [textProject, setTextProject] = useState("");
    const [textClient, setTextClient] = useState("");
    const [textLocation, setTextLocation] = useState("");
    const [textNotes, setTextNotes] = useState("");
  
    return (
        <Box>
        <PaperButton onPress={showDialog} mode={"elevated"} style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Project</PaperButton>
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
              <Dialog.Title>New Project</Dialog.Title>
              <Dialog.Content>
                <View>
                  <TextInput value={textProject} label={"Project Name"} mode={"outlined"} onChangeText={(text) => setTextProject(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                  <TextInput value={textClient} label={"Client Name"} mode={"outlined"} onChangeText={(text) => setTextClient(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                  <TextInput value={textLocation} label={"Location"} mode={"outlined"} onChangeText={(text) => setTextLocation(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                  <TextInput value={textNotes} label={"Notes"} mode={"outlined"} onChangeText={(text) => setTextNotes(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <PaperButton onPress={() => {hideDialog(); refresh()}} labelStyle={{color: "black" }}>Cancel</PaperButton>
                <SubmitProject name={textProject} client={textClient} location={textLocation} notes={textNotes} setvis={setVisible} refresh={refresh}/>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Box>
    );
  }

const SelectProjectList = ({ navigate }) => {
    
  
  // useState is generic function, so can pass in the type
  const [data, setData] = useState<project[]>([{name: "default", id: -1, client:"default", location:"default", notes:"default"}])
  //const [data, setData] = useState<void>()

  const refreshProjects = async () => {
    try{
      const fetched = await fetch(`${PORT}/get_all_projects`);
      const projects_list = await fetched.json()
      setData(projects_list)
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
      refreshProjects()
  }, [])


  return(
      <View>
          <ScrollView style={styles.scrollView}>
              {data.map(project => (
                  <SelectProjectButton project = {project} key={uuid()} navigate={navigate}/>
              ))}
          </ScrollView>
          <AddProjectModal refresh={refreshProjects} />
      </View>
  )
}

const showViews = 3
const styles = StyleSheet.create({

  touchable: {
    flex: 1,
    backgroundColor: '#68a0cf',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    padding: 5,
    margin: 5,
  },
  scrollView: {
    borderWidth: showViews,
    borderColor: 'white',
    backgroundColor: 'white',
    minHeight: 500,
    maxHeight: 500,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },

});

export default SelectProjectList;