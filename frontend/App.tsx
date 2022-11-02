import { stringLiteral } from '@babel/types';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { Button, StyleSheet, TextInput, Text, View, SafeAreaView, ScrollView, TouchableHighlight, Alert } from 'react-native';


export default function App() {
    const [text, onChangeText] = useState("Enter Project name");
    const onPress = () => {
        fetch('localhost:4000/post', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(text),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
        });
    }
    return (
        <View style={styles.container}>
            <Header/>
            <Title name="Project"/>
            <StatusBar style="auto" />
            <SelectProjectList/>
            

            <SafeAreaView>
                <TextInput
                    onChangeText={onChangeText}
                    value={text}
                />
            </SafeAreaView>
            <Button
            onPress={onPress}
            title="Add Project"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"/>
        


        </View>
    );
}

const AddProjectButton = () => {
     return(
        <Button
        onPress={onPress}
        title="Add Project"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"/>
     )
}

const UselessTextInput = () => {
    const [text, onChangeText] = React.useState("Enter Project name");
  
    return (
      <SafeAreaView>
        <TextInput
          onChangeText={onChangeText}
          value={text}
        />
      </SafeAreaView>
    );
  };

const onPress = () => {
  Alert.alert("Button clicked")
}

//This returns a scrollable view containing the projectButton components
const SelectProjectList = () => {
    
    // the data state will eventually be filled with array of project types
    interface project{
        project_id: number;
        name: string;
    }
    // useState is generic function, so can pass in the type
    const [data, setData] = useState<project[]>([{project_id: -1, name: "default"}])
    //const [data, setData] = useState<void>()

    const GetProjects = async () => {
        try{
            await fetch('http://localhost:4000/').then(res => res.json()).then(data => setData(data))
            //let data = fetched.json()
        }catch(error){
            console.error(error)

        }
    }

    GetProjects()

    return(
        <View style={{height: 300}}>
            <ScrollView style={styles.scrollView}>
                {data.map(project => (
                    <SelectProjectButton name={project.name}/>
                ))}
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
