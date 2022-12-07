import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import {DeleteRemark} from "../backend-calls/DeleteButtons"
import { UpdateRemark} from '../backend-calls/UpdateButtons';

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

  const liststyle = StyleSheet.create({
    listitem: {
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 5,
      margin: '3%'
    },
  });

  return(
    <View>
    <List.Item title={startDepth + "': " + notes} onPress={showDialog} style={liststyle.listitem} titleNumberOfLines={5}/>
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


const SelectRemarksList = ({ id, remarks_list, refreshRemarks }) => {

  return(
      <View>
        <Text style={[styles.remarkText, {marginBottom: '5%'}]}>Remarks</Text>
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
