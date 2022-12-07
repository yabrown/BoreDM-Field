import { Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useContext } from 'react';
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
import {SubmitLog} from "../backend-calls/SubmitButtons"
import {DeleteProject} from "../backend-calls/DeleteButtons"
import {UpdateProject} from "../backend-calls/UpdateButtons"
import AddLogModal from "./AddLogModal"


const EditProjectModal = ({ project, updateProject, updateProjectList, navigation }) => {
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
  
    const [textProject, setTextProject] = useState(project.name);
    const [textClient, setTextClient] = useState(project.client);
    const [textLocation, setTextLocation] = useState(project.location);
    const [textNotes, setTextNotes] = useState(project.notes);
  
    return (
        <SafeAreaView>
        <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>Edit Project Metadata</PaperButton>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
              <Dialog.Title style={{color: 'black'}}>Edit Project</Dialog.Title>
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
                <DeleteProject setModalVisible={setVisible} project={{id: project.id}} navigation={navigation} updateProjectList={updateProjectList}/>
                <UpdateProject setModalVisible={setVisible} updateProject={updateProject} project={{id: project.id, name: textProject, client: textClient, location: textLocation, notes: textNotes}}/>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </SafeAreaView>
    );
  }

  export default EditProjectModal