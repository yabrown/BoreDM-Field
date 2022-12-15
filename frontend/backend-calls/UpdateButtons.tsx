import React, { useContext, useState } from 'react';
import { ActivityIndicator, Button as PaperButton } from 'react-native-paper';
import { PORT } from '../env';
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { logout } from "../common/logout";
import { showMessage } from "react-native-flash-message";


// The component that deals with updating log data
const UpdateLog = ( {log, setModalVisible, refreshLogs, setLog, setNameError}) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
    // STEP 1: create a state variable to hold the loading state
  const [isLoading, setIsLoading] = useState(false);

  // STEP 2: create a function that will set the state after a promise resolves
  const asyncSetIsLoading = async (newState: boolean) => {
    Promise.resolve().then(_ => setIsLoading(newState));
  }

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
        if (setIsLoggedIn) await logout(setIsLoggedIn);
      }
    } catch(error) {
        console.error('Error:', error);
    }
  }
  
  const onPress = async () => {
    if(log.name == "") {
      setNameError(true);
    }
    else{
      try {
        // STEP 3: set the loading state to true before fetching
        setIsLoading(true);

        const token = await getToken();
        const fetched = await fetch(`${PORT}/update_log`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`
            },
            body: JSON.stringify({log_id: log.id, log_name: log.name, driller: log.driller, logger: log.logger, notes: log.notes, latitude: log.latitude, longitude: log.longitude})
        })
        console.log("status:", fetched.status)

        if (fetched.ok) {
          await Promise.all[refreshLog(), refreshLogs()];
          await asyncSetIsLoading(false);
            showMessage({
              message: "Log succesfully updated!",
              type: "success",
          });
        }

        if (fetched.status === 401) {
          // STEP 5: if unauthorized, show relevant message
          showMessage({
            message: "You are unauthorized, signing out.",
            type: "danger",
          });
          if (setIsLoggedIn) await logout(setIsLoggedIn);
        }
      } catch(error) {
          console.error('Error:', error);
      }
      finally {
        // STEP 7: set the loading state to false after fetching and close modal
        setIsLoading(false);
        setModalVisible(false);
        refreshLogs();
        refreshLog();
      }
    }
  }
  return (!isLoading ? <PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Submit</PaperButton> : <ActivityIndicator animating={true} size="large" color="#0000ff" />);
}


// The component that deals with updating a Sample
const UpdateSample = ( {setStartDepthError, setLengthError, setSamplerError, sample, setModalVisible, refreshSamples}) => {

    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    // STEP 1: create a state variable to hold the loading state
    const [isLoading, setIsLoading] = useState(false);

    // STEP 2: create a function that will set the state after a promise resolves
    const asyncSetIsLoading = async (newState: boolean) => {
      Promise.resolve().then(_ => setIsLoading(newState));
    }

    const onPress = async () => {
      if(sample.start_depth != "" && sample.length != "" && sample.sampler_type != "") {
        setModalVisible(false)
        try {
          // STEP 3: set the loading state to true before fetching
          setIsLoading(true);

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
            await asyncSetIsLoading(false);
            showMessage({
              message: "Sample succesfully updated!",
              type: "success",
            });
          }
          else if (fetched.status === 401) {
            // STEP 5: if unauthorized, show relevant message
            showMessage({
              message: "You are unauthorized, signing out.",
              type: "danger",
            });
            if (setIsLoggedIn) await logout(setIsLoggedIn);
          }
          }
        catch(error) {
            console.error('Error:', error);
        }
        finally {
          // STEP 7: set the loading state to false after fetching and close modal
          setIsLoading(false);
          setModalVisible(false);
          refreshSamples();
        }
      }
      else {
        setStartDepthError(false);
        setLengthError(false);
        setSamplerError(false);
        if (sample.start_depth == "") setStartDepthError(true);
        if (sample.length == "") setLengthError(true);
        if (sample.sampler_type == "") setSamplerError(true);
      }
    }
    return (!isLoading ? <PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Update</PaperButton>  : <ActivityIndicator animating={true} size="large" color="#0000ff" />);
}


// The component that deals with updating a Classification
const UpdateRemark = ( {setStartDepthError, setRemarkError, remark, setModalVisible, refreshRemarks}) => {

    console.log("Log id: " + remark.log_id + " startDepth: " + remark.startDepth + " Remark: " + remark.notes)
  
  
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    let depth = parseFloat(remark.startDepth);
  
    const onPress = async () => {
      if(!isNaN(depth) && remark.notes != "") {
        setModalVisible(false)
        try {
          const token = await getToken();
          const fetched = await fetch(`${PORT}/update_remark`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`,
              },
              body: JSON.stringify({remark_id: remark.remark_id, start_depth:depth, notes: remark.notes })
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
      else {
        setStartDepthError(false);
        setRemarkError(false);
        if (isNaN(depth)) setStartDepthError(true);
        if (remark.notes == "") setRemarkError(true);
      }
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Update</PaperButton>);
  }


// The component that deals with updating a Classification
const UpdateClassification = ({ setStartDepthError, setEndDepthError, classification, setModalVisible, refreshClassifications }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const onPress = async () => {
    if(!isNaN(classification.start_depth) && !isNaN(classification.end_depth)) {
      if(Number(classification.end_depth) <= Number(classification.start_depth)) {
        console.log("Overlap issue");
        setStartDepthError(true);
        setEndDepthError(true);
      }
      else {
        setModalVisible(false)
        try {
          const token = await getToken();
          const fetched = await fetch(`${PORT}/update_classification`, {
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
            if (setIsLoggedIn) await logout(setIsLoggedIn);
          }
        } catch(error) {
                console.error('Error:', error);
            }
        }
      }
    else {
      console.log("At least one is nan");
      setStartDepthError(false);
      setEndDepthError(false);
      if(isNaN(classification.start_depth)) setStartDepthError(true);
      if(isNaN(classification.end_depth)) setEndDepthError(true);
    }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Update</PaperButton>);
}


// The component that deals with the adding a new project
const UpdateProject = ({ project, setModalVisible, updateProject, setNameError }) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

      const onPress = async () => {
        if(project.name == "") {
          setNameError(true);
        }
    
        else {
          setModalVisible(false)
          try {
            const token = await getToken();
              const fetched = await fetch(`${PORT}/update_project`, {
                  method: 'POST', // or 'PUT'
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token ? token : ''}`
                  },
                  body: JSON.stringify({project_id: project.id, project_name: project.name, client_name: project.client, project_location: project.location, project_notes: project.notes})
              })
              if (fetched.ok) await updateProject();
              else if (fetched.status === 401) {
                if (setIsLoggedIn) await logout(setIsLoggedIn);
              } 
          } catch(error) {
              console.error('Error:', error);
            }
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