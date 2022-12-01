import { HStack, Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View } from "react-native";
import { Button, Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import Header from '../common/header';
import SelectClassificationList from '../models/SelectClassificationList';
import SelectSampleList from '../models/SelectSampleList';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PORT } from '../env';
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { logout } from "../common/logout";
import { v4 as uuid } from 'uuid';


type Props = NativeStackScreenProps<RootStackParamList, 'Log'>;

const SelectButton = ({ current, buttonOption, setFunction, color, highlightedColor="lightgrey" }) => (  
  <View style={{ minWidth: 140, margin: 4 }}>
    <Button
      style={{borderColor: color }}
      buttonColor={current===buttonOption ? highlightedColor : color}
      textColor='black'
      mode='outlined'
      onPress={
        () => {
          setFunction(buttonOption);
        }
      }
    >
      { buttonOption }
    </Button>
  </View>
);


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

  const default_sample: sample = {
    log_id:         NaN,
    sample_id:      NaN,
    start_depth:    NaN,
    end_depth:      NaN,
    length:         NaN,
    blows_1:        NaN,
    blows_2:        NaN,
    blows_3:        NaN,
    blows_4:        NaN,
    description:    '',
    refusal_length: NaN,
    sampler_type:   '',
  }

  const default_classification: classification = {
    log_id:         NaN,
    start_depth:    0,
    end_depth:      0,
    uscs:    'NONE',
    color:   '',
    moisture:   '',
    density:   '',
    hardness:   '',
  }

  const [samplesList, setSamplesList] = useState([default_sample])
  const [classificationsList, setClassificationsList] = useState([default_classification])

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

  const dataStyles = StyleSheet.create({
    container: {
      // backgroundColor: "#7CA1B4",
      flex: 1,
      alignItems: "flex-start", // ignore this - we'll come back to it
      justifyContent: "center", // ignore this - we'll come back to it
      flexDirection: "row",
    },
    column: {
      // backgroundColor: "#7cb48f",
      flex: 1,
      margin: '1%',
      padding: '1%',
      borderColor: 'black',
      borderWidth: 1,
    },
  });

  const DataComponent = () =>{
    return(
      <View style={dataStyles.container}>
        <View style={[dataStyles.column, {flex: 2}]}>
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
          <Spacer />
          <Box style={{ justifyContent: "center" }}>
            <Box style={{ margin: 4 }}>
              <EditLogModal log={currentLog} navigation={navigation} updateLogList={route.params.updateLogList}/>
            </Box>
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
    }
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
// const DeleteLog = ({ log, setModalVisible, navigation, updateLogList }) => {
//   // const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

//   const onPress = async () => {
//     hideDialog()
//       try {
//           const token = await getToken();
//           let fetched = await fetch(`${PORT}/add_classification`, {
//               method: 'POST', // or 'PUT'
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${token ? token : ''}`
//               },
//               body: JSON.stringify({...classification})
//           })
//           let status = await fetched.status
//           console.log('status:', status);
//           refreshClassifications();
//       } catch(error) {
//               console.error('Error:', error);
//           }
//   }
//   return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Create</PaperButton>);
// }

const SubmitClassification = ({ classification, hideDialog, refreshClassifications }) => {
  const onPress = async () => {
    hideDialog()
      try {
          let fetched = await fetch(`${PORT}/add_classification`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({...classification})
          })
          let status = await fetched.status
          console.log('status:', status);
          refreshClassifications();
      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Create</PaperButton>);
}

const AddClassificationModal = ({ log_id, refreshClassifications }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // The default classificatin has everything empty except for log_id, which must is set by a param to this function
  const classification: classification = { log_id: log_id, start_depth: NaN, end_depth: NaN, uscs: '', color: '', moisture: '', density: '', hardness: ''}
  const [start_depth, setStartDepth] = useState(classification.start_depth);
  const [end_depth, setEndDepth] = useState(classification.end_depth);
  const [uscs, setUSCS] = useState(classification.uscs);
  const [color, setColor] = useState(classification.color);
  const [moisture, setMoisture] = useState(classification.moisture);
  const [density, setDensity] = useState(classification.density);
  const [hardness, setHardness] = useState(classification.hardness);

  return (
    <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Classification</PaperButton>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Classification Data</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <TextInput value={isNaN(start_depth) ? "": String(start_depth)} label="Start Depth" mode="outlined" onChangeText={(text) => setStartDepth(Number(text))} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(end_depth) ? "": String(end_depth)} label="End Depth" mode="outlined" onChangeText={(text) => setEndDepth(Number(text))} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <List.Accordion title="USCS" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="CH" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="CL" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="CL-ML" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GC-GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GP" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GP-GC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GP-GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GW" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GW-GC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GW-GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="ML" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SC-SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SP" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SP-SC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SP-SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SW" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SW-SC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SW-SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="OH" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="OL" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="PT" setFunction={setUSCS} current={uscs} color="white"/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Color" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Black" current={color} setFunction={setColor} color={"#000000"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Brown 1" current={color} setFunction={setColor} color={"#3C312D"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Brown 2" current={color} setFunction={setColor} color={"#4B3E39"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Brown" current={color} setFunction={setColor} color={"#5C4B44"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Brown" current={color} setFunction={setColor} color={"#66534C"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Light Brown 1" current={color} setFunction={setColor} color={"#766058"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Light Brown 2" current={color} setFunction={setColor} color={"#886D63"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Light Brown 3" current={color} setFunction={setColor} color={"#9B8076"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Orange 1" current={color} setFunction={setColor} color={"#341B12"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Orange 2" current={color} setFunction={setColor} color={"#432317"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Orange 3" current={color} setFunction={setColor} color={"#522B1D"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 1" current={color} setFunction={setColor} color={"#633423"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 2" current={color} setFunction={setColor} color={"#743E29"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 3" current={color} setFunction={setColor} color={"#8C4B32"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 4" current={color} setFunction={setColor} color={"#A3563A"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 5" current={color} setFunction={setColor} color={"#B86141"} highlightedColor={'white'}/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Moisture" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Dry" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Dry to Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Damp" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Damp to Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Moist to Wet" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Very Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Very Moist to Wet" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Wet" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Saturated" setFunction={setMoisture} current={moisture} color="white"/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Density" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Very Loose" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Loose" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Medium Dense" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Dense" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Very Dense" setFunction={setDensity} current={density} color="white"/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Hardness" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Very Soft" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Soft" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Firm" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Stiff" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Very Stiff" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Hard" setFunction={setHardness} current={hardness} color="white"/>
                </HStack>
              </List.Accordion>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <SubmitClassification classification={{log_id, start_depth, end_depth, uscs, color, moisture, density, hardness}} hideDialog={hideDialog} refreshClassifications={refreshClassifications}/>
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
  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Delete</PaperButton>);
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
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>Edit Log Metadata</PaperButton>
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
              <UpdateLog setModalVisible={setVisible} log={{id: log.id, name: textName, logger: textLogger, driller: textDriller, notes: textNotes}}/>
              <DeleteLog setModalVisible={setVisible} log={{id: log.id}} navigation={navigation} updateLogList={updateLogList}/>
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
    borderColor: 'red'
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
