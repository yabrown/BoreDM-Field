import React, { useState} from 'react'
import { Button, StyleSheet, TextInput, Text, View, SafeAreaView } from 'react-native';
import Header from '../common/header';
import SelectProjectList from '../models/SelectProjectList';

const SubmitProject = (props:{text: string}) => {
  const onPress = async () => {
      try {
          let fetched = await fetch('http://localhost:4000/post', {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({project_name: props.text})
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
      color="#841584"
      accessibilityLabel="Learn more about this purple button"/>);
}

//This returns a scrollable view containing the projectButton components

// Returns text to go above changing view-- Ex: Project, Map, Mariner's Apartment 
const Title = (props: { name:string }) =>{
  return(
      <View style={styles.titleView}>
          <Text style={{fontWeight:'500', fontSize: 20, color: 'black'}}>{props.name}</Text>
      </View>
  )
}

const Home = ({ navigation }) => {

  const [text, setText] = useState("Enter Project name");

  return (
    <View style={styles.container}>
                    <Header/>
                    <Title name="Project"/>
                    <SelectProjectList navigate={navigation}/>
                    <SafeAreaView>
                        <TextInput
                            onChangeText={setText}
                            value={text}
                        />
                    </SafeAreaView>
                    <SubmitProject text={text}/>
                </View>
  )
}

const showViews = 0
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
  }
});

export default Home;