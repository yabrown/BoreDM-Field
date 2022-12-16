import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import {DeleteRemark} from "../backend-calls/DeleteButtons"
import { UpdateRemark} from '../backend-calls/UpdateButtons';

const SelectRemarkButton = ({ remark, refreshRemarks }) => {

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [startDepth, setStartDepth] = useState(parseFloat(remark.start_depth));
  const [notes, setNotes] = useState(remark.notes);

  // Validation
  const [startDepthError, setStartDepthError] = useState(false);
  const [remarkError, setRemarkError] = useState(false);

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
    <List.Item title={remark.start_depth + "': " + remark.notes} onPress={showDialog} style={liststyle.listitem} titleNumberOfLines={5}/>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Remark</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <TextInput error={startDepthError} value={String(startDepth)} label="Start Depth *" mode="outlined" onChangeText={(text) => setStartDepth(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput error={remarkError} value={notes} label="Remark *" mode="outlined" onChangeText={(text) => setNotes(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} multiline onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <DeleteRemark setModalVisible={setVisible} remark={remark} refreshRemarks={refreshRemarks}/>
            <UpdateRemark setStartDepthError={setStartDepthError} setRemarkError={setRemarkError} setModalVisible={setVisible} remark={{remark_id: remark.id, log_id: remark.log_id, startDepth, notes }} refreshRemarks={refreshRemarks}/>
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
