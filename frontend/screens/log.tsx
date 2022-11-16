import React, { useState} from 'react'
import { Dimensions, Pressable, Alert, Modal, Button, StyleSheet, TextInput, Text, View, SafeAreaView, ScrollView} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import SelectSampleList from '../models/SelectSampleList';
import Header from '../common/header';
import { PORT } from '../port'
import { Box, Flex, Spacer } from "@react-native-material/core";

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
    </View>
  );
}

// The button that deals with submitting a new Sample
const SubmitSample = ({sample, setModalVisible}) => {
    const onPress = async () => {
        setModalVisible(false)
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
  
    return (<Button
        onPress={onPress}
        title="Add Sample"
        color="#000000"
        accessibilityLabel="Learn more about this purple button"/>);
  }

const AddSampleModal = ({log_id}) => {
    const [modalVisible, setModalVisible] = useState(false);
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
    
    return(
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}

        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <ScrollView>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextStartDepth}
                        placeholder = "Enter Start Depth"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextEndDepth}
                        placeholder = "Enter End Depth"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextLength}
                        placeholder = "Enter Length"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextBlows1}
                        placeholder = "Enter Blows 1"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextBlows2}
                        placeholder = "Enter Blows 2"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextBlows3}
                        placeholder = "Enter Blows 3"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextBlows4}
                        placeholder = "Enter Blows 4"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextDescription}
                        placeholder = "Enter Description"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextRefusalLength}
                        placeholder = "Enter Refusal Length"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSamplerType}
                        placeholder = "Enter Sampler Type"
                    />
                </ScrollView>
                <SubmitSample sample={{
                        log_id: log_id, 
                        start_depth: textStartDepth, 
                        end_depth: textEndDepth,
                        length: textLength,
                        blows_1: textBlows1,
                        blows_2: textBlows2,
                        blows_3:textBlows3,
                        blows_4:textBlows4,
                        description:textDescription,
                        refusal_length:textRefusalLength,
                        sampler_type:textSamplerType
                    }} 
                    setModalVisible={setModalVisible}
                />
                <Button 
                    onPress={() => setModalVisible(false)}
                    title="Done"
                    color="#000000"
                    accessibilityLabel="Gets rid of modal"/>
           </View>
        </View>
      </Modal>
      <Button 
            onPress={() => setModalVisible(true)}
            title="+Sample"
            color="#000000"
            accessibilityLabel="Activates popup Modal for project detail entry"/>
    </View>
    )
}

// The component that deals with the adding a new project
const UpdateLog = ( {log, setModalVisible}) => {
    const onPress = async () => {
        setModalVisible(false)
        try {
            let fetched = await fetch(`${PORT}:4000/update_log`, {
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
    return (<Button
        onPress={onPress}
        title="Update Log"
        color="#000000"
        accessibilityLabel="Learn more about this purple button"/>
    );
}

const EditLogModal = ({log}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [textName, setTextName] = useState(log.name);
    const [textLogger, setTextLogger] = useState(log.logger);
    const [textDriller, setTextDriller] = useState(log.driller);
    const [textNotes, setTextNotes] = useState(log.notes);
    return(
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}

        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextName(text)}
                    value={textName}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextLogger(text)}
                    value={textLogger}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextDriller(text)}
                    value={textDriller}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextNotes(text)}
                    value={textNotes}
                />
                <UpdateLog setModalVisible={setModalVisible} log={{id: log.id, name: textName, logger: textLogger, driller: textDriller, notes: textNotes}}/>
                <Button 
                    onPress={() => setModalVisible(false)}
                    title="Done"
                    color="#000000"
                    accessibilityLabel="Gets rid of modal"/>
           </View>
        </View>
      </Modal>
      <Button 
            onPress={() => setModalVisible(true)}
            title="Edit Log"
            color="#000000"
            accessibilityLabel="Activates popup Modal for project detail entry"/>
    </View>
    )
}


const showViews = 0
//TODO: change this so that it only calulcates once, in the right place
let height = Dimensions.get('window').height
let width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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