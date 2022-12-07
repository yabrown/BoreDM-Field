import { HStack } from "@react-native-material/core";
import React, { useState } from 'react';
import { ScrollView, View } from "react-native";
import { Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import SelectButton from "../dialogs/SelectButton";
import {SubmitClassification} from "../backend-calls/SubmitButtons"

const AddClassificationModal = ({ log_id, refreshClassifications }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // The default classificatin has everything empty except for log_id, which must is set by a param to this function
  const classification: classification = { log_id: log_id, start_depth: NaN, end_depth: NaN, uscs: '', color: '', moisture: '', density: '', hardness: ''}
  const [start_depth, setStartDepth] = useState(classification.start_depth);
  const [end_depth, setEndDepth] = useState(classification.end_depth);
  const [uscs, setUSCS] = useState(classification.uscs);
  const [color, setColor] = useState(classification.color);
  const [moisture, setMoisture] = useState(classification.moisture);
  const [density, setDensity] = useState(classification.density);
  const [hardness, setHardness] = useState(classification.hardness);

  return (
    <View>
      <PaperButton onPress={showDialog} mode="elevated" style={{backgroundColor:"black"}} labelStyle={{fontSize: 18, color: "white" }}>+ Classification</PaperButton>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Classification Data</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <TextInput value={isNaN(start_depth) ? "": String(start_depth)} label="Start Depth" mode="outlined" onChangeText={(text) => setStartDepth(Number(text))} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={isNaN(end_depth) ? "": String(end_depth)} label="End Depth" mode="outlined" onChangeText={(text) => setEndDepth(Number(text))} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <List.Accordion title="USCS" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="CH" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="CL" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="CL-ML" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GC-GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GP" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GP-GC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GP-GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GW" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GW-GC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="GW-GM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="ML" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SC-SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SP" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SP-SC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SP-SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SW" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SW-SC" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="SW-SM" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="OH" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="OL" setFunction={setUSCS} current={uscs} color="white"/>
                  <SelectButton buttonOption="PT" setFunction={setUSCS} current={uscs} color="white"/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Color" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Black" current={color} setFunction={setColor} color={"#000000"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Brown 1" current={color} setFunction={setColor} color={"#3C312D"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Brown 2" current={color} setFunction={setColor} color={"#4B3E39"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Brown" current={color} setFunction={setColor} color={"#5C4B44"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Brown" current={color} setFunction={setColor} color={"#66534C"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Light Brown 1" current={color} setFunction={setColor} color={"#766058"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Light Brown 2" current={color} setFunction={setColor} color={"#886D63"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Light Brown 3" current={color} setFunction={setColor} color={"#9B8076"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Orange 1" current={color} setFunction={setColor} color={"#341B12"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Orange 2" current={color} setFunction={setColor} color={"#432317"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Dark Orange 3" current={color} setFunction={setColor} color={"#522B1D"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 1" current={color} setFunction={setColor} color={"#633423"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 2" current={color} setFunction={setColor} color={"#743E29"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 3" current={color} setFunction={setColor} color={"#8C4B32"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 4" current={color} setFunction={setColor} color={"#A3563A"} highlightedColor={'white'}/>
                  <SelectButton buttonOption="Orange 5" current={color} setFunction={setColor} color={"#B86141"} highlightedColor={'white'}/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Moisture" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Dry" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Dry to Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Damp" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Damp to Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Moist to Wet" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Very Moist" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Very Moist to Wet" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Wet" setFunction={setMoisture} current={moisture} color="white"/>
                  <SelectButton buttonOption="Saturated" setFunction={setMoisture} current={moisture} color="white"/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Density" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Very Loose" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Loose" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Medium Dense" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Dense" setFunction={setDensity} current={density} color="white"/>
                  <SelectButton buttonOption="Very Dense" setFunction={setDensity} current={density} color="white"/>
                </HStack>
              </List.Accordion>
              <List.Accordion title="Hardness" id="1" theme={{colors: {background: 'white', primary: 'black'}}}>
                <HStack m={4} spacing={6} style={{ flexWrap: "wrap" }}>
                  <SelectButton buttonOption="Very Soft" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Soft" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Firm" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Stiff" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Very Stiff" setFunction={setHardness} current={hardness} color="white"/>
                  <SelectButton buttonOption="Hard" setFunction={setHardness} current={hardness} color="white"/>
                </HStack>
              </List.Accordion>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <SubmitClassification classification={{log_id, start_depth, end_depth, uscs, color, moisture, density, hardness}} hideDialog={hideDialog} refreshClassifications={refreshClassifications}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default AddClassificationModal;