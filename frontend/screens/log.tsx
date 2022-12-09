import { HStack, Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View } from "react-native";
import { Button, Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import Header from '../common/header';
import SelectClassificationList from '../models/SelectClassificationList';
import SelectSampleList from '../models/SelectSampleList';
import SelectRemarkList from '../models/SelectRemarkList';
import LogGraphic from '../models/LogGraphic';
import AddClassificationModal from "../dialogs/AddClassificationModal";
import AddRemarkModal from "../dialogs/AddRemarkModal";
import AddWaterModal from "../dialogs/AddWaterModal";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PORT } from '../env';
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { logout } from "../common/logout";
import { v4 as uuid } from 'uuid';
import AddSampleModal from "../dialogs/AddSampleModal"
import {DeleteLog} from "../backend-calls/DeleteButtons"
import {UpdateLog} from "../backend-calls/UpdateButtons"
import EditLogModal from "../dialogs/EditLogModal"
import { LogListContext } from "../contexts/LogListContext";


type Props = NativeStackScreenProps<RootStackParamList, 'Log'>;


const Title = ({ name }) =>{
  return(
      <View style={styles.titleView}>
          <Text style={{fontWeight:'600', fontSize: 30, color: 'black'}}>{name}</Text>
      </View>
  )
}


const Log = ({ route, navigation }: Props) => {

  const [currentLog, setLog] = useState<log>(route.params.log);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { logList, setLogList } = useContext(LogListContext);

  const [samplesList, setSamplesList] = useState<sample[]>([])
  const [classificationsList, setClassificationsList] = useState<classification[]>([])
  const [remarksList, setRemarksList] = useState<remark[]>([])
  const [waterList, setWaterList] = useState<water[]>([])

  const refreshLogs = async () => {
    try{
      const token = await getToken();
        const fetched = await fetch(`${PORT}/get_all_logs`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token ? token : ''}`
          },
          body: JSON.stringify({project_id: route.params.project_id})
      });
        if (fetched.ok) {
          const logs_list = await fetched.json();
          console.log(logs_list);
          
          if (setLogList) setLogList(logs_list);
        }
        else if (fetched.status === 401) {
          if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
        } 
    } catch(error) {
        console.error(error);
    }
}
  
  const refreshSamples: () => void = async () => {

    try {
      const token = await getToken();
      const fetched = await fetch(`${PORT}/get_all_samples`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token ? token : ''}`
        },
        body: JSON.stringify({log_id: route.params.log.id})
    });
      if (fetched.ok) {
        const new_samples_list = await fetched.json()
        setSamplesList(new_samples_list)
      }
      else if (fetched.status === 401) {
        if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
      }

    } catch(error) {
        console.error(error)
    }
  }

  const refreshClassifications: () => void = async () => {
    try{
      const token = await getToken();
      const fetched = await fetch(`${PORT}/get_all_classifications`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token ? token : ''}`
        },
        body: JSON.stringify({log_id: route.params.log.id})
    });
      if (fetched.ok) {
        const new_classifications_list = await fetched.json()
        setClassificationsList(new_classifications_list)
      }
      else if (fetched.status === 401) {
        if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
      }

    } catch(error) {
        console.error(error)
    }
  }

  const refreshRemarks: () => void = async () => {
    try{
      const token = await getToken();
      const fetched = await fetch(`${PORT}/get_all_remarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token ? token : ''}`
        },
        body: JSON.stringify({log_id: route.params.log.id})
    });
      if (fetched.ok) {
        const new_remarks_list = await fetched.json()
        setRemarksList(new_remarks_list)
      }
      else if (fetched.status === 401) {
        if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
      }

    } catch(error) {
        console.error(error)
    }
  }

  const refreshWater: () => void = async () => {
    try{
      const token = await getToken();
      const fetched = await fetch(`${PORT}/get_all_water_encounters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token ? token : ''}`
        },
        body: JSON.stringify({log_id: route.params.log.id})
    })
      if (fetched.ok) {
        const new_water_list = await fetched.json()
        setWaterList(new_water_list[0])
      }
      else if (fetched.status === 401) {
        if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
      }
      else console.log(fetched.status)
    } catch(error) {
        console.error(error)
    }
  }

  const dataStyles = StyleSheet.create({
    container: {
      // backgroundColor: "#7CA1B4",
      flex: 1,
      alignItems: "flex-start", // ignore this - we'll come back to it
      justifyContent: "center", // ignore this - we'll come back to it
      flexDirection: "row",
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 4,
      backgroundColor: 'white',
      margin: '3%',
      marginBottom: '1%',
      padding: '1%',
      borderRadius: 10,
    },
    column: {
      flex: 1,
      margin: '1%',
      padding: '1%',
    },
    columnColor: {
      backgroundColor: '#f1f1f1',
      borderRadius: 10,
      padding: '2%'
    },
  });

  const DataComponent = () =>{
    return(
      <View style={dataStyles.container}>
        <View style={[dataStyles.column, {flex: 4}, dataStyles.columnColor]}>
          <SelectClassificationList id={currentLog.id} classifications_list={classificationsList} refreshClassifications={refreshClassifications}/>
          <Spacer />
          <Box style={{ margin: 4 }}>
            <AddClassificationModal log_id={currentLog.id} refreshClassifications={refreshClassifications}/>
          </Box>
        </View>
        <View style={[dataStyles.column, {flex: 4}, dataStyles.columnColor]}>
          <SelectRemarkList id={currentLog.id} remarks_list={remarksList} refreshRemarks={refreshRemarks}/>
          <Spacer />
          <Box style={{ margin: 4 }}>
            <AddRemarkModal log_id={currentLog.id} refreshRemarks={refreshRemarks}/>
          </Box>
        </View>
        <View style={[dataStyles.column, {flex: 4}, dataStyles.columnColor]}>
          <SelectSampleList id={currentLog.id} samplesList={samplesList} refreshSamples={refreshSamples}/>
          <Spacer />
          <Box style={{ margin: 4 }}>
            <AddSampleModal log_id={currentLog.id} refreshSamples={refreshSamples}/>
          </Box>
        </View>
      </View>
    )
  }

  const GraphicComponent = () =>{
    return(
      <LogGraphic classifications_list={classificationsList} remarks_list={remarksList} samples_list={samplesList} water_list={waterList}></LogGraphic>
    )
  }

  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    const refresh = async () => {
      try {
        await Promise.all([refreshSamples(), refreshClassifications(), refreshRemarks(), refreshWater()])
      }
      catch(error) {
        console.error(error)
      }
    }
    refresh()
  }, [])

  return (
    <View style={styles.container}>
        <Flex fill flex-grow style={{ width:"100%" }}>
          <Box>
            <Header/>
          </Box>
          <Box>
            <Title name={currentLog.name}/>
          </Box>
          <Box style={{minHeight: "80%" }}>
            <Tab.Navigator
              initialRouteName="Projects"
              screenOptions={{
                tabBarActiveTintColor: '#000000',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: 'white' },
                tabBarIndicatorStyle: { backgroundColor: 'black' },
                lazy: true
              }}
              sceneContainerStyle= {{backgroundColor: 'white'}}
            >
              <Tab.Screen
                name="Data"
                component = {DataComponent}
                options={{ tabBarLabel: 'Data' }}
              />
              <Tab.Screen
                name="Graphic Log"
                component={GraphicComponent}  //Had to use intermediary because can't put props directly in component-- probably a type issue
                options={{ tabBarLabel: 'Graphic Log' }}
              />
            </Tab.Navigator>
          </Box>
          <Box style={styles.containers}>
            <View style={[dataStyles.column, {flex: 3}]}>
              <AddWaterModal water={waterList} setWater={setWaterList} refreshWater={refreshWater}/>
            </View>
            <View style={[dataStyles.column, {flex: 3}]}>
              {/* TODO: fix */}
              <EditLogModal log={currentLog} setLog={setLog} navigation={navigation} refreshLogs={refreshLogs}/>
            </View>
          </Box>
        </Flex>
    </View>
  );
}





const showViews = 0
//TODO: change this so that it only calulcates once, in the right place
let height = Dimensions.get('window').height
let width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: showViews,
  },
  containers: {
    alignItems: "flex-start", // ignore this - we'll come back to it
    justifyContent: "center", // ignore this - we'll come back to it
    flexDirection: "row",
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: 'white',
    margin: '3%',
    marginBottom: '1%',
    marginTop: '1%',
    padding: '1%',
    paddingBottom: '0%',
    paddingTop: '0%',
    borderRadius: 10,
  },
  titleView: {
    // height: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red',
    marginLeft: '2%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: showViews,
    borderColor: 'red'
  },
  modalView: {
    margin: 20,
    height: height/2,
    width: width/2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-evenly',
    borderWidth: showViews,
    borderColor: 'red'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#000000",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export default Log;
