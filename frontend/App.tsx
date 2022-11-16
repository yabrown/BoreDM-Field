import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home'
import Project from './screens/project'

type RootStackParamList = {
    Home: undefined;
    Project: { project:project};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const default_project = {id: -1, name:"default", client:"default",location:"default",notes:"default"} as project
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home} options={{title: 'BoreDM Home'}} />
                <Stack.Screen name='Project' component={Project} options={{title: 'Project Details'}} initialParams={{}} />
            </Stack.Navigator>
        </NavigationContainer>
    ); 
    }