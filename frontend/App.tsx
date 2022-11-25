import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './screens/home';
import Log from './screens/log';
import Project from './screens/project';

const Stack = createNativeStackNavigator<RootStackParamList>();
WebBrowser.maybeCompleteAuthSession(); 

export default function App() {

    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen name='Home' component={Home} options={{title: 'BoreDM Home'}} />
                    <Stack.Screen name='Project' component={Project} options={{title: 'Project Details'}} initialParams={{}} />
                    <Stack.Screen name='Log' component={Log} options={{title: 'Log Details'}} initialParams={{}} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    ); 
    }