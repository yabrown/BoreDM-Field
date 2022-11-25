import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { EXPO_CLIENT_ID, WEB_CLIENT_ID } from './env';
import Home from './screens/home';
import Log from './screens/log';
import Project from './screens/project';

const Stack = createNativeStackNavigator<RootStackParamList>();
WebBrowser.maybeCompleteAuthSession(); 

export default function App() {
    
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: EXPO_CLIENT_ID,
        // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: WEB_CLIENT_ID,
        });


  React.useEffect(() => {
    if (response?.type === 'success') {
    //   const { authentication } = response;
      console.log(response);
    //   console.log(authentication)
    }
  }, [response]);

//   return (
//     <Button
//       disabled={!request}
//       title="Login"
//       onPress={() => {
//         promptAsync();
//       }}
//     />
//   );

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