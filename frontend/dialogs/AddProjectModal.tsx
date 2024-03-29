
// import { google } from 'googleapis';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import {SubmitProject} from "../backend-calls/SubmitButtons"


const AddProjectModal = ({ onUpdate }) => {
    const [visible, setVisible] = useState(false);
    const [nameError, setNameError] = useState(false);
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
                  <TextInput multiline error={nameError} value={textFields.name} label={"Project Name *"} mode={"outlined"} maxLength={512} onChangeText={(projectText) => setTextFields({ ...textFields, name: projectText })} style={styles.textInput} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                  <TextInput multiline value={textFields.client} label="Client Name" mode="outlined" maxLength={512} onChangeText={(clientText) => setTextFields({ ...textFields, client: clientText })} style={styles.textInput} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                  <TextInput multiline value={textFields.location} label="Location" mode="outlined" maxLength={512} onChangeText={(textLocation) => setTextFields({ ...textFields, location: textLocation })} style={styles.textInput} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                  <TextInput multiline value={textFields.notes} label="Notes" mode="outlined" maxLength={1024} onChangeText={(notesText) => setTextFields({ ...textFields, notes: notesText })} style={styles.textInput} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
                <SubmitProject project={textFields} setvis={setVisible} onUpdate={onUpdate} setNameError={setNameError}/>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
    );
  };

  const styles = {
    textInput: {
        backgroundColor: 'white',
        marginBottom:4
      }
  }

  export default AddProjectModal