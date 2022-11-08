import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';

const SelectProjectButton = ({ notes, navigate }) => {
    return(
         <TouchableHighlight style={styles.touchable} 
         onPress={() => navigate.navigate('Project', {notes})}
          activeOpacity={.8} underlayColor={"#00000011"}>
             <View style={styles.button}>
                 <Text>{notes}</Text>
             </View>
         </TouchableHighlight>
    )
  }

const SelectProjectList = ({ navigate }) => {
    
  // the data state will eventually be filled with array of project types
  type project = {
          notes: string;
  };
  // useState is generic function, so can pass in the type
  const [data, setData] = useState<project[]>([{notes: "default"}])
  //const [data, setData] = useState<void>()

  useEffect(() => {
      const GetProjects: () => void = async () => {
          try{
              const fetched = await fetch('http://localhost:4000/');
              const projects_list = await fetched.json()
              setData(projects_list)
          } catch(error) {
              console.error(error)
          }
      }
      GetProjects()
  }, [])

  return(
      <View style={{height: 300}}>
          <ScrollView style={styles.scrollView}>
              {data.map(project => (
                  <SelectProjectButton notes={project.notes} key={uuid()} navigate={navigate}/>
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

export default SelectProjectList;