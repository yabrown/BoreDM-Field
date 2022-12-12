import React, { useState } from 'react';
import { StyleSheet,View } from "react-native";
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {DeleteLog} from "../backend-calls/DeleteButtons"
import {UpdateLog} from "../backend-calls/UpdateButtons"

const Map = ({latitude, longitude, setLat, setLon}) => {
  
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
        showsUserLocation={true}
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

const EditLogModal = ({log, refreshLogs, navigation, setLog, /*getLatLon, lat, lon, setLat, setLon*/}) => {
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [nameError, setNameError] = useState(false);
  
    const [textName, setTextName] = useState(log.name);
    const [textLogger, setTextLogger] = useState(log.logger);
    const [textDriller, setTextDriller] = useState(log.driller);
    const [textNotes, setTextNotes] = useState(log.notes);
    const [lat, setLat] = useState(log.latitude);
    const [long, setLong] = useState(log.longitude);
  
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
                <View style={{marginTop: "2%", minHeight: "50%"}}>
                  <Map latitude={lat} longitude={long} setLat={setLat} setLon={setLong}></Map>
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
                <DeleteLog setModalVisible={setVisible} log={{id: log.id}} navigation={navigation} refreshLogs={refreshLogs}/>
                <UpdateLog setModalVisible={setVisible} setNameError={setNameError} log={{id: log.id, name: textName, logger: textLogger, driller: textDriller, notes: textNotes, latitude: lat, longitude: long}} refreshLogs={refreshLogs} setLog={setLog}/>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
    );
  };

  export default EditLogModal