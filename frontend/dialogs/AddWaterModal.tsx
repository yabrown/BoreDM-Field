import React, { useState, useContext } from 'react';
import { ScrollView, View, Text } from "react-native";
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import { logout } from "../common/logout";
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { PORT } from '../env';

const SubmitWater = ({ water, hideDialog, refreshWater }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  const onPress = async () => {
    hideDialog()
      try {
          const token = await getToken();
          const fetched = await fetch(`${PORT}/update_water_encounter`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
                  
              },
              body: JSON.stringify({...water})
          })
          console.log('status:', fetched.status);
          if (fetched.ok) {
            refreshWater();
          }
          else if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          }
      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Update</PaperButton>);
}

const UpdateWaterModal = ({ water, setWater, refreshWater }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  console.log("Water: " + water)

  return (
    <View>
      <PaperButton onPress={showDialog} style={{backgroundColor:"lightgrey"}} labelStyle={{fontSize: 18, color: "black",   }}>Record Water Encounters</PaperButton>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Record Water Encounters</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <Text style={{fontSize: '16', fontWeight: '500', marginTop: '2%', marginBottom: '1%'}}>First Encounter</Text>
              <TextInput value={typeof water.start_depth_1!='undefined' && !water.start_depth_1 ? "": String(water.start_depth_1)} label="Depth of first encounter" mode="outlined" onChangeText={(text) => setWater({...water, start_depth_1: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={water.timing_1} label="Time of first encounter" mode="outlined" onChangeText={(text) => setWater({...water, timing_1: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <Text style={{fontSize: '16', fontWeight: '500', marginTop: '2%', marginBottom: '1%'}}>Second Encounter</Text>
              <TextInput value={!water.start_depth_2 ? "": String(water.start_depth_2)} label="Depth of second encounter" mode="outlined" onChangeText={(text) => setWater({...water, start_depth_2: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={water.timing_2} label="Time of second encounter" mode="outlined" onChangeText={(text) => setWater({...water, timing_2: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <Text style={{fontSize: '16', fontWeight: '500', marginTop: '2%', marginBottom: '1%'}}>Third Encounter</Text>
              <TextInput value={!water.start_depth_3 ? "": String(water.start_depth_3)} label="Depth of third encounter" mode="outlined" onChangeText={(text) => setWater({...water, start_depth_3: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={water.timing_3} label="Time of third encounter" mode="outlined" onChangeText={(text) => setWater({...water, timing_3: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <SubmitWater water={water} hideDialog={hideDialog} refreshWater={refreshWater}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default UpdateWaterModal;