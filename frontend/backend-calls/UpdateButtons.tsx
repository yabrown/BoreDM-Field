import { HStack, Box, Flex, Spacer } from "@react-native-material/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState, useEffect } from 'react';
import { Button, Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import { PORT } from '../env';
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { logout } from "../common/logout";


// The component that deals with updating log data
const UpdateLog = ( {log, setModalVisible, refreshLogs, setLog}) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
    const refreshLog = async () => {
      try {
        const token = await getToken();
        const fetched = await fetch(`${PORT}/get_log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`
            },
            body: JSON.stringify({log_id: log.id})
        })
        if (fetched.ok) {
          const log = await fetched.json();
          console.log("log:", log)
          if (log) setLog(log);
        }
        else if (fetched.status === 401) {
          if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
        }
      } catch(error) {
              console.error('Error:', error);
          }
    }
    
    const onPress = async () => {
          setModalVisible(false)
          try {
            const token = await getToken();
            const fetched = await fetch(`${PORT}/update_log`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token : ''}`
                },
                body: JSON.stringify({log_id: log.id, log_name: log.name, driller: log.driller, logger: log.logger, notes: log.notes})
            })
            console.log("status:", fetched.status)

            if (fetched.ok) {
              await Promise.all[refreshLog(), refreshLogs()];
            }
  
            if (fetched.status === 401) {
              if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
            }
          } catch(error) {
                  console.error('Error:', error);
              }
      }
      return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Submit</PaperButton>);
  }


// The component that deals with updating a Sample
const UpdateSample = ( {sample, setModalVisible, refreshSamples}) => {

    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    const onPress = async () => {
        setModalVisible(false)
        try {
          let token = await getToken();
          let fetched = await fetch(`${PORT}/update_sample`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
              },
              body: JSON.stringify({sample_id: sample.id, start_depth: sample.start_depth, end_depth: sample.end_depth, length: sample.length, blows_1: sample.blows_1, blows_2: sample.blows_2, blows_3: sample.blows_3, blows_4: sample.blows_4, description: sample.description, refusal_length: sample.refusal_length, sampler_type: sample.sampler_type})
          })
          console.log("status:", fetched.status)

          if (fetched.ok) {
            await refreshSamples();
          }
          else if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          }
          }
            catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Update</PaperButton>);
}


// The component that deals with updating a Classification
const UpdateRemark = ( {remark, setModalVisible, refreshRemarks}) => {

    console.log("Log id: " + remark.log_id + " startDepth: " + remark.startDepth + " Remark: " + remark.notes)
  
  
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
      const onPress = async () => {
          setModalVisible(false)
          try {
              const token = await getToken();
              const fetched = await fetch(`${PORT}/update_remark`, {
                  method: 'POST', // or 'PUT'
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token ? token : ''}`,
                  },
                  body: JSON.stringify({remark_id: remark.remark_id, start_depth:remark.startDepth, notes: remark.notes })
              })
  
              console.log("status:", fetched.status)
              if (fetched.ok) {
                await refreshRemarks();
              }
              else if (fetched.status === 401) {
                if (setIsLoggedIn) await logout(setIsLoggedIn);
              }
  
  
          } catch(error) {
                  console.error('Error:', error);
              }
      }
      return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Update</PaperButton>);
  }


// The component that deals with updating a Classification
const UpdateClassification = ({ classification, setModalVisible, refreshClassifications }) => {

    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
      const onPress = async () => {
          setModalVisible(false)
          try {
              const token = await getToken();
              let fetched = await fetch(`${PORT}/update_classification`, {
                  method: 'POST', // or 'PUT'
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token ? token : ''}`,
                  },
                  body: JSON.stringify({log_id: classification.log_id, start_depth: classification.start_depth, end_depth: classification.end_depth, uscs: classification.uscs, color: classification.color, moisture: classification.moisture, density: classification.density, hardness: classification.hardness })
              })

              if (fetched.ok) {
                await refreshClassifications();
              }
              else if (fetched.status === 401) {
                if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
              }
  
          } catch(error) {
                  console.error('Error:', error);
              }
      }
      return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Update</PaperButton>);
  }


// The component that deals with the adding a new project
const UpdateProject = ({ project, setModalVisible, updateProject }) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
      const onPress = async () => {
          setModalVisible(false)
          try {
            const token = await getToken();
              let fetched = await fetch(`${PORT}/update_project`, {
                  method: 'POST', // or 'PUT'
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token ? token : ''}`
                  },
                  body: JSON.stringify({project_id: project.id, project_name: project.name, client_name: project.client, project_location: project.location, project_notes: project.notes})
              })
              if (fetched.ok) await updateProject();
              else if (fetched.status === 401) {
                if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
              } 
          } catch(error) {
                  console.error('Error:', error);
              }
      }
      return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Submit</PaperButton>);
    }
  

  export {
    UpdateProject,
    UpdateLog,
    UpdateSample,
    UpdateClassification,
    UpdateRemark
  }