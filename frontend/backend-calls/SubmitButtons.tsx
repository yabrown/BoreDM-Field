import React, { useContext, useState } from 'react';
import { ActivityIndicator, Button as PaperButton } from 'react-native-paper';
import { logout } from "../common/logout";
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { PORT } from '../env';
import { showMessage, hideMessage } from "react-native-flash-message";

/////////////////////////////////// CLASSIFICATION //////////////////////////////////////////////////
const SubmitClassification = ({ setStartDepthError, setEndDepthError, classification, hideDialog, refreshClassifications }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  let start = classification.start_depth;
  let end = classification.end_depth;
  const onPress = async () => {
    if(!isNaN(start) && !isNaN(end)) {
      if(classification.end_depth <= classification.start_depth) {
        setStartDepthError(true);
        setEndDepthError(true);
      }
      else {
        hideDialog()
        try {
            const token = await getToken();
            const fetched = await fetch(`${PORT}/add_classification`, {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`
              },
              body: JSON.stringify(classification)
            })
            console.log('status:', fetched.status);
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
      setStartDepthError(true);
      setEndDepthError(true);
    }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={async () => {await onPress()}}>Create</PaperButton>);
}

/////////////////////////////////// REMARK //////////////////////////////////////////////////
const SubmitRemark = ({ setStartDepthError, setRemarkError, remark, hideDialog, refreshRemarks }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  const onPress = async () => {
    if(!isNaN(remark.start_depth) && remark.notes != "") {
      hideDialog()
      try {
          const token = await getToken();
          const fetched = await fetch(`${PORT}/add_remark`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
                  
              },
              body: JSON.stringify({...remark})
          })
          console.log('status:', fetched.status);
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
      if (isNaN(remark.start_depth)) setStartDepthError(true); else setStartDepthError(false)
      if (remark.notes == "") setRemarkError(true); else setRemarkError(false)
    }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Create</PaperButton>);
}

/////////////////////////////////// SAMPLE //////////////////////////////////////////////////
const SubmitSample = ({ setStartDepthError, setLengthError, setSamplerError, sample, setVisible, refreshSamples, setSample }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const onPress = async () => {
    if(!isNaN(sample.start_depth) && !isNaN(sample.length) && sample.sampler_type != "") {
      setVisible(false)
        try {
          const token = await getToken();
          const fetched = await fetch(`${PORT}/add_sample`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
              },
              body: JSON.stringify(sample)
          })
            console.log('status:', fetched.status);
            if (fetched.ok) {
              await refreshSamples();
            }
            else if (fetched.status === 401) {
              if (setIsLoggedIn) await logout(setIsLoggedIn);
            }
            // clear the sample
            setSample({ name: "", classification_id: NaN, remark_id: NaN, notes: "" });

        } catch(error) {
                console.error('Error:', error);
          }
    }
    else {
      setStartDepthError(false);
      setLengthError(false);
      setSamplerError(false);
      if (isNaN(sample.start_depth)) setStartDepthError(true);
      if (isNaN(sample.start_depth)) setLengthError(true);
      if (sample.sampler_type == "") setSamplerError(true);
    }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={async () => {await onPress()}}>Create</PaperButton>);
}



/////////////////////////////////// LOG //////////////////////////////////////////////////
const SubmitLog = ( { log, setModalVisible, getLogs, setLogText, setNameError }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  // STEP 1: create a state variable to hold the loading state
  const [isLoading, setIsLoading] = useState(false);

  // STEP 2: create a function that will set the state after a promise resolves
  const asyncSetIsLoading = async (newState: boolean) => {
    Promise.resolve().then(_ => setIsLoading(newState));
  }

    let newLogID = -1;

    const onPress = async () => {
      if(log.name == "") {
        setNameError(true);
      }
      else {
        try {
          // STEP 3: set the loading state to true before fetching
          setIsLoading(true);
          const token = await getToken();
          const fetched = await fetch(`${PORT}/add_boring_to_project`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`
            },
            body: JSON.stringify({ ...log, project_id: log.project_id })
          })
          if (fetched.ok) {
            newLogID = await fetched.json();
            // STEP 4: set the loading state to false after fetching
            await getLogs();
            await asyncSetIsLoading(false);
            showMessage({
              message: "Project succesfully added!",
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
        } catch(error) {
          // STEP 6: if error, show relevant message
          showMessage({
            message: "Error adding project",
            description: "Please try again later.",
            type: "danger",
          });
          console.log("Error:", error);
        } finally {
          // STEP 7: set the loading state to false after fetching and close modal
          setIsLoading(false);
          setModalVisible(false);

          // STEP 8: clear the log at the end
          setLogText({ name: "", drilled: "", logged: "", notes: "" }); 
        }
  
        // set up water table
        try {
          const token = await getToken();
          const fetched = await fetch(`${PORT}/add_water_encounter`, {
              method: 'POST', // or 'PUT'
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token ? token : ''}`
              },
              body: JSON.stringify({ log_id: newLogID })
          })
          console.log("Fetched status: " + fetched.status)
          if (fetched.status === 401) {
            if (setIsLoggedIn) await logout(setIsLoggedIn);
          } 
        } catch(error) {
            console.error('Error:', error);
        }
      }
    }

    // STEP 8: return the loading icon while loading and otherwise the button using a ternary operator
    return (!isLoading ? <PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Create</PaperButton> : <ActivityIndicator animating={true} size="large" color="#0000ff" />);
  }

/////////////////////////////////// PROJECT //////////////////////////////////////////////////
type SubmitProps = { project: { name: string, client: string, location: string, notes: string }, setvis: React.Dispatch<React.SetStateAction<boolean>>, onUpdate: () => void, setNameError: React.Dispatch<React.SetStateAction<boolean>>}

const SubmitProject = ( { project, setvis, onUpdate, setNameError } : SubmitProps ) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const onPress = async () => {

    if(project.name == "") {
      setNameError(true);
    }
    else {
      setvis(false)
      try {
        const token = await getToken();
        const fetched = await fetch(`${PORT}/add_project`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token ? token : ''}`
          },
          body: JSON.stringify({project_name: project.name, client_name: project.client, project_location: project.location, project_notes: project.notes})
        })
        onUpdate();
        console.log("status:", fetched.status)

        if (fetched.status === 401) {
          if (setIsLoggedIn) await logout(setIsLoggedIn);
        } 
        
    } catch(error) {
            console.error('Error:', error);
        }
    }
  }

  return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Create</PaperButton>);
}

export {
  SubmitProject,
  SubmitLog,
  SubmitSample,
  SubmitClassification, 
  SubmitRemark
};
