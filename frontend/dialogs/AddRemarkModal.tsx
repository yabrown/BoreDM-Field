import React, { useState } from 'react';
import { ScrollView, View } from "react-native";
import { Button as PaperButton, Dialog, Portal, TextInput } from 'react-native-paper';
import SubmitRemark from "./SubmitRemark"

const AddClassificationModal = ({ log_id, refreshRemarks }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // The default classificatin has everything empty except for log_id, which must is set by a param to this function
  const remark: remark = { log_id: log_id, start_depth: NaN, notes: "" }
  const [remarkContent, setRemarkContent] = useState(remark);

  return (
    <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Remark</PaperButton>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Add Remark</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <TextInput value={isNaN(remarkContent.start_depth) ? "": String(remarkContent.start_depth)} label="Start Depth" mode="outlined" onChangeText={(text) => setRemarkContent({...remarkContent, start_depth: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={String(remarkContent.notes)}  multiline label="Remark" mode="outlined" onChangeText={(text) => setRemarkContent({...remarkContent, notes: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <SubmitRemark remark={remarkContent} hideDialog={hideDialog} refreshRemarks={refreshRemarks}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default AddClassificationModal;