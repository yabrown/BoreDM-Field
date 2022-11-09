import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home'
import Project from './screens/project'

type RootStackParamList = {
    Home: undefined;
    Project: { name: string, id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home} options={{title: 'BoreDM Home'}} />
                <Stack.Screen name='Project' component={Project} options={{title: 'Project Details'}} initialParams={{name: "default"}} />
            </Stack.Navigator>
        </NavigationContainer>
    ); 
}

// const AddProjectButton = () => {
//      return(
//         <Button
//         onPress={onPress}
//         title="Add Project"
//         color="#841584"
//         accessibilityLabel="Learn more about this purple button"/>
//      )
// }

// const UselessTextInput = () => {
//     const [text, onChangeText] = React.useState("Enter Project name");
  
//     return (
//       <SafeAreaView>
//         <TextInput
//           onChangeText={onChangeText}
//           value={text}
//         />
//       </SafeAreaView>
//     );
//   };

// Returns view containing "BOREDM Field" text

// Takes in a name, returns a button that takes you to the project page