import React, { useState} from 'react'
import { Dimensions, Pressable, Alert, Modal, Button, StyleSheet, Text, View, SafeAreaView, ScrollView} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import SelectSampleList from '../models/SelectSampleList';
import Header from '../common/header';
import { PORT } from '../port'
import { Box, Flex, Spacer } from "@react-native-material/core";
import { Button as PaperButton, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Log'>;

const Title = (props: { name:string }) =>{
    return(
        <View style={styles.titleView}>
            <Text style={{fontWeight:'500', fontSize: 20, color: 'black'}}>{props.name}</Text>
        </View>
    )
  }

const Log = ({route, navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Provider>
        <Flex fill flex-grow style={{width:"100%"}}>
          <Box>
            <Header/>
          </Box>
          <Box>
            <Title name={route.params.log.name}/>
          </Box>
          <Box>
          <SelectSampleList id={route.params.log.id} navigate={navigation}/>
          </Box>
          <Spacer />
          <Box style={{ justifyContent: "center" }}>
            <Box style={{ margin: 4 }}>
              <AddSampleModal log_id={route.params.log.id}/>
            </Box>
            <Box style={{ margin: 4 }}>
            <EditLogModal log={route.params.log}/>
            </Box>
          </Box>
        </Flex>
      </Provider>
    </View>
  );
}

// The component that deals with the adding a new project
const SubmitSample = ({sample, setVisible}) => {
  const onPress = async () => {
    setVisible(false)
      try {
          let fetched = await fetch(`${PORT}/add_sample`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                                    log_id: sample.log_id, 
                                    start_depth: sample.start_depth, 
                                    end_depth: sample.end_depth,
                                    length: sample.length,
                                    blows_1: sample.blows_1,
                                    blows_2: sample.blows_2,
                                    blows_3:sample.blows_3,
                                    blows_4:sample.blows_4,
                                    description: sample.description,
                                    refusal_length: sample.refusal_length,
                                    sampler_type: sample.sampler_type
                                })
          })
          let json_text = await fetched.json()
          console.log(json_text)
      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Create</PaperButton>);
}

const AddSampleModal = ({log_id}) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [textStartDepth, setTextStartDepth] = useState("");
  const [textEndDepth, setTextEndDepth] = useState("");
  const [textLength, setTextLength] = useState("");
  const [textBlows1, setTextBlows1] = useState("");
  const [textBlows2, setTextBlows2] = useState("");
  const [textBlows3, setTextBlows3] = useState("");
  const [textBlows4, setTextBlows4] = useState("");
  const [textDescription, setTextDescription] = useState("");
  const [textRefusalLength, setTextRefusalLength] = useState("");
  const [textSamplerType, setSamplerType] = useState("");

  return (
      <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Sample</PaperButton>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
            <Dialog.Title>New Project</Dialog.Title>
            <Dialog.Content>
              <View>
                <TextInput value={textStartDepth} label="Start Depth" mode="outlined" onChangeText={(text) => setTextStartDepth(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textEndDepth} label="End Depth" mode="outlined" onChangeText={(text) => setTextEndDepth(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textLength} label="Length" mode="outlined" onChangeText={(text) => setTextLength(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textBlows1} label="Blows - 1" mode="outlined" onChangeText={(text) => setTextBlows1(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textBlows2} label="Blows - 2" mode="outlined" onChangeText={(text) => setTextBlows2(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textBlows3} label="Blows - 3" mode="outlined" onChangeText={(text) => setTextBlows3(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textBlows4} label="Blows - 4" mode="outlined" onChangeText={(text) => setTextBlows4(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textDescription} label="Description" mode="outlined" onChangeText={(text) => setTextDescription(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textRefusalLength} label="Refusal Length" mode="outlined" onChangeText={(text) => setTextRefusalLength(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textSamplerType} label="Sampler Type" mode="outlined" onChangeText={(text) => setSamplerType(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
              <SubmitSample sample={{log_id: log_id, 
                        start_depth: textStartDepth, 
                        end_depth: textEndDepth,
                        length: textLength,
                        blows_1: textBlows1,
                        blows_2: textBlows2,
                        blows_3:textBlows3,
                        blows_4:textBlows4,
                        description:textDescription,
                        refusal_length:textRefusalLength,
                        sampler_type:textSamplerType}} setVisible={setVisible}/>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
}

// The component that deals with the adding a new project
const UpdateLog = ( {log, setModalVisible}) => {
    const onPress = async () => {
        setModalVisible(false)
        try {
            let fetched = await fetch(`${PORT}/update_log`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({log_id: log.id, log_name: log.name, driller: log.driller, logger: log.logger, notes: log.notes})
            })
            console.log("status:", fetched.status)
        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Submit</PaperButton>);
}

const EditLogModal = ({log}) => {
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
                <TextInput value={textName} label="Project Name" mode="outlined" onChangeText={(text) => setTextName(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textLogger} label="Client Name" mode="outlined" onChangeText={(text) => setTextLogger(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textDriller} label="Location" mode="outlined" onChangeText={(text) => setTextDriller(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
                <TextInput value={textNotes} label="Notes" mode="outlined" onChangeText={(text) => setTextNotes(text)} style={{ backgroundColor: 'white', marginBottom:4}}/>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
              <UpdateLog setModalVisible={setVisible} log={{id: log.id, name: textName, logger: textLogger, driller: textDriller, notes: textNotes}}/>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};
// const EditLogModal = ({log}) => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [textName, setTextName] = useState(log.name);
//     const [textLogger, setTextLogger] = useState(log.logger);
//     const [textDriller, setTextDriller] = useState(log.driller);
//     const [textNotes, setTextNotes] = useState(log.notes);
//     return(
//     <View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}

//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={(text) => setTextName(text)}
//                     value={textName}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={(text) => setTextLogger(text)}
//                     value={textLogger}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={(text) => setTextDriller(text)}
//                     value={textDriller}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={(text) => setTextNotes(text)}
//                     value={textNotes}
//                 />
//                 <UpdateLog setModalVisible={setModalVisible} log={{id: log.id, name: textName, logger: textLogger, driller: textDriller, notes: textNotes}}/>
//                 <Button 
//                     onPress={() => setModalVisible(false)}
//                     title="Done"
//                     color="#000000"
//                     accessibilityLabel="Gets rid of modal"/>
//            </View>
//         </View>
//       </Modal>
//       <Button 
//             onPress={() => setModalVisible(true)}
//             title="Edit Log"
//             color="#000000"
//             accessibilityLabel="Activates popup Modal for project detail entry"/>
//     </View>
//     )
// }


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
    height: 30, 
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red'
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