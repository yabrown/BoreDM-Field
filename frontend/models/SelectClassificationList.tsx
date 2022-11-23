import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';
import { PORT } from '../port'
import { ListItem } from "@react-native-material/core";
import { Button as PaperButton, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

const SelectClassificationButton = ({ classification }) => {

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [startDepth, setStartDepth] = useState(classification.start_depth);
  const [endDepth, setEndDepth] = useState(classification.end_depth);
  // const [uscs, setUscs] = useState(classification.uscs);
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
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <UpdateClassification setModalVisible={setVisible} classification={{id: classification.id, start_depth: startDepth, end_depth: endDepth }}/>
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
