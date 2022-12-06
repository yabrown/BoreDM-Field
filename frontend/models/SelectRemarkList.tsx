import { HStack, ListItem } from "@react-native-material/core";
import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { logout } from "../common/logout";
import { LoginContext } from "../contexts/LoginContext";
import { PORT } from '../env';
import { getToken, saveToken } from "../utils/secureStore";

// const SelectButton = ({ current, buttonOption, setFunction, color, highlightedColor="lightgrey" }) => (  
//   <View style={{ minWidth: 140, margin: 4 }}>
//     <Button
//       style={{borderColor: color }}
//       buttonColor={current===buttonOption ? highlightedColor : color}
//       textColor='black'
//       mode='outlined'
//       onPress={
//         () => {
//           setFunction(buttonOption);
//         }
//       }
//     >
//       { buttonOption }
//     </Button>
//   </View>
// );

const SelectRemarkButton = ({ remark, refreshRemarks }) => {

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [startDepth, setStartDepth] = useState(remark.start_depth);
  const [notes, setNotes] = useState(remark.notes);

  return(
    <View>
    <ListItem title={startDepth + "': " + notes} onPress={showDialog}/>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Remark</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <TextInput value={startDepth} label="Start Depth" mode="outlined" onChangeText={(text) => setStartDepth(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={notes} label="Remarks" mode="outlined" onChangeText={(text) => setNotes(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} multiline onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <DeleteRemark setModalVisible={setVisible} remark={remark} refreshRemarks={refreshRemarks}/>
            <UpdateRemark setModalVisible={setVisible} remark={{log_id: remark.log_id, startDepth, notes }}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

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

        if (fetched.status === 401) {
          if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
          
        console.log("status:", fetched.status)
        refreshRemarks()
      } 
    }
      catch(error) {
            console.log("Problem")
              console.error('Error:', error);
          }
        }
  return (<PaperButton labelStyle={{color: "red" }} onPress={onPress}>Delete</PaperButton>);
}

// The component that deals with updating a Classification
const UpdateRemark = ( {remark, setModalVisible}) => {

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
                body: JSON.stringify({log_id: remark.log_id, notes: remark.notes })
            })

            if (fetched.status === 401) {
              if (isLoggedIn && setIsLoggedIn) await logout(setIsLoggedIn);
            }

            console.log("status:", fetched.status)

        } catch(error) {
                console.error('Error:', error);
            }
    }
    return (<PaperButton labelStyle={{color: "black" }} onPress={onPress}>Update</PaperButton>);
}

const SelectRemarksList = ({ id, remarks_list, refreshRemarks }) => {

  return(
      <View>
        <Text style={styles.remarkText}>Remarks</Text>
        <ScrollView style={styles.scrollView}>
            {remarks_list && remarks_list.map(remark => (
                <SelectRemarkButton remark={remark} key={uuid()} refreshRemarks={refreshRemarks}/>
            ))}
        </ScrollView>
      </View>
  )
}

const showViews = 0
const styles = StyleSheet.create({

  touchable: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: showViews,
    borderColor: 'red'
  },
  scrollView: {
    borderWidth: showViews,
    borderColor: 'red'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: showViews,
    borderColor: 'red'
  },
  remarkText: {
    marginLeft: 2, fontSize: 24, fontWeight: "500",
  }

});

export default SelectRemarksList;
