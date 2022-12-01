import { ListItem } from "@react-native-material/core";
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { logout } from "../common/logout";
import { LoginContext } from "../contexts/LoginContext";
import { PORT } from '../env';
import { getToken } from "../utils/secureStore";

const SelectSampleButton = ({ sample, refreshSamples }: {sample: sample, refreshSamples: () => Promise<void>}) => {

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [currSample, setSample] = useState(sample)

  return(
    <View>
    <ListItem title={"Sample Depth: " + sample.start_depth + "'"} onPress={showDialog}/>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Sample Data</Dialog.Title>
          <Dialog.Content>
            <View>
              <TextInput value={isNaN(currSample.start_depth) ? "": String(currSample.start_depth)} label="Start Depth" mode="outlined" onChangeText={(text) => setSample({ ...sample, start_depth: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.end_depth) ? "": String(currSample.end_depth)} label="End Depth" mode="outlined" onChangeText={(text) => setSample({ ...sample, end_depth: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.length) ? "": String(currSample.length)} label="Sample Length" mode="outlined" onChangeText={(text) => setSample({ ...sample, length: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.blows_1) ? "": String(currSample.blows_1)} label="Blows 1" mode="outlined" onChangeText={(text) => setSample({ ...sample, blows_1: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.blows_2) ? "": String(currSample.blows_2)} label="Blows 2" mode="outlined" onChangeText={(text) => setSample({...sample, blows_2: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.blows_3) ? "": String(currSample.blows_3)} label="Blows 3" mode="outlined" onChangeText={(text) => setSample({...sample, blows_3: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.blows_4) ? "": String(currSample.blows_4)} label="Blows 4" mode="outlined" onChangeText={(text) => setSample({...sample, blows_4: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={currSample.description} label="Description" mode="outlined" onChangeText={(text) => setSample({...sample, description: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.refusal_length) ? "": String(currSample.refusal_length)} label="Refusal Length" mode="outlined" onChangeText={(text) => setSample({...sample, refusal_length: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={currSample.sampler_type} label="Sampler Type" mode="outlined" onChangeText={(text) => setSample({...sample, sampler_type: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <UpdateSample setModalVisible={setVisible} refreshSamples={refreshSamples} sample={sample}/>
            <DeleteSample setModalVisible={setVisible} sample={sample} refreshSamples={refreshSamples}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

// The component that deals with updating a Sample
const UpdateSample = ( {sample, setModalVisible, refreshSamples}) => {

    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    const onPress = async () => {
        setModalVisible(false)
        try {
          let token = await getToken();
          let fetched = await fetch(`${PORT}/update_sample`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
              },
              body: JSON.stringify({sample_id: sample.id, start_depth: sample.start_depth, end_depth: sample.end_depth, length: sample.length, blows_1: sample.blows_1, blows_2: sample.blows_2, blows_3: sample.blows_3, blows_4: sample.blows_4, description: sample.description, refusal_length: sample.refusal_length, sampler_type: sample.sampler_type})
          })
          console.log("status:", fetched.status)

          if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          } 
          }
            catch(error) {
                console.error('Error:', error);
            }
        refreshSamples();
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Update</PaperButton>);
}

// The component that deals with the adding a new project
const DeleteSample = ({ sample, setModalVisible, refreshSamples }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const onPress = async () => {
      setModalVisible(false)
      try {
        const token = await getToken();
          let fetched = await fetch(`${PORT}/delete_sample`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
              },
              body: JSON.stringify({sample_id: sample.id})
          })
          console.log("status:", fetched.status)
          if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          } 
          refreshSamples()
          
      } catch(error) {
            console.log("Problem")
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Delete</PaperButton>);
}

const SelectSampleList = ({ id, samplesList, refreshSamples }) => {

  // the data state will eventually be filled with array of log types
  //const [data, setData] = useState<void>()

  return(
    <View>
      <Text style={{marginLeft: '6%', fontSize: '24', fontWeight: '500'}}>Samples</Text>
      <ScrollView style={styles.scrollView}>
          {samplesList.map(sample => (
              <SelectSampleButton sample={sample} key={uuid()} refreshSamples={refreshSamples}/>
          ))}
      </ScrollView>
    </View>
  )
}

const showViews = 0
const styles = StyleSheet.create({

  touchable: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red',
  },
  scrollView: {
    borderWidth: showViews,
    borderColor: 'red',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: showViews,
    borderColor: 'red'
  },

});

export default SelectSampleList;
