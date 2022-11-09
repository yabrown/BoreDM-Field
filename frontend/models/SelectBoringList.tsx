import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';

const SelectBoringButton = ({ notes, navigate }) => {
    return(
         <TouchableHighlight style={styles.touchable} 
          onPress={() => navigate.navigate('Boring', {notes})}
          activeOpacity={.8} underlayColor={"#00000011"}>
             <View style={styles.button}>
                 <Text>{notes}</Text>
             </View>
         </TouchableHighlight>
    )
  }

const SelectBoringList = ({ navigate }) => {
    
  // the data state will eventually be filled with array of boring types
  type boring = {
          notes: string;
  };
  // useState is generic function, so can pass in the type
  const [data, setData] = useState<boring[]>([{notes: "default"}])
  //const [data, setData] = useState<void>()

  useEffect(() => {
      const GetBorings: () => void = async () => {
          try{
              const fetched = await fetch('http://localhost:4000/');
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
          <ScrollView style={styles.scrollView}>
              {data.map(boring => (
                  <SelectBoringButton notes={boring.notes} key={uuid()} navigate={navigate}/>
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