import React, { useState} from 'react'
import { Dimensions, Pressable, Alert, Modal, Button, StyleSheet, TextInput, Text, View, SafeAreaView} from "react-native";
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
             
            </Box>
          </Box>
        </Flex>
    </View>
  );
}

// The button that deals with submitting a new Sample
const SubmitSample = ({sample, setModalVisible}) => {
    const onPress = async () => {
        try {
            let fetched = await fetch(`${PORT}:4000/add_sample_to_log`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({sample, setModalVisible})
            })
            let json_text = await fetched.json()
            console.log(json_text)
        } catch(error) {
                console.error('Error:', error);
            }
    }
  
    return (<Button
        onPress={onPress}
        title="Add Project"
        color="#000000"
        accessibilityLabel="Learn more about this purple button"/>);
  }

const AddSampleModal = ({log_id}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [textSample, setTextSample] = useState("");
    
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
                    onChangeText={setTextSample}
                    placeholder = "Enter Log Name"
                />
                <SubmitSample sample={textSample} setModalVisible={setModalVisible}/>
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
            title="+Log"
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