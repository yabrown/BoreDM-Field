import { HStack, ListItem } from "@react-native-material/core";
import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { logout } from "../common/logout";
import { LoginContext } from "../contexts/LoginContext";
import { PORT } from '../env';
import { getToken, saveToken } from "../utils/secureStore";

const SelectButton = ({ current, buttonOption, setFunction, color, highlightedColor="lightgrey" }) => (  
  <View style={{ minWidth: 140, margin: 4 }}>
    <Button
      style={{borderColor: color }}
      buttonColor={current===buttonOption ? highlightedColor : color}
      textColor='black'
      mode='outlined'
      onPress={
        () => {
          setFunction(buttonOption);
        }
      }
    >
      { buttonOption }
    </Button>
  </View>
);

const SelectClassificationButton = ({ classification, refreshClassifications }) => {

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  console.log(classification.uscs);
  const [startDepth, setStartDepth] = useState(classification.start_depth);
  const [endDepth, setEndDepth] = useState(classification.end_depth);
  const [uscs, setUSCS] = useState(classification.uscs);
  const [color, setColor] = useState(classification.color);
  const [moisture, setMoisture] = useState(classification.moisture);
  const [density, setDensity] = useState(classification.density);
  const [hardness, setHardness] = useState(classification.hardness);

  return(
    <View>
    <ListItem title={classification.start_depth + "': " + classification.uscs} onPress={showDialog}/>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Classification Data</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <TextInput value={startDepth} label="Start Depth" mode="outlined" onChangeText={(text) => setStartDepth(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={endDepth} label="Remarks" mode="outlined" onChangeText={(text) => setEndDepth(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} multiline onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <UpdateClassification setModalVisible={setVisible} classification={{log_id: classification.log_id, start_depth: startDepth, end_depth: endDepth, uscs: uscs, color: color, moisture: moisture, density: density, hardness: hardness }}/>
            <DeleteClassification setModalVisible={setVisible} classification={classification} refreshClassifications={refreshClassifications}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

// The component that deals with the adding a new project
const DeleteClassification = ({ classification, setModalVisible, refreshClassifications }) => {
  
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const onPress = async () => {

      setModalVisible(false)
      try {
        const token = await getToken();
        let fetched = await fetch(`${PORT}/delete_classification`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`,
            },
            body: JSON.stringify({classification_id: classification.id})
        })

        if (fetched.status === 401) {
          if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          
        console.log("status:", fetched.status)
        refreshClassifications()
      } 
    }
      catch(error) {
            console.log("Problem")
              console.error('Error:', error);
          }
        }
  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Delete</PaperButton>);
}

// The component that deals with updating a Classification
const UpdateClassification = ( {classification, setModalVisible}) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    const onPress = async () => {
        setModalVisible(false)
        try {
            const token = await getToken();
            let fetched = await fetch(`${PORT}/update_classification`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token : ''}`,
                },
                body: JSON.stringify({log_id: classification.log_id, start_depth: classification.start_depth, end_depth: classification.end_depth, uscs: classification.uscs, color: classification.color, moisture: classification.moisture, density: classification.density, hardness: classification.hardness })
            })

            if (fetched.status === 401) {
              if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
            }

            console.log("status:", fetched.status)

        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Update</PaperButton>);
}

const SelectClassificationList = ({ id, classifications_list, refreshClassifications }) => {

  return(
      <View>
        <Text style={{marginLeft: '2%', fontSize: '24', fontWeight: '500'}}>Remarks</Text>
        <ScrollView style={styles.scrollView}>
            {classifications_list.map(classification => (
                <SelectClassificationButton classification={classification} key={uuid()} refreshClassifications={refreshClassifications}/>
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
    borderColor: 'red'
  },
  scrollView: {
    borderWidth: showViews,
    borderColor: 'red'
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

export default SelectClassificationList;
