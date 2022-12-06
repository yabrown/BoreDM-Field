import React, { useContext } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { logout } from "../common/logout";
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { PORT } from '../env';

const SubmitClassification = ({ classification, hideDialog, refreshClassifications }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  const onPress = async () => {
    hideDialog()
      try {
          const token = await getToken();
          const fetched = await fetch(`${PORT}/add_classification`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
                  
              },
              body: JSON.stringify({...classification})
          })
          console.log('status:', fetched.status);
          if (fetched.ok) {
            refreshClassifications();
          }
          else if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          }
      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Create</PaperButton>);
}

export default SubmitClassification;