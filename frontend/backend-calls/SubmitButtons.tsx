import React, { useContext } from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { logout } from "../common/logout";
import { getToken } from "../utils/secureStore";
import { LoginContext } from "../contexts/LoginContext";
import { PORT } from '../env';

/////////////////////////////////// CLASSIFICATION //////////////////////////////////////////////////
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
            await refreshClassifications();
          }
          else if (fetched.status === 401) {
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          }
      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={async () => {await onPress()}}>Create</PaperButton>);
}

/////////////////////////////////// REMARK //////////////////////////////////////////////////
const SubmitRemark = ({ remark, hideDialog, refreshRemarks }) => {

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  const onPress = async () => {
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
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          }
      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Create</PaperButton>);
}

/////////////////////////////////// SAMPLE //////////////////////////////////////////////////
const SubmitSample = ({ sample, setVisible, refreshSamples }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const onPress = async () => {
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
            if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          }

      } catch(error) {
              console.error('Error:', error);
          }
  }
  return (<PaperButton labelStyle={{color: "black" }} onPress={async () => {await onPress()}}>Create</PaperButton>);
}



/////////////////////////////////// LOG //////////////////////////////////////////////////
const SubmitLog = ( { log, setModalVisible, getLogs, setLogText }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

    let newLogID = -1;

    const onPress = async () => {
      setModalVisible(false)
      try {
        const token = await getToken();
        const fetched = await fetch(`${PORT}/add_boring_to_project`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token ? token : ''}`
            },
            body: JSON.stringify({ ...log, project_id: log.project_id })
        })
        newLogID =  await fetched.json();
        if (fetched.status === 401) {
          if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
        } 
      } catch(error) {
          console.error('Error:', error);
      }
      await getLogs();
      setLogText({ name: "", drilled: "", logged: "", notes: "" })

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
          if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
        } 
      } catch(error) {
          console.error('Error:', error);
      }
    }

    return (<PaperButton labelStyle={{color: "black" }} onPress={async () => await onPress()}>Create</PaperButton>);
  }

/////////////////////////////////// PROJECT //////////////////////////////////////////////////
type SubmitProps = { project: { name: string, client: string, location: string, notes: string }, setvis: React.Dispatch<React.SetStateAction<boolean>>, onUpdate: () => void}

const SubmitProject = ( { project, setvis, onUpdate } : SubmitProps ) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const onPress = async () => {
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
          if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
        } 
        
    } catch(error) {
            console.error('Error:', error);
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
