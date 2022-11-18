import React, { useState} from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Header from '../common/header';
import SelectProjectList from '../models/SelectProjectList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PORT } from '../port';
import { Box, Flex, Spacer } from "@react-native-material/core";
import { Button as PaperButton, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

//This returns a scrollable view containing the projectButton components

// Returns text to go above changing view-- Ex: Project, Map, Mariner's Apartment
const Title = (props: { name:string }) =>{
  return(
      <View style={styles.titleView}>
          <Text style={{fontWeight:'500', fontSize: 20, color: 'black'}}>{props.name}</Text>
      </View>
  )
}

const Home = ({ navigation }: Props) => {

  return (
    <View style={styles.container}>
      <Provider>
        <Flex fill flex-grow style={{width:"100%"}}>
          <Box>
            <Header/>
          </Box>
          <Box>
            <Title name={"Projects"}/>
          </Box>
          <Box>
            <SelectProjectList navigate={navigation}/>
          </Box>
          <Spacer />
          <Box style={{ justifyContent: "center" }}>
            <Box style={{ margin: 4 }}>
            </Box>
            </Box>
        </Flex>
      </Provider>
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: showViews,
    borderColor: 'red',
    padding: 10,
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
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
});

export default Home;
