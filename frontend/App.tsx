import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableHighlight, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to BoreDM Field!</Text>
      <StatusBar style="auto" />
      <ProjectList/>
    </View>
  );
}

const onPress = () => {
  Alert.alert("Button clicked")
}

//This returns a scrollable view containing the projectButton components
const ProjectList = () => {
    return(
        <ScrollView style={styles.scrollView}>
            <ProjectButton name={"First"}/>
            <ProjectButton name={"Second"}/>
            <ProjectButton name={"Third"}/>
            <ProjectButton name={"Fourth"}/>
            <ProjectButton name={"Fifth"}/>
        </ScrollView>
    )
}

interface ButtonProps {
    name: string;
  }

// This returns a project button
const ProjectButton = (props: ButtonProps) => {
   return(
        <TouchableHighlight style={styles.touchable} onPress={onPress} activeOpacity={.8} underlayColor={"#00000011"}>
            <View style={styles.button}>
                <Text>{props.name}</Text>
            </View>
        </TouchableHighlight>
   )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  scrollView: {
  },
  touchable: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {

  }
});
