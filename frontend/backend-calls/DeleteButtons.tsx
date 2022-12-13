import { HStack, Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState, useEffect } from 'react';
import { Button, Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import { PORT } from '../env';
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { logout } from "../common/logout";

// The component that deals with the adding a new project
const DeleteLog = ({ log, setModalVisible, navigation, refreshLogs }) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
    const onPress = async () => {
        setModalVisible(false)
        try {
          const token = await getToken();
          const fetched = await fetch(`${PORT}/delete_log`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
              },
              body: JSON.stringify({log_id: log.id})
          })
          if (fetched.ok) {
            await refreshLogs();
            navigation.navigate('Home')
          }
          else if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          }
        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "red" }} onPress={async () => await onPress()}>Delete</PaperButton>);
  }

  // The component that deals with the adding a new project
const DeleteSample = ({ sample, setModalVisible, refreshSamples }) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
    const onPress = async () => {
        setModalVisible(false)
        try {
          const token = await getToken();
            let fetched = await fetch(`${PORT}/delete_sample`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token : ''}`
                },
                body: JSON.stringify({sample_id: sample.id})
            })
            console.log("status:", fetched.status)
            if (fetched.ok) {
              await refreshSamples();
            }
            else if (fetched.status === 401) {
              if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
            }             
        } catch(error) {
              console.log("Problem")
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "red" }} onPress={async () => await onPress()}>Delete</PaperButton>);
  }


// The component that deals with the adding a new project
const DeleteRemark = ({ remark, setModalVisible, refreshRemarks }) => {
  
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const onPress = async () => {
  
        setModalVisible(false)
        try {
          const token = await getToken();
          let fetched = await fetch(`${PORT}/delete_remark`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`,
              },
              body: JSON.stringify({remark_id: remark.id})
          })
          console.log("status:", fetched.status)
          if (fetched.ok) {
            await refreshRemarks();
          }
          else if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
        } 
      }
        catch(error) {
              console.log("Problem")
                console.error('Error:', error);
            }
          }
    return (<PaperButton labelStyle={{color: "red" }} onPress={async () => await onPress()}>Delete</PaperButton>);
  }


// The component that deals with the adding a new project
const DeleteClassification = ({ classification, setModalVisible, refreshClassifications }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const onPress = async () => {

      setModalVisible(false)
      try {
        const token = await getToken();
        let fetched = await fetch(`${PORT}/delete_classification`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`,
            },
            body: JSON.stringify({classification_id: classification.id})
        })
        console.log("status:", fetched.status)
        if (fetched.ok) {
          await refreshClassifications();
        }
        else if (fetched.status === 401) {
          if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);

        console.log("status:", fetched.status)
        await refreshClassifications()
      }
    }
      catch(error) {
            console.log("Problem")
              console.error('Error:', error);
          }
        }
  return (<PaperButton labelStyle={{color: "red" }} onPress={async () => await onPress()}>Delete</PaperButton>);
}

  // The component that deals with the adding a new project
  const DeleteProject = ({ project, setModalVisible, navigation, updateProjectList }) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
    const onPress = async () => {
        setModalVisible(false)
        try {
          const token = await getToken();
            let fetched = await fetch(`${PORT}/delete_project`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token : ''}`
                },
                body: JSON.stringify({project_id: project.id})
            })
            console.log("status:", fetched.status)
            if (fetched.ok) {
              await updateProjectList();
              navigation.navigate('Home');
            }
            else if (fetched.status === 401) {
              if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
            }
              
        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "red" }} onPress={async () => await onPress()}>Delete</PaperButton>);
  }

  

  export {
    DeleteProject,
    DeleteLog,
    DeleteSample,
    DeleteClassification,
    DeleteRemark
  }