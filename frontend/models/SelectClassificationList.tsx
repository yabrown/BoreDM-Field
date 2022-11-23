import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';
import { PORT } from '../port'
import { ListItem, HStack } from "@react-native-material/core";
import { Button as PaperButton, Dialog, Portal, Provider, TextInput, List, Button } from 'react-native-paper';

const USCSButton = ({ uscs, buttonUSCS, setFunction }) => (  
  <View style={{ width: 140, margin: "4px" }}>
    <Button
      buttonColor={uscs===buttonUSCS ? 'lightgrey' : 'white'}
      textColor='black'
      mode='outlined' 
      onPress={
        () => {
          setFunction(buttonUSCS);
        }
      }
    >
      { buttonUSCS }
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
  // const [color, setColor] = useState(classification.color);
  // const [moisture, setMoisure] = useState(classification.moisure);
  // const [density, setDensity] = useState(classification.density);
  // const [hardness, setHardness] = useState(classification.hardness);

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

              <List.AccordionGroup>
                <List.Accordion title="USCS" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                  <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                    <USCSButton buttonUSCS="CH" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="CL" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="CL-ML" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="GC" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="GC-GM" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="GM" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="GP" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="GP-GC" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="GP-GM" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="GW" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="GW-GC" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="GW-GM" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="ML" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="SC" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="SC-SM" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="SM" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="SP" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="SP-SC" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="SP-SM" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="SW" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="SW-SC" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="SW-SM" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="OH" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="OL" setFunction={setUSCS} uscs={uscs}/>
                    <USCSButton buttonUSCS="PT" setFunction={setUSCS} uscs={uscs}/>
                  </HStack>
                </List.Accordion>
              </List.AccordionGroup>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <UpdateClassification setModalVisible={setVisible} classification={{log_id: classification.log_id, start_depth: startDepth, end_depth: endDepth, uscs: uscs }}/>
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
                body: JSON.stringify({log_id: classification.log_id, start_depth: classification.start_depth, end_depth: classification.end_depth, uscs: classification.uscs, moisture: classification.moisture, density: classification.density, hardness: classification.hardness })
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
