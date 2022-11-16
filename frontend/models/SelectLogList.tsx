import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';
import { PORT } from '../port'
import { ListItem } from "@react-native-material/core";



const SelectLogButton = ({ log, navigate }) => {
    return(
      <ListItem title={log.name} onPress={() => navigate.navigate('Log', {log})}/>
    )
  }

const SelectLogList = ({ id, navigate }) => {
    
  // the data state will eventually be filled with array of log types
  type log = {
          name: string;
  };
  // useState is generic function, so can pass in the type
  const [data, setData] = useState<log[]>([{name: "default"}])
  //const [data, setData] = useState<void>()

  useEffect(() => {
      const GetLogs: () => void = async () => {
        console.log(id)
          try{
              const fetched = await fetch(`${PORT}/get_all_logs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({project_id: id})
            });
              const logs_list = await fetched.json()
              setData(logs_list)
          } catch(error) {
              console.error(error)
          }
      }
      GetLogs()
  }, [])

  return(
      <View style={{height: 300}}>
        <Text> Project ID: {id}</Text>
          <ScrollView style={styles.scrollView}>
              {data.map(log => (
                  <SelectLogButton log={log} key={uuid()} navigate={navigate}/>
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

export default SelectLogList;