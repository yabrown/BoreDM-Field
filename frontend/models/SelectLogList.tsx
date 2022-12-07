import { ListItem, Avatar } from "@react-native-material/core";
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { v4 as uuid } from 'uuid';

const SelectLogButton = ({ log, navigate, updateLogList }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let lastUpdated = log.updatedAt;
  let outputDate = "Loading projects"
  if (typeof lastUpdated !== 'undefined') {
    let year = lastUpdated.substring(0, 4)
    let month = lastUpdated.substring(5, 7);
    let day = lastUpdated.substring(8, 10);
    outputDate = "Last Updated: " + monthNames[month-1] + " " + day + ", " + year;
  }
  return (<ListItem
    title={log.name}
    secondaryText={outputDate}
    onPress={() => { navigate.navigate('Log', { log }) }}
    // onPress={() => { navigate.navigate('Log', {log, updateLogList}) }}
    />)
}

const SelectLogList = ({ id, navigate, getLogs, logsList }) => {
  // useState is generic function, so can pass in the type
  //const [data, setData] = useState<void>()


  return(
      <View style={{marginTop: '4%'}}>
          <ScrollView style={styles.scrollView}>
              {logsList.map(log => (
                  <SelectLogButton log={log} updateLogList={getLogs} key={uuid()} navigate={navigate}/>
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