import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import * as env from '../env';

import { LoginContext } from '../contexts/LoginContext';

import InputField from '../common/InputField';
import CustomButton from '../common/CustomButton';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getToken } from '../utils/secureStore';

const RegisterScreen = ({navigation}) => {

  const default_user: user = {name: 'Robert', username: 'testuser1'}
  // const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [credentials, setCredentials] = useState({ name: '', username: '', password: '', confirmPassword: '' });

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{marginTop:120, marginBottom:50}}>
        <Image source={require('../assets/boredm_logo.png')} style={styles.image}/>
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          setText={(text) => {setCredentials({...credentials, name: text})}}
          autoCorrect={false}
          autoCapitalize="words"
        />

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
          keyboardType="email-address"
          setText={(text) => {setCredentials({...credentials, username: text})}}
          autoCorrect={false}
          autoCapitalize="none"
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
          setText={(text) => {setCredentials({...credentials, password: text})}}
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <MaterialIcons
              name="verified-user"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          setText={(text) => {setCredentials({...credentials, confirmPassword: text})}}
        />

        <CustomButton label={'Register'} onPress={async () => {
          if (credentials.name.split(" ").length < 2) {
            Alert.alert('Name too short', 'You must include both first and last name');
          }
          else if (credentials.username.trim().toLowerCase().length < 8) {
            Alert.alert('Username too short', 'Username must be at least eight characters');
          }
          else if (credentials.username.trim().includes(' ')) {
            Alert.alert('Username includes spaces', 'Username cannot include spaces');
          }
          else if (credentials.password.length < 8) {
            Alert.alert('Password too short', 'Password must be at least eight characters');
          }
          else if (credentials.password !== credentials.confirmPassword) {
            Alert.alert('Passwords do not match');
          }
          else {
            try {
              const fetched = await fetch(`${env.PORT}/register`, 
                { method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                },
              body: JSON.stringify({ username: credentials.username.toLowerCase().trim(), password: credentials.password })});

              if (fetched.ok) {
                Alert.alert("Succesfully registered!");
                navigation.navigate('Login');
              }
              else if (fetched.status === 409) {
                Alert.alert("Username Already Exists", "The username is taken. Please try again");
              }
              else {
                Alert.alert(`${fetched.status} status code received. Please try again.`);
              }
            }
            catch (err) {
              console.error(err);
            }
          }}
          } />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#2600ff', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  image: {
      width: '90%',
      height: height / 9.0,
      alignSelf: 'center'
  },
});

export default RegisterScreen;