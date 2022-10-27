import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableHighlight, Alert } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Header/>
            <Title name="Project"/>
            <StatusBar style="auto" />
            <SelectProjectList/>
        </View>
    );
}


const onPress = () => {
  Alert.alert("Button clicked")
}



//This returns a scrollable view containing the projectButton components
const SelectProjectList = () => {
    return(
        <View style={{height: 300}}>
            <ScrollView style={styles.scrollView}>
                <SelectProjectButton name={"First"}/>
                <SelectProjectButton name={"Second"}/>
                <SelectProjectButton name={"Third"}/>
                <SelectProjectButton name={"Fourth"}/>
                <SelectProjectButton name={"Fifth"}/>
                <SelectProjectButton name={"Sixth"}/>
                <SelectProjectButton name={"Seventh"}/>
                <SelectProjectButton name={"Eighth"}/>
            </ScrollView>
        </View>
    )
}

// Returns view containing "BOREDM Field" text
const Header = () =>{
    return(
        <View style={styles.headerView}>
            <Text style={{fontWeight:'800', fontSize: 50, color: 'black'}}>BORE<Text style={{ fontWeight: '800', color: 'grey' }}>
            DM</Text> <Text style={{ fontWeight: '400' }}>Field</Text></Text>
        </View>
    )
}

// Returns text to go above changing view-- Ex: Project, Map, Mariner's Apartment 
const Title = (props: props) =>{
    return(
        <View style={styles.titleView}>
            <Text style={{fontWeight:'500', fontSize: 20, color: 'black'}}>{props.name}</Text>
        </View>
    )
}

// Props for SelectProjectButton
interface props {
    name: string;
  }

// Takes in a name, returns a button that takes you to the project page
const SelectProjectButton = (props: props) => {
   return(
        <TouchableHighlight style={styles.touchable} onPress={onPress} activeOpacity={.8} underlayColor={"#00000011"}>
            <View style={styles.button}>
                <Text>{props.name}</Text>
            </View>
        </TouchableHighlight>
   )
}


const showViews = 0
const styles = StyleSheet.create({
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
  scrollView: {
    borderWidth: showViews,
    borderColor: 'red'
  },
  touchable: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red'
  },
  text: {

  },
  headerView: {
    height: 100, 
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
  }
});
