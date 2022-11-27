import { ListItem } from "@react-native-material/core";
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { v4 as uuid } from 'uuid';

const SelectLogButton = ({ log, navigate, updateLogList }) => {
  return(
    <ListItem title={log.name} onPress={() => { navigate.navigate('Log', {log, updateLogList}) }}/>
  )
}

const SelectLogList = ({ id, navigate, getLogs, logsList }) => {
  // useState is generic function, so can pass in the type
  //const [data, setData] = useState<void>()

  useEffect(() => {
      getLogs()
  }, [])

  return(
      <View style={{height: 300}}>
        <Text> Project ID: {id}</Text>
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