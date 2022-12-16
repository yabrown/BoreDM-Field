import React, { useState, useContext } from 'react';
import { ScrollView, View, Text } from "react-native";
import { ActivityIndicator, Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import { logout } from "../common/logout";
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { PORT } from '../env';
import { showMessage } from "react-native-flash-message";

const SubmitWater = ({ water, hideDialog, refreshWater }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  // STEP 1: create a state variable to hold the loading state
  const [isLoading, setIsLoading] = useState(false);

  // STEP 2: create a function that will set the state after a promise resolves
  const asyncSetIsLoading = async (newState: boolean) => {
    Promise.resolve().then(_ => setIsLoading(newState));
  }
  
  const onPress = async () => {
    try {
      // STEP 3: set the loading state to true before fetching
      setIsLoading(true);
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
        await refreshWater();
        await asyncSetIsLoading(false);
        showMessage({
          message: "Water succesfully updated!",
          type: "success",
        });
      }
      else if (fetched.status === 401) {
        // STEP 5: if unauthorized, show relevant message
        showMessage({
          message: "You are unauthorized, signing out.",
          type: "danger",
        });
        if (setIsLoggedIn) await logout(setIsLoggedIn);
      }  
    } catch(error) {
            console.error('Error:', error);
    } finally {
      // STEP 7: set the loading state to false after fetching and close modal
      refreshWater();
      setIsLoading(false);
      hideDialog();
    }
  }
  return (!isLoading ? <PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Update</PaperButton>  : <ActivityIndicator animating={true} size="large" color="#0000ff" />);
}

const UpdateWaterModal = ({ water, setWater, refreshWater }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <PaperButton onPress={showDialog} style={{backgroundColor:"lightgrey"}} labelStyle={{fontSize: 18, color: "black",   }}>Record Water Encounters</PaperButton>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Record Water Encounters</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <Text style={{fontSize: 16, fontWeight: '500', marginTop: '2%', marginBottom: '1%'}}>First Encounter</Text>
              <TextInput value={typeof water.start_depth_1!='undefined' && !water.start_depth_1 ? "": String(water.start_depth_1)} label="Depth of first encounter" mode="outlined" maxLength={8} onChangeText={(text) => setWater({...water, start_depth_1: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput multiline value={water.timing_1} label="Time of first encounter" mode="outlined" maxLength={256} onChangeText={(text) => setWater({...water, timing_1: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <Text style={{fontSize: 16, fontWeight: '500', marginTop: '2%', marginBottom: '1%'}}>Second Encounter</Text>
              <TextInput value={!water.start_depth_2 ? "": String(water.start_depth_2)} label="Depth of second encounter" mode="outlined" maxLength={8} onChangeText={(text) => setWater({...water, start_depth_2: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput multiline value={water.timing_2} label="Time of second encounter" mode="outlined" maxLength={256} onChangeText={(text) => setWater({...water, timing_2: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <Text style={{fontSize: 16, fontWeight: '500', marginTop: '2%', marginBottom: '1%'}}>Third Encounter</Text>
              <TextInput value={!water.start_depth_3 ? "": String(water.start_depth_3)} label="Depth of third encounter" mode="outlined" maxLength={8} onChangeText={(text) => setWater({...water, start_depth_3: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput multiline value={water.timing_3} label="Time of third encounter" mode="outlined" maxLength={256} onChangeText={(text) => setWater({...water, timing_3: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
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