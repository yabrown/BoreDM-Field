import { ListItem, Avatar } from "@react-native-material/core";
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { v4 as uuid } from 'uuid';
import { LogListContext } from "../contexts/LogListContext";

const SelectLogButton = ({ log, navigate, route, updateLogList }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let lastUpdated = log.updatedAt;
  let outputDate = "Loading projects"
  if (typeof lastUpdated !== 'undefined') {
    let year = lastUpdated.substring(0, 4)
    let month = lastUpdated.substring(5, 7);
    let day = lastUpdated.substring(8, 10);
    outputDate = "Last Updated: " + monthNames[month-1] + " " + day + ", " + year;
  }
  const project_id = route.params.project.id

  return (<ListItem
    title={log.name}
    secondaryText={outputDate}
    onPress={() => { navigate.navigate('Log', { log, project_id }) }}
    // onPress={() => { navigate.navigate('Log', {log, updateLogList}) }}
    />)
}

const SelectLogList = ({ id, navigate, route, getLogs }) => {


  const { logList } = useContext(LogListContext);

  return(
      <View style={{marginTop: '4%'}}>
          <ScrollView style={styles.scrollView}>
              {logList.map(log => (
                  <SelectLogButton log={log} updateLogList={getLogs} key={uuid()} navigate={navigate} route={route}/>
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