
import React, { useState,  } from 'react';
import {  StyleSheet, View } from "react-native";
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {SubmitLog} from "../backend-calls/SubmitButtons"


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
  
    const [nameError, setNameError] = useState(false);
    const [logText, setLogText] = useState({ name: "", drilled: "", logged: "", notes: "" })
  
    return (
        <View>
        <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Log</PaperButton>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
              <Dialog.Title style={{color: 'black'}}>New Log</Dialog.Title>
              <Dialog.Content>
                <View>
                  <TextInput value={logText.name} error={nameError} label="Log Name" mode="outlined" onChangeText={(text) => setLogText({...logText, name: text})} style={{ backgroundColor: 'white', marginBottom: 4}} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
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
                <SubmitLog setModalVisible={setVisible} getLogs={getLogs} setNameError={setNameError} log={{ project_id: project_id, name: logText.name, driller: logText.drilled, logger: logText.logged, notes: logText.notes, latitude: lat, longitude: lon }} setLogText={setLogText} />
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
    );
  }

  export default AddLogModal