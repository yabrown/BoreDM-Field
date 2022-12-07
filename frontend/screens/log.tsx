import { HStack, Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View } from "react-native";
import { Button, Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import Header from '../common/header';
import SelectClassificationList from '../models/SelectClassificationList';
import SelectSampleList from '../models/SelectSampleList';
import SelectRemarkList from '../models/SelectRemarkList';
import AddClassificationModal from "../dialogs/AddClassificationModal";
import AddRemarkModal from "../dialogs/AddRemarkModal";
import AddWaterModal from "../dialogs/AddWaterModal";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PORT } from '../env';
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { logout } from "../common/logout";
import { v4 as uuid } from 'uuid';


type Props = NativeStackScreenProps<RootStackParamList, 'Log'>;


const Title = (props: { name:string }) =>{
  return(
      <View style={styles.titleView}>
          <Text style={{fontWeight:'600', fontSize: 30, color: 'black'}}>{props.name}</Text>
      </View>
  )
}


const Log = ({ route, navigation }: Props) => {

  const [currentLog, setLog] = useState(route.params.log);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const [samplesList, setSamplesList] = useState<sample[]>([])
  const [classificationsList, setClassificationsList] = useState<classification[]>([])
  const [remarksList, setRemarksList] = useState<remark[]>([])
  const [waterList, setWaterList] = useState<water[]>([])

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
    });
      if (fetched.ok) {
        const new_water_list = await fetched.json()
        console.log("New water list: " + new_water_list)
        setWaterList(new_water_list)
      }
      else if (fetched.status === 401) {
        if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
      } 
      
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
      // backgroundColor: "#7cb48f",
      flex: 1,
      margin: '1%',
      padding: '1%',
      // borderColor: 'black',
      // borderWidth: 1,
    },
  });

  const DataComponent = () =>{
    return(
      <View style={dataStyles.container}>
        <View style={[dataStyles.column, {flex: 3}]}>
          <SelectSampleList id={currentLog.id} samplesList={samplesList} refreshSamples={refreshSamples}/>
          <Spacer />
          <Box style={{ margin: 4 }}>
            <AddSampleModal log_id={currentLog.id} refreshSamples={refreshSamples}/>
          </Box>
        </View>
        <View style={[dataStyles.column, {flex: 5}]}>
          <SelectClassificationList id={currentLog.id} classifications_list={classificationsList} refreshClassifications={refreshClassifications}/>
          <Spacer />
          <Box style={{ margin: 4 }}>
            <AddClassificationModal log_id={currentLog.id} refreshClassifications={refreshClassifications}/>
          </Box>
        </View>
        <View style={[dataStyles.column, {flex: 4}]}>
          <SelectRemarkList id={currentLog.id} remarks_list={remarksList} refreshRemarks={refreshRemarks}/>
          <Spacer />
          <Box style={{ margin: 4 }}>
            <AddRemarkModal log_id={currentLog.id} refreshRemarks={refreshRemarks}/>
          </Box>
        </View>
      </View>
    )
  }

  const GraphicComponent = () =>{
    return(
      <LogGraphic classifications_list={classificationsList}></LogGraphic>
    )
  }

  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    refreshSamples();
    refreshClassifications();
    refreshRemarks();
    refreshWater();
  }, [])

  return (
    <View style={styles.container}>
        <Flex fill flex-grow style={{ width:"100%" }}>
          <Box>
            <Header/>
          </Box>
          <Box>
            <Title name={route.params.log.name}/>
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
              <AddWaterModal water={waterList} refreshWater={refreshWater}/>
            </View>
            <View style={[dataStyles.column, {flex: 3}]}>
              <EditLogModal log={currentLog} navigation={navigation} updateLogList={route.params.updateLogList}/>
            </View>
          </Box>
        </Flex>
    </View>
  );
}

