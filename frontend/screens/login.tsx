import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import InputField from '../common/InputField';
import CustomButton from '../common/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../contexts/UserContext';

const LoginScreen = ({navigation}) => {

  const default_user: user = {name: 'Robert', username: 'testuser1'}
  const {user, setUser} = useContext(UserContext);
  

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
        />
        
        <CustomButton label={"Login"} onPress={() => {setUser && setUser(default_user)}} />

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

const styles = StyleSheet.create({
  image: 
  { objectFit: 'cover',
    width: '100%',
    height: 60
}
})

export default LoginScreen;