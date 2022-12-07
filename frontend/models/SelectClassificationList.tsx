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
    <ListItem title={classification.start_depth + "' - " + classification.end_depth + "': " + classification.uscs} onPress={showDialog}/>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Classification Data</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <TextInput value={startDepth} label="Start Depth" mode="outlined" onChangeText={(text) => setStartDepth(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={endDepth} label="End Depth" mode="outlined" onChangeText={(text) => setEndDepth(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <List.Accordion title="USCS" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="CH" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="CL" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="CL-ML" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GC-GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GP" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GP-GC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GP-GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GW" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GW-GC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GW-GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="ML" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SC-SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SP" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SP-SC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SP-SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SW" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SW-SC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SW-SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="OH" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="OL" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="PT" setFunction={setUSCS} current={uscs} color="white"/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Color" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Black" current={color} setFunction={setColor} color={"#000000"} highlightedColor={color}/>
                  <SelectButton buttonOption="Dark Brown 1" current={color} setFunction={setColor} color={"#3C312D"} highlightedColor={color}/>
                  <SelectButton buttonOption="Dark Brown 2" current={color} setFunction={setColor} color={"#4B3E39"} highlightedColor={color}/>
                  <SelectButton buttonOption="Dark Brown" current={color} setFunction={setColor} color={"#5C4B44"} highlightedColor={color}/>
                  <SelectButton buttonOption="Brown" current={color} setFunction={setColor} color={"#66534C"} highlightedColor={color}/>
                  <SelectButton buttonOption="Light Brown 1" current={color} setFunction={setColor} color={"#766058"} highlightedColor={color}/>
                  <SelectButton buttonOption="Light Brown 2" current={color} setFunction={setColor} color={"#886D63"} highlightedColor={color}/>
                  <SelectButton buttonOption="Light Brown 3" current={color} setFunction={setColor} color={"#9B8076"} highlightedColor={color}/>
                  <SelectButton buttonOption="Dark Orange 1" current={color} setFunction={setColor} color={"#341B12"} highlightedColor={color}/>
                  <SelectButton buttonOption="Dark Orange 2" current={color} setFunction={setColor} color={"#432317"} highlightedColor={color}/>
                  <SelectButton buttonOption="Dark Orange 3" current={color} setFunction={setColor} color={"#522B1D"} highlightedColor={color}/>
                  <SelectButton buttonOption="Orange 1" current={color} setFunction={setColor} color={"#633423"} highlightedColor={color}/>
                  <SelectButton buttonOption="Orange 2" current={color} setFunction={setColor} color={"#743E29"} highlightedColor={color}/>
                  <SelectButton buttonOption="Orange 3" current={color} setFunction={setColor} color={"#8C4B32"} highlightedColor={color}/>
                  <SelectButton buttonOption="Orange 4" current={color} setFunction={setColor} color={"#A3563A"} highlightedColor={color}/>
                  <SelectButton buttonOption="Orange 5" current={color} setFunction={setColor} color={"#B86141"} highlightedColor={color}/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Moisture" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Dry" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Dry to Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Damp" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Damp to Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Moist to Wet" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Very Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Very Moist to Wet" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Wet" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Saturated" setFunction={setMoisture} current={moisture} color="white"/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Density" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Very Loose" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Loose" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Medium Dense" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Dense" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Very Dense" setFunction={setDensity} current={density} color="white"/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Hardness" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Very Soft" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Soft" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Firm" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Stiff" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Very Stiff" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Hard" setFunction={setHardness} current={hardness} color="white"/>
                </HStack>
              </List.Accordion>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <DeleteClassification setModalVisible={setVisible} classification={classification} refreshClassifications={refreshClassifications}/>
            <UpdateClassification setModalVisible={setVisible} classification={{log_id: classification.log_id, start_depth: startDepth, end_depth: endDepth, uscs: uscs, color: color, moisture: moisture, density: density, hardness: hardness }}/>
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
  return (<PaperButton labelStyle={{color: "red" }} onPress={onPress}>Delete</PaperButton>);
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
    <View style={{height: "90%"}}>
        <Text style={{marginLeft: '2%', fontSize: 24, fontWeight: '500'}}>Classifications</Text>
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
