import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';
import { PORT } from '../port'
import { ListItem } from "@react-native-material/core";
import { Button as PaperButton, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

const SelectSampleButton = ({ sample}) => {

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [startDepth, setStartDepth] = useState(sample.start_depth);
  const [endDepth, setEndDepth] = useState(sample.end_depth);
  const [length, setLength] = useState(sample.length);
  const [blows1, setBlows1] = useState(sample.blows_1);
  const [blows2, setBlows2] = useState(sample.blows_2);
  const [blows3, setBlows3] = useState(sample.blows_3);
  const [blows4, setBlows4] = useState(sample.blows_4);
  const [description, setDescription] = useState(sample.description);
  const [refusalLength, setRefusalLength] = useState(sample.refusal_length);
  const [samplerType, setSamplerType] = useState(sample.sampler_type);

  return(
    <View>
    <ListItem title={'Sample Starting at ' + sample.start_depth + "'"} onPress={showDialog}/>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Sample Data</Dialog.Title>
          <Dialog.Content>
            <View>
              <TextInput value={startDepth} label="Start Depth" mode="outlined" onChangeText={(text) => setStartDepth(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={endDepth} label="End Depth" mode="outlined" onChangeText={(text) => setEndDepth(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={length} label="Sample Length" mode="outlined" onChangeText={(text) => setLength(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={blows1} label="Blows 1" mode="outlined" onChangeText={(text) => setBlows1(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={blows2} label="Blows 2" mode="outlined" onChangeText={(text) => setBlows2(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={blows3} label="Blows 3" mode="outlined" onChangeText={(text) => setBlows3(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={blows4} label="Blows 4" mode="outlined" onChangeText={(text) => setBlows4(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={description} label="Description" mode="outlined" onChangeText={(text) => setDescription(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={refusalLength} label="Refusal Length" mode="outlined" onChangeText={(text) => setRefusalLength(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              <TextInput value={samplerType} label="Sampler Type" mode="outlined" onChangeText={(text) => setSamplerType(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <UpdateSample setModalVisible={setVisible} sample={{id: sample.id, start_depth: startDepth, end_depth: endDepth, length: length, blows_1: blows1, blows_2: blows2, blows_3: blows3, blows_4: blows4, description: description, refusal_length: refusalLength, sampler_type: samplerType}}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

// The component that deals with updating a Sample
const UpdateSample = ( {sample, setModalVisible}) => {
    const onPress = async () => {
        setModalVisible(false)
        try {
            let fetched = await fetch(`${PORT}/update_sample`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({sample_id: sample.id, start_depth: sample.start_depth, end_depth: sample.end_depth, length: sample.length, blows_1: sample.blows_1, blows_2: sample.blows_2, blows_3: sample.blows_3, blows_4: sample.blows_4, description: sample.description, refusal_length: sample.refusal_length, sampler_type: sample.sampler_type})
            })
            console.log("status:", fetched.status)
        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Update</PaperButton>);
}

const SelectSampleList = ({ id, navigate }) => {

  // the data state will eventually be filled with array of log types
  const default_sample: sample = {
    log_id:         -1,
    sample_id:      -1,
    start_depth:    -1,
    end_depth:      -1,
    length:         -1,
    blows_1:        -1,
    blows_2:        -1,
    blows_3:        -1,
    blows_4:        -1,
    description:    'default',
    refusal_length: -1,
    sampler_type:   'default',
  }
  // useState is generic function, so can pass in the type
  const [data, setData] = useState<sample[]>([default_sample])
  //const [data, setData] = useState<void>()

  useEffect(() => {
      const GetSamples: () => void = async () => {
        console.log(id)
          try{
              const fetched = await fetch(`${PORT}/get_all_samples`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({log_id: id})
            });
              const samples_list = await fetched.json()
              setData(samples_list)
          } catch(error) {
              console.error(error)
          }
      }
      GetSamples()
  }, [])

  return(
      <View style={{height: 300}}>
        <Text> Log ID: {id}</Text>
          <ScrollView style={styles.scrollView}>
              {data.map(sample => (
                  <SelectSampleButton sample={sample} key={uuid()}/>
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

export default SelectSampleList;
