import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

// screens
import Home from './screens/home';
import Log from './screens/log';
import Project from './screens/project';
import Login from './screens/login';
import Register from './screens/register';

const HomeStack = createNativeStackNavigator<RootStackParamList>();
const LoginStack = createNativeStackNavigator<LoginStackParamList>();

export default function App() {

    // const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    

    return (
        <PaperProvider>
            <NavigationContainer>

                {isLoggedIn ? 
                <HomeStack.Navigator initialRouteName='Home'>
                    <HomeStack.Screen name='Home' component={Home} options={{title: 'BoreDM Home'}} />
                    <HomeStack.Screen name='Project' component={Project} options={{title: 'Project Details'}} initialParams={{}} />
                    <HomeStack.Screen name='Log' component={Log} options={{title: 'Log Details'}} initialParams={{}} />
                </HomeStack.Navigator> :
                <LoginStack.Navigator>
                    <LoginStack.Screen name='Login' component={Login} options={{title: 'Login to BoreDM'}} />
                    <LoginStack.Screen name='Register' component={Register} options={{title: 'Register for BoreDM'}} />
                </LoginStack.Navigator>}
            </NavigationContainer>
        </PaperProvider>
    ); 
    }