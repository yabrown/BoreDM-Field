import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './screens/home';
import Log from './screens/log';
import Project from './screens/project';
import { Auth0Provider } from "react-native-auth0";
import { LoginButton } from './buttons/login-button';

const Stack = createNativeStackNavigator<RootStackParamList>();
WebBrowser.maybeCompleteAuthSession(); 

export default function App() {
    const [user, setUser] = React.useState(null);

    return (
        <Auth0Provider
        domain={'dev-akt6eqmmnrxlsyyx.us.auth0.com'}
        clientId={'bQDe0499YLa8b0ZLBWm0VoVKftdgxOat'}
        redirectUri={'http://localhost:19006'}>
            <LoginButton setUser={setUser}></LoginButton>
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen name='Home' component={Home} options={{title: 'BoreDM Home'}} />
                    <Stack.Screen name='Project' component={Project} options={{title: 'Project Details'}} initialParams={{}} />
                    <Stack.Screen name='Log' component={Log} options={{title: 'Log Details'}} initialParams={{}} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
        </Auth0Provider>
    ); 
    }