import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button as PaperButton, Dialog, Portal, TextInput, List } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { DeleteSample } from '../backend-calls/DeleteButtons';
import { UpdateSample } from '../backend-calls/UpdateButtons';

const SelectSampleButton = ({ sample, refreshSamples }: {sample: sample, refreshSamples: () => Promise<void>}) => {

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [currSample, setSample] = useState(sample)

  const [startDepthError, setStartDepthError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [samplerError, setSamplerError] = useState(false);

  let sampler_text = ""
  if(sample.sampler_type !== null) sampler_text += sample.sampler_type;

  let blows_text = "";
  if(sample.blows_1 !== null) {
    if(sample.sampler_type !== null) blows_text += ", ";
    blows_text += sample.blows_1;
    if(sample.blows_2 !== null) {
      blows_text += "-" + sample.blows_2;
      if(sample.blows_3 !== null) {
        blows_text += "-" + sample.blows_3;
        if(sample.blows_4 !== null) {
          blows_text += "-" + sample.blows_3;
        }
      }
    }
  }

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
    <List.Item title={sample.start_depth + "': " + sampler_text + blows_text} onPress={showDialog} style={liststyle.listitem} titleNumberOfLines={5}/>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Sample Data</Dialog.Title>
          <Dialog.Content>
            <View>
              <TextInput error={startDepthError} value={!currSample.start_depth || isNaN(currSample.start_depth) ? "": String(currSample.start_depth)} label="Start Depth (ft) *" mode="outlined" maxLength={8} onChangeText={(text) => setSample({ ...currSample, start_depth: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput error={lengthError} value={!currSample.length || isNaN(currSample.length) ? "": String(currSample.length)} label="Sample Length (in.) *" mode="outlined" maxLength={8} onChangeText={(text) => setSample({ ...currSample, length: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput multiline error={samplerError} value={currSample.sampler_type} label="Sampler Type *" mode="outlined" maxLength={256} onChangeText={(text) => setSample({...currSample, sampler_type: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={!currSample.blows_1 || isNaN(currSample.blows_1) ? "": String(currSample.blows_1)} label="Blows 1" mode="outlined" maxLength={8} onChangeText={(text) => setSample({ ...currSample, blows_1: Number(text) })} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={!currSample.blows_2 || isNaN(currSample.blows_2) ? "": String(currSample.blows_2)} label="Blows 2" mode="outlined" maxLength={8} onChangeText={(text) => setSample({...currSample, blows_2: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={!currSample.blows_3 || isNaN(currSample.blows_3) ? "": String(currSample.blows_3)} label="Blows 3" mode="outlined" maxLength={8} onChangeText={(text) => setSample({...currSample, blows_3: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={!currSample.blows_4 || isNaN(currSample.blows_4) ? "": String(currSample.blows_4)} label="Blows 4" mode="outlined" maxLength={8} onChangeText={(text) => setSample({...currSample, blows_4: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput multiline value={currSample.description} label="Description" mode="outlined" maxLength={1024} onChangeText={(text) => setSample({...currSample, description: text})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={!currSample.refusal_length || isNaN(currSample.refusal_length) ? "": String(currSample.refusal_length)} label="Refusal Length" mode="outlined" maxLength={8} onChangeText={(text) => setSample({...sample, refusal_length: Number(text)})} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <DeleteSample setModalVisible={setVisible} sample={sample} refreshSamples={refreshSamples} />
            <UpdateSample setStartDepthError={setStartDepthError} setLengthError={setLengthError} setSamplerError={setSamplerError} setModalVisible={setVisible} refreshSamples={refreshSamples} sample={currSample}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};




const SelectSampleList = ({ id, samplesList, refreshSamples }) => {

  // the data state will eventually be filled with array of log types
  //const [data, setData] = useState<void>()

  return(
    <View style={{height: "90%"}}>
      <Text style={{marginLeft: '6%', fontSize: 24, fontWeight: '500',  marginBottom: '5%'}}>Samples</Text>
        <ScrollView style={styles.scrollView}>
            {samplesList.map(sample => (
                <SelectSampleButton sample={sample} key={uuid()} refreshSamples={refreshSamples}/>
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
    borderColor: 'red',
  },
  scrollView: {
    borderWidth: showViews,
    borderColor: 'red',
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

});

export default SelectSampleList;
