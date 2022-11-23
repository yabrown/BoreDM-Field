import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';
import { PORT } from '../port'
import { ListItem, HStack } from "@react-native-material/core";
import { Button as PaperButton, Dialog, Portal, Provider, TextInput, List, Button } from 'react-native-paper';

const SelectButton = ({ current, buttonOption, setFunction, color, highlightedColor="lightgrey" }) => (  
  <View style={{ minWidth: 140, margin: "4px" }}>
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

const SelectClassificationButton = ({ classification }) => {

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
    <ListItem title={'Classification Starting at ' + classification.start_depth + "'"} onPress={showDialog}/>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Classification Data</Dialog.Title>
          <Dialog.Content>
            <View>
              <TextInput value={startDepth} label="Start Depth" mode="outlined" onChangeText={(text) => setStartDepth(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={endDepth} label="End Depth" mode="outlined" onChangeText={(text) => setEndDepth(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
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
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <UpdateClassification setModalVisible={setVisible} classification={{log_id: classification.log_id, start_depth: startDepth, end_depth: endDepth, uscs: uscs, color: color, moisture: moisture, density: density, hardness: hardness }}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

// The component that deals with updating a Classification
const UpdateClassification = ( {classification, setModalVisible}) => {
    const onPress = async () => {
        setModalVisible(false)
        try {
            let fetched = await fetch(`${PORT}/update_classification`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({log_id: classification.log_id, start_depth: classification.start_depth, end_depth: classification.end_depth, uscs: classification.uscs, color: classification.color, moisture: classification.moisture, density: classification.density, hardness: classification.hardness })
            })
            console.log("status:", fetched.status)
        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Update</PaperButton>);
}

const SelectClassificationList = ({ id, navigate }) => {

  // the data state will eventually be filled with array of log types
  const default_classification: classification = {
    log_id:         -1,
    start_depth:    -1,
    end_depth:      -1,
    uscs:           "default",
    color:          "default",
    moisture:       "default",
    density:        "default",
    hardness:       "default",
  }
  // useState is generic function, so can pass in the type
  const [data, setData] = useState<classification[]>([default_classification])
  //const [data, setData] = useState<void>()

  useEffect(() => {
      const GetClassifications: () => void = async () => {
        console.log(id)
          try{
              const fetched = await fetch(`${PORT}/get_all_classifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({log_id: id})
            });
              const classifications_list = await fetched.json()
              setData(classifications_list)
          } catch(error) {
              console.error(error)
          }
      }
      GetClassifications()
  }, [])

  return(
      <View style={{margin: "10px"}}>
        <Text> Classifications (Log ID: {id})</Text>
          <ScrollView style={styles.scrollView}>
              {data.map(classification => (
                  <SelectClassificationButton classification={classification} key={uuid()} navigate={navigate}/>
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
