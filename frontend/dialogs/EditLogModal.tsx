import React, { useState } from 'react';
import { View } from "react-native";
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import {DeleteLog} from "../backend-calls/DeleteButtons"
import {UpdateLog} from "../backend-calls/UpdateButtons"

const EditLogModal = ({log, refreshLogs, navigation, setLog}) => {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [nameError, setNameError] = useState(false);
  
    const [textName, setTextName] = useState(log.name);
    const [textLogger, setTextLogger] = useState(log.logger);
    const [textDriller, setTextDriller] = useState(log.driller);
    const [textNotes, setTextNotes] = useState(log.notes);
  
    return (
        <View>
        <PaperButton onPress={showDialog} style={{backgroundColor:"lightgrey"}} labelStyle={{fontSize: 18, color: "black" }}>Edit Log Metadata</PaperButton>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
              <Dialog.Title>Edit / Delete Log</Dialog.Title>
              <Dialog.Content>
                <View>
                  <TextInput value={textName} error={nameError} label="Log Name" mode="outlined" onChangeText={(text) => setTextName(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                  <TextInput value={textLogger} label="Logger" mode="outlined" onChangeText={(text) => setTextLogger(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                  <TextInput value={textDriller} label="Driller" mode="outlined" onChangeText={(text) => setTextDriller(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                  <TextInput value={textNotes} label="Notes" mode="outlined" onChangeText={(text) => setTextNotes(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
                <DeleteLog setModalVisible={setVisible} log={{id: log.id}} navigation={navigation} refreshLogs={refreshLogs}/>
                <UpdateLog setModalVisible={setVisible} setNameError={setNameError} log={{id: log.id, name: textName, logger: textLogger, driller: textDriller, notes: textNotes}} refreshLogs={refreshLogs} setLog={setLog}/>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
    );
  };

  export default EditLogModal