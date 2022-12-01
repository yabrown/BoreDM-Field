import { ListItem, Avatar } from "@react-native-material/core";
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { v4 as uuid } from 'uuid';

const SelectProjectButton = ({ navigation, project, onUpdate  }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  let lastUpdated = project.updatedAt;
  let outputDate = "Loading projects"
  if (typeof lastUpdated !== 'undefined') {
    let year = lastUpdated.substring(0, 4)
    let month = lastUpdated.substring(5, 7);
    let day = lastUpdated.substring(8, 10);
    outputDate = "Last Updated: " + monthNames[month-1] + " " + day + ", " + year;
  }  
  
  return (<ListItem
    leadingMode="avatar"
    leading={<Avatar style={{ backgroundColor: "white" }} image={{ uri: "https://boredm-web-assets.s3.amazonaws.com/images/black_on_white_drill.png" }} />}
    title={project.name}
    secondaryText={outputDate}
    onPress={() => navigation.navigate('Project', { project, onUpdate })}
    />)
}

const SelectProjectList = ({ navigate: navigation, projects, onUpdate }) => {
    
  
  // useState is generic function, so can pass in the type

  return(
      <View style={{ marginTop: '4%'}}>
          <ScrollView style={styles.scrollView}>
              {projects.length > 0 && projects.map(project => (
                  <SelectProjectButton project={project} key={uuid()} navigation={navigation} onUpdate={onUpdate}/>
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