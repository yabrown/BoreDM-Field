import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';
import { PORT } from '../port'

const SelectBoringButton = ({ name, navigate }) => {
    return(
         <TouchableHighlight style={styles.touchable} 
          onPress={() => navigate.navigate('Boring', {name})}
          activeOpacity={.8} underlayColor={"#00000011"}>
             <View style={styles.button}>
                 <Text>{name}</Text>
             </View>
         </TouchableHighlight>
    )
  }

const SelectBoringList = ({ id, navigate }) => {
    
  // the data state will eventually be filled with array of boring types
  type boring = {
          name: string;
  };
  // useState is generic function, so can pass in the type
  const [data, setData] = useState<boring[]>([{name: "default"}])
  //const [data, setData] = useState<void>()

  useEffect(() => {
      const GetBorings: () => void = async () => {
        console.log(id)
          try{
              const fetched = await fetch(`${PORT}:4000/get_log_names`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({project_id: id})
            });
              const borings_list = await fetched.json()
              setData(borings_list)
          } catch(error) {
              console.error(error)
          }
      }
      GetBorings()
  }, [])

  return(
      <View style={{height: 300}}>
        <Text> Project ID: {id}</Text>
          <ScrollView style={styles.scrollView}>
              {data.map(boring => (
                  <SelectBoringButton name={boring.name} key={uuid()} navigate={navigate}/>
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

export default SelectBoringList;