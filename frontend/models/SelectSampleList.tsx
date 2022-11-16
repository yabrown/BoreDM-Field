import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';
import { PORT } from '../port'
import { ListItem } from "@react-native-material/core";



const SelectSampleButton = ({ sample, navigate }) => {
    return(
      <ListItem title={sample.description} onPress={()=>{console.log(sample.id)}}/>
    )
  }

const SelectSampleList = ({ id, navigate }) => {
    
  // the data state will eventually be filled with array of log types
  const default_sample: sample = {
    log_id:         -1,
    sample_id:      -1,
    start_depth:    -1,
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
                  <SelectSampleButton sample={sample} key={uuid()} navigate={navigate}/>
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