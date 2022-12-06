import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { LoginContext } from './contexts/LoginContext';
import { getToken } from './utils/secureStore';

// screens
import Home from './screens/home';
import Log from './screens/log';
import Project from './screens/project';
import Login from './screens/login';
import Register from './screens/register';
import { logout } from './common/logout';

const HomeStack = createNativeStackNavigator<RootStackParamList>();
const LoginStack = createNativeStackNavigator<LoginStackParamList>();

export default function App() {

    // const default_user: user = {name: 'Robert', username: 'testuser1'}
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    
    useEffect(() => {
        const setLoggedIn = async () => {
            const token = await getToken();
            if (token) setIsLoggedIn(true);
        }
        setLoggedIn();
    }, [])


    return (
        <NavigationContainer>
        <PaperProvider>
                <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>

                    {isLoggedIn ? 

                    <HomeStack.Navigator initialRouteName='Home'>
                        <HomeStack.Screen name='Home' component={Home} options={{title: 'Projects', headerRight: () => (<Button onPress={async () => {if (setIsLoggedIn) await logout(setIsLoggedIn)}} buttonColor="#000000" textColor='#ffffff'>Logout</Button>)}} />
                        <HomeStack.Screen name='Project' component={Project} options={{title: 'Project Details', headerRight: () => (<Button onPress={async () => {if (setIsLoggedIn) await logout(setIsLoggedIn)}} buttonColor="#000000" textColor='#ffffff'>Logout</Button>)}} />
                        <HomeStack.Screen name='Log' component={Log} options={{title: 'Log Details', headerRight: () => (<Button onPress={async () => {if (setIsLoggedIn) await logout(setIsLoggedIn)}} buttonColor="#000000" textColor='#ffffff'>Logout</Button>)}} />
                    </HomeStack.Navigator> :

                    <LoginStack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
                        <LoginStack.Screen name='Login' component={Login} options={{title: 'Login to BoreDM'}} />
                        <LoginStack.Screen name='Register' component={Register} options={{title: 'Register for BoreDM'}} />
                    </LoginStack.Navigator>}

                </LoginContext.Provider>
        </PaperProvider>
        </NavigationContainer>
    ); 
    }