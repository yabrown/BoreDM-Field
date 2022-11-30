import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {  } from 'react-native-paper'
import InputField from '../common/InputField';
import CustomButton from '../common/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginContext } from '../contexts/LoginContext';
import { saveToken } from '../utils/secureStore';
import * as env from '../env';

const LoginScreen = ({navigation}) => {

  const default_user: user = {name: 'Robert', username: 'testuser1'}
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [credentials, setCredentials] = useState({username: '', password: ''});
  

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30}}>
        <Image source={require('../assets/boredm_logo.png')} style={styles.image}/>
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Username'}
          icon={
            <Ionicons
            name="person-circle"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="default"
          setText={(text: string) => setCredentials({...credentials, username: text})}
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
          setText={(text: string) => setCredentials({...credentials, password: text})}
        />
        
        <CustomButton label={"Login"} onPress={async () => {
          try {
            const fetched = await fetch(`${env.PORT}/login`, 
              { method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
              },
            body: JSON.stringify({ username: credentials.username.toLocaleLowerCase().trim(), password: credentials.password })});

            if (fetched.ok) {
              const token = await fetched.json();
              await saveToken(token.token);
              if (setIsLoggedIn) setIsLoggedIn(true);
            }
            if (fetched.status === 401) {
              Alert.alert("Login Error", "Your username or password is incorrect. Please try again.")
            }
          }
          catch (err) {
            console.log(err);
          }
          }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#2600ff', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  image: {
      objectFit: 'cover',
      width: '100%',
      height: height / 9.0
  },
});

export default LoginScreen;