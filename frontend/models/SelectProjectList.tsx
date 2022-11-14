import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { TouchableHighlight, View, Text, ScrollView } from "react-native";
import { v4 as uuid } from 'uuid';
import { PORT } from '../port'

// the data state will eventually be filled with array of project types
type project = {
    id:         number
    name:       string
    client:     string
    location:   string
    notes:      string
  }

const SelectProjectButton = ({project: project, navigate }) => {
    return(
         <TouchableHighlight style={styles.touchable} 
         onPress={() => navigate.navigate('Project', {project})}
          activeOpacity={.8} underlayColor={"#00000011"}>
             <View style={styles.button}>
                 <Text>{project.name}</Text>
             </View>
         </TouchableHighlight>
    )
  }

const SelectProjectList = ({ navigate }) => {
    
  
  // useState is generic function, so can pass in the type
  const [data, setData] = useState<project[]>([{name: "default", id: -1, client:"default", location:"default", notes:"default"}])
  //const [data, setData] = useState<void>()

  useEffect(() => {
      const GetProjects: () => void = async () => {
          try{
              const fetched = await fetch(`${PORT}:4000/get_all_projects`);
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
                  <SelectProjectButton project = {project} key={uuid()} navigate={navigate}/>
              ))}
          </ScrollView>
      </View>
  )
}

const showViews = 3
const styles = StyleSheet.create({

  touchable: {
    flex: 1,
    backgroundColor: '#68a0cf',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    padding: 5,
    margin: 5,
  },
  scrollView: {
    borderWidth: showViews,
    borderColor: 'white',
    backgroundColor: 'white'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },

});

export default SelectProjectList;