const LogGraphic = ({classifications_list}) => {

  const styles = StyleSheet.create({
    classification_col: {
      flexDirection: 'column',
      maxWidth: '15%',
      flex: 1,
    },
    ruler_col: {
      flexDirection: 'column',
      maxWidth: '5%',
    },
    ruler_box: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    classification_box: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  const uscs_colormap = {
    'NONE': { box: 'white', text: 'white'},
    'CH': { box: '#F4F4F4', text: 'black'},
    'CL': { box: '#EBEBEB', text: 'black'},
    'CL-ML': { box: '#DFDFDF', text: 'black'},
    'GC': { box: '#D1D1D1', text: 'black'},
    'GC-GM': { box: '#C7C7C7', text: 'black'},
    'GM': { box: '#DFDFDF', text: 'black'},
    'GP': { box: '#BBBBBB', text: 'black'},
    'GP-GC': { box: '#AFAFAF', text: 'black'},
    'GP-GM': { box: '#A5A5A5', text: 'black'},
    'GW': { box: '#9C9C9C', text: 'black'},
    'GW-GC': { box: '#939393', text: 'black'},
    'GW-GM': { box: '#8B8B8B', text: 'black'},
    'ML': { box: '#838383', text: 'black'},
    'SC': { box: '#6D6D6D', text: 'black'},
    'SC-SM': { box: '#676767', text: 'white'},
    'SM': { box: '#5F5F5F', text: 'white'},
    'SP': { box: '#595959', text: 'white'},
    'SP-SC': { box: '#505050', text: 'white'},
    'SP-SM': { box: '#444444', text: 'white'},
    'SW': { box: '#3B3B3B', text: 'white'},
    'SW-SC': { box: '#2F2F2F', text: 'white'},
    'SW-SM': { box: '#252525', text: 'white'},
    'OH': { box: '#1B1B1B', text: 'white'},
    'OL': { box: '#0F0F0F', text: 'white'},
    'PT': { box: '#000000', text: 'white'},
  }


  let make_uscs_box = function (classification: classification) {    
    const length = classification.end_depth - classification.start_depth;
    const boxColor = uscs_colormap[classification.uscs]['box'];
    const textColor = uscs_colormap[classification.uscs]['text'];
    return <View key={uuid()} style={[styles.classification_box, {flex: length, backgroundColor: boxColor }]} ><Text style={{color: textColor}}>{classification.uscs}</Text></View>
  };

  function compareDepths(classification_a: classification, classification_b: classification) {
    return classification_a.start_depth - classification_b.start_depth;
  }

  let make_uscs_boxes = function (classifications: classification[]) {
    if(classifications.length == 0) return <Text>No Data</Text>;

    const classificationsCopy  = [...classifications]; 
    
    classificationsCopy.sort(compareDepths);

    for(let i = 0; i < classificationsCopy.length; i++) {
      let classification = classificationsCopy[i];

      if(i == 0) {
        // insert blank box when first classification starts deeper than 0'
        if(classification.start_depth != 0) {
          let emptyClassification = {"color": "white", "createdAt": "", "density": "", "end_depth": classification.start_depth, "hardness": "", "id": 3, "log_id": 2, "moisture": "", "start_depth": 0, "updatedAt": "2022-11-30T07:32:13.127Z", "uscs": "NONE"}
          classificationsCopy.splice(0, 0, emptyClassification);
        }
      }
      // insert blank box when there's a gap between this classification and the next one
      if(i < classificationsCopy.length - 1) {
        if(classification.end_depth < classificationsCopy[i+1].start_depth) {
          let emptyClassification = {"color": "white", "createdAt": "", "density": "", "end_depth": classificationsCopy[i+1].start_depth, "hardness": "", "id": 3, "log_id": 2, "moisture": "", "start_depth": classification.end_depth, "updatedAt": "2022-11-30T07:32:13.127Z", "uscs": "NONE"}
          classificationsCopy.splice(i+1, 0, emptyClassification);
        }
      }
    }

    // insert blank box at end to make final depth a multiple of 5
    let bottom = classificationsCopy[classificationsCopy.length - 1].end_depth;
    if(bottom % 5 != 0) {
      let diff = 5 - bottom % 5
      let emptyClassification = {"color": "white", "createdAt": "", "density": "", "end_depth": bottom + diff, "hardness": "", "id": 3, "log_id": 2, "moisture": "", "start_depth": bottom, "updatedAt": "2022-11-30T07:32:13.127Z", "uscs": "NONE"}
      classificationsCopy.splice(classificationsCopy.length, 0, emptyClassification);
    }
    const uscs_boxes = classificationsCopy.map((classification) =>
      make_uscs_box(classification)
    );

    return uscs_boxes
  }

  let make_ruler_boxes = function (classifications: classification[]) {
    if(classifications.length == 0) return;

    classifications.sort(compareDepths);

    const bottom = classifications[classifications.length - 1].end_depth;
    const numboxes = Math.ceil(bottom/5);

    var depths = new Array(numboxes);
    for (var i = 0; i < depths.length; i++) {
      depths[i] = i * 5;
    }
    
    const ruler_boxes = depths.map((depth) =>
      <View style={[styles.ruler_box, {flex: 1}]} key={uuid()} ><Text>{depth}'</Text></View>
    );

    return ruler_boxes
  }

  return (
    <View style={{flexDirection: 'row', flex: 1, paddingLeft: '6%', paddingTop: '6%', paddingBottom: '2%'}}>
      <View style={[styles.ruler_col, {flex: 1}]}>
        {make_ruler_boxes(classifications_list)}
      </View>
      <View style={[styles.classification_col, {flex: 1}]}>
        {make_uscs_boxes(classifications_list)}
      </View>
    </View>
  )
}

// The component that deals with the adding a new project
const SubmitSample = ({ sample, setVisible, refreshSamples }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const onPress = async () => {
    setVisible(false)
      try {
        const token = await getToken();
        const fetched = await fetch(`${PORT}/add_sample`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`
            },
            body: JSON.stringify({...sample})
        })
          console.log('status:', fetched.status);
          if (fetched.ok) {
            refreshSamples();
          }
          else if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          }
          
      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Create</PaperButton>);
}

const AddSampleModal = ({ log_id, refreshSamples }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const emptySample: sample = { sample_id: -1, log_id: log_id, start_depth: NaN, end_depth: NaN, length: NaN, blows_1: NaN, blows_2: NaN, blows_3: NaN, blows_4: NaN, description: "", refusal_length: NaN, sampler_type: "" }
  const [currSample, setSample] = useState(emptySample)

  return (
      <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Sample</PaperButton>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
            <Dialog.Title>New Project</Dialog.Title>
            <Dialog.Content>
              <View>
              <TextInput value={isNaN(currSample.start_depth) ? "": String(currSample.start_depth)} label="Start Depth" mode="outlined" onChangeText={(text) => setSample({ ...currSample, start_depth: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.end_depth) ? "": String(currSample.end_depth)} label="End Depth" mode="outlined" onChangeText={(text) => setSample({ ...currSample, end_depth: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.length) ? "": String(currSample.length)} label="Sample Length" mode="outlined" onChangeText={(text) => setSample({ ...currSample, length: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.blows_1) ? "": String(currSample.blows_1)} label="Blows 1" mode="outlined" onChangeText={(text) => setSample({ ...currSample, blows_1: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.blows_2) ? "": String(currSample.blows_2)} label="Blows 2" mode="outlined" onChangeText={(text) => setSample({...currSample, blows_2: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.blows_3) ? "": String(currSample.blows_3)} label="Blows 3" mode="outlined" onChangeText={(text) => setSample({...currSample, blows_3: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.blows_4) ? "": String(currSample.blows_4)} label="Blows 4" mode="outlined" onChangeText={(text) => setSample({...currSample, blows_4: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={currSample.description} label="Description" mode="outlined" onChangeText={(text) => setSample({...currSample, description: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(currSample.refusal_length) ? "": String(currSample.refusal_length)} label="Refusal Length" mode="outlined" onChangeText={(text) => setSample({...currSample, refusal_length: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={currSample.sampler_type} label="Sampler Type" mode="outlined" onChangeText={(text) => setSample({...currSample, sampler_type: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
              <SubmitSample sample={currSample} setVisible={setVisible} refreshSamples={refreshSamples}/>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
}


// The component that deals with the adding a new project
const DeleteLog = ({ log, setModalVisible, navigation, updateLogList }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const onPress = async () => {
      setModalVisible(false)
      try {
        const token = await getToken();
        const fetched = await fetch(`${PORT}/delete_log`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`
            },
            body: JSON.stringify({log_id: log.id})
        })
        if (fetched.ok) {
          updateLogList();
          navigation.navigate('Project')
        }
        else if (fetched.status === 401) {
          if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
        }
      } catch(error) {
            console.log("Problem")
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "red" }} onPress={onPress}>Delete</PaperButton>);
}

// The component that deals with updating log data
const UpdateLog = ( {log, setModalVisible}) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    const onPress = async () => {
        setModalVisible(false)
        try {
          const token = await getToken();
          const fetched = await fetch(`${PORT}/update_log`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
              },
              body: JSON.stringify({log_id: log.id, log_name: log.name, driller: log.driller, logger: log.logger, notes: log.notes})
          })
          console.log("status:", fetched.status)
          
          if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          }
        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Submit</PaperButton>);
}

const EditLogModal = ({log, updateLogList, navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [textName, setTextName] = useState(log.name);
  const [textLogger, setTextLogger] = useState(log.logger);
  const [textDriller, setTextDriller] = useState(log.driller);
  const [textNotes, setTextNotes] = useState(log.notes);

  return (
      <View>
      <PaperButton onPress={showDialog} style={{backgroundColor:"lightgrey"}} labelStyle={{fontSize: 18, color: "black" }}>Edit Log Metadata</PaperButton>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
            <Dialog.Title>Edit Log Metadata</Dialog.Title>
            <Dialog.Content>
              <View>
                <TextInput value={textName} label="Log Name" mode="outlined" onChangeText={(text) => setTextName(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={textLogger} label="Logger" mode="outlined" onChangeText={(text) => setTextLogger(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={textDriller} label="Driller" mode="outlined" onChangeText={(text) => setTextDriller(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
                <TextInput value={textNotes} label="Notes" mode="outlined" onChangeText={(text) => setTextNotes(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
              <DeleteLog setModalVisible={setVisible} log={{id: log.id}} navigation={navigation} updateLogList={updateLogList}/>
              <UpdateLog setModalVisible={setVisible} log={{id: log.id, name: textName, logger: textLogger, driller: textDriller, notes: textNotes}}/>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

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
