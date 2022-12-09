import { HStack, Stack, ListItem } from "@react-native-material/core";
import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Button as PaperButton, Dialog, List, Portal, TextInput } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { logout } from "../common/logout";
import { LoginContext } from "../contexts/LoginContext";
import { PORT } from '../env';
import { getToken, saveToken } from "../utils/secureStore";
import { UpdateClassification } from "../backend-calls/UpdateButtons";
import { DeleteClassification } from "../backend-calls/DeleteButtons";
const SelectButton = ({ current, buttonOption, setFunction, color, highlightedColor="lightgrey" }) => (
  <View style={{ minWidth: 150, maxWidth: 150, margin: 5 }}>
    <Button
      style={{borderColor: "#696969" }}
      buttonColor={current===buttonOption ? highlightedColor : color}
      textColor='black'
      mode='outlined'
      onPress={
        () => {
          setFunction(buttonOption);
        }
      }
    >
      { buttonOption }
    </Button>
  </View>
);

const SelectColorButton = ({ current, buttonOption, setFunction, color, highlightedColor="red" }) => (
  <View style={{ minWidth: 50, maxWidth: 50, marginRight: "2.5%", marginTop: "1%" }}>
    <Button
      // style={{height: 60, borderWidth: 4,  borderColor: "black" }}
      style={current===color ? {height: 60, borderWidth: 8,  borderColor: "lightgrey"} : {height: 60 }}
      buttonColor={current===color ? color : color}
      mode={current===color ? "outlined" : "flat"}
      onPress={
        () => {
          setFunction(buttonOption);

        }
      }
    >
    </Button>
  </View>
);

const SelectClassificationButton = ({ classification, refreshClassifications }) => {

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  console.log("Reloaded log data");
  console.log(classification.start_depth);
  
  const [startDepth, setStartDepth] = useState(String(classification.start_depth));
  const [endDepth, setEndDepth] = useState(String(classification.end_depth));
  const [uscs, setUSCS] = useState(classification.uscs);
  const [color, setColor] = useState(classification.color);
  const [moisture, setMoisture] = useState(classification.moisture);
  const [density, setDensity] = useState(classification.density);
  const [hardness, setHardness] = useState(classification.hardness);

  let classification_title = startDepth + "'-" + endDepth + "' ";
  if(classification_title.length > 8) classification_title += "" + uscs;
  else classification_title += "\t" + uscs;

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
    <List.Item title={classification_title} onPress={showDialog} style={liststyle.listitem} titleNumberOfLines={5}/>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: "white" }}>
          <Dialog.Title>Edit Classification Data</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '80%'}}>
            <ScrollView>
              <TextInput value={startDepth} label="Start Depth" mode="outlined" onChangeText={(text) => setStartDepth(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <TextInput value={endDepth} label="End Depth" mode="outlined" onChangeText={(text) => setEndDepth(text)} style={{ backgroundColor: 'white', marginBottom: 4 }} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} cursorColor={undefined}/>
              <View style={{marginTop: "0.5%", marginBottom: "0.5%"}} >
                <List.Accordion title="USCS" id="1" theme={{colors: {background: '#f0f0f0', primary: 'black'}}}>
                  <HStack space={4} spacing={6} alignItems="center" justifyContent="center" style={{ flexWrap: "wrap" }}>
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
              </View>
              <View style={{marginTop: "0.5%", marginBottom: "0.5%"}} >
                <List.Accordion title="Color" id="1" theme={{colors: {background: '#f0f0f0', primary: 'black'}}}>
                  <Stack direction="row" space={10} alignItems="center" justifyContent="center" style={{ flexWrap: "wrap" }}>
                    <SelectColorButton buttonOption={"#fcf8f5"} current={color} setFunction={setColor} color={"#fcf8f5"} />
                    <SelectColorButton buttonOption={"#faf3ef"} current={color} setFunction={setColor} color={"#faf3ef"} />
                    <SelectColorButton buttonOption={"#f8efe8"} current={color} setFunction={setColor} color={"#f8efe8"} />
                    <SelectColorButton buttonOption={"#f6eae2"} current={color} setFunction={setColor} color={"#f6eae2"} />
                    <SelectColorButton buttonOption={"#f5e6dc"} current={color} setFunction={setColor} color={"#f5e6dc"} />
                    <SelectColorButton buttonOption={"#f3e1d5"} current={color} setFunction={setColor} color={"#f3e1d5"} />
                    <SelectColorButton buttonOption={"#f1ddcf"} current={color} setFunction={setColor} color={"#f1ddcf"} />
                    <SelectColorButton buttonOption={"#efd8c9"} current={color} setFunction={setColor} color={"#efd8c9"} />
                    <SelectColorButton buttonOption={"#edd4c2"} current={color} setFunction={setColor} color={"#edd4c2"} />
                    <SelectColorButton buttonOption={"#eccfb6"} current={color} setFunction={setColor} color={"#eccfb6"} />
                    <SelectColorButton buttonOption={"#eacbb5"} current={color} setFunction={setColor} color={"#eacbb5"} />
                    <SelectColorButton buttonOption={"#e8c6af"} current={color} setFunction={setColor} color={"#e8c6af"} />
                    <SelectColorButton buttonOption={"#e6c2a9"} current={color} setFunction={setColor} color={"#e6c2a9"} />
                    <SelectColorButton buttonOption={"#e4bda2"} current={color} setFunction={setColor} color={"#e4bda2"} />
                    <SelectColorButton buttonOption={"#e2b99c"} current={color} setFunction={setColor} color={"#e2b99c"} />
                    <SelectColorButton buttonOption={"#e1b496"} current={color} setFunction={setColor} color={"#e1b496"} />
                    <SelectColorButton buttonOption={"#dfb08f"} current={color} setFunction={setColor} color={"#dfb08f"} />
                    <SelectColorButton buttonOption={"#ddab89"} current={color} setFunction={setColor} color={"#ddab89"} />
                    <SelectColorButton buttonOption={"#dba783"} current={color} setFunction={setColor} color={"#dba783"} />
                    <SelectColorButton buttonOption={"#d9a27c"} current={color} setFunction={setColor} color={"#d9a27c"} />
                    <SelectColorButton buttonOption={"#d89e76"} current={color} setFunction={setColor} color={"#d89e76"} />
                    <SelectColorButton buttonOption={"#d69970"} current={color} setFunction={setColor} color={"#d69970"} />
                    <SelectColorButton buttonOption={"#d49569"} current={color} setFunction={setColor} color={"#d49569"} />
                    <SelectColorButton buttonOption={"#d29063"} current={color} setFunction={setColor} color={"#d29063"} />
                    <SelectColorButton buttonOption={"#d08c5d"} current={color} setFunction={setColor} color={"#d08c5d"} />
                    <SelectColorButton buttonOption={"#cf8756"} current={color} setFunction={setColor} color={"#cf8756"} />
                    <SelectColorButton buttonOption={"#cd8350"} current={color} setFunction={setColor} color={"#cd8350"} />
                    <SelectColorButton buttonOption={"#cb7e49"} current={color} setFunction={setColor} color={"#cb7e49"} />
                    <SelectColorButton buttonOption={"#c97a43"} current={color} setFunction={setColor} color={"#c97a43"} />
                    <SelectColorButton buttonOption={"#c7753d"} current={color} setFunction={setColor} color={"#c7753d"} />
                    <SelectColorButton buttonOption={"#c47138"} current={color} setFunction={setColor} color={"#c47138"} />
                    <SelectColorButton buttonOption={"#be6d36"} current={color} setFunction={setColor} color={"#be6d36"} />
                    <SelectColorButton buttonOption={"#b86a34"} current={color} setFunction={setColor} color={"#b86a34"} />
                    <SelectColorButton buttonOption={"#b16632"} current={color} setFunction={setColor} color={"#b16632"} />
                    <SelectColorButton buttonOption={"#ab6230"} current={color} setFunction={setColor} color={"#ab6230"} />
                    <SelectColorButton buttonOption={"#a55f2f"} current={color} setFunction={setColor} color={"#a55f2f"} />
                    <SelectColorButton buttonOption={"#9e5b2d"} current={color} setFunction={setColor} color={"#9e5b2d"} />
                    <SelectColorButton buttonOption={"#98572b"} current={color} setFunction={setColor} color={"#98572b"} />
                    <SelectColorButton buttonOption={"#925429"} current={color} setFunction={setColor} color={"#925429"} />
                    <SelectColorButton buttonOption={"#8b5027"} current={color} setFunction={setColor} color={"#8b5027"} />
                    <SelectColorButton buttonOption={"#854c25"} current={color} setFunction={setColor} color={"#854c25"} />
                    <SelectColorButton buttonOption={"#7f4924"} current={color} setFunction={setColor} color={"#7f4924"} />
                    <SelectColorButton buttonOption={"#784522"} current={color} setFunction={setColor} color={"#784522"} />
                    <SelectColorButton buttonOption={"#724120"} current={color} setFunction={setColor} color={"#724120"} />
                    <SelectColorButton buttonOption={"#6b3e1e"} current={color} setFunction={setColor} color={"#6b3e1e"} />
                    <SelectColorButton buttonOption={"#653a1c"} current={color} setFunction={setColor} color={"#653a1c"} />
                    <SelectColorButton buttonOption={"#5f361b"} current={color} setFunction={setColor} color={"#5f361b"} />
                    <SelectColorButton buttonOption={"#583319"} current={color} setFunction={setColor} color={"#583319"} />
                    <SelectColorButton buttonOption={"#522f17"} current={color} setFunction={setColor} color={"#522f17"} />
                    <SelectColorButton buttonOption={"#4c2b16"} current={color} setFunction={setColor} color={"#4c2b16"} />
                    <SelectColorButton buttonOption={"#452813"} current={color} setFunction={setColor} color={"#452813"} />
                    <SelectColorButton buttonOption={"#3f2412"} current={color} setFunction={setColor} color={"#3f2412"} />
                    <SelectColorButton buttonOption={"#392010"} current={color} setFunction={setColor} color={"#392010"} />
                    <SelectColorButton buttonOption={"#321d0e"} current={color} setFunction={setColor} color={"#321d0e"} />
                    <SelectColorButton buttonOption={"#2c190c"} current={color} setFunction={setColor} color={"#2c190c"} />
                    <SelectColorButton buttonOption={"#26150a"} current={color} setFunction={setColor} color={"#26150a"} />
                    <SelectColorButton buttonOption={"#1f1209"} current={color} setFunction={setColor} color={"#1f1209"} />
                    <SelectColorButton buttonOption={"#190e07"} current={color} setFunction={setColor} color={"#190e07"} />
                    <SelectColorButton buttonOption={"#130a05"} current={color} setFunction={setColor} color={"#130a05"} />
                    <SelectColorButton buttonOption={"#0c0703"} current={color} setFunction={setColor} color={"#0c0703"} />
                  </Stack>
                </List.Accordion>
              </View>
              <View style={{marginTop: "0.5%", marginBottom: "0.5%"}} >
                <List.Accordion title="Moisture" id="1" theme={{colors: {background: '#f0f0f0', primary: 'black'}}}>
                  <HStack space={4} alignItems="center" justifyContent="center" style={{ flexWrap: "wrap" }}>
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
              </View>
              <View style={{marginTop: "0.5%", marginBottom: "0.5%"}} >
                <List.Accordion title="Density" id="1" theme={{colors: {background: '#f0f0f0', primary: 'black'}}}>
                  <HStack space={4} alignItems="center" justifyContent="center" style={{ flexWrap: "wrap" }}>
                    <SelectButton buttonOption="Very Loose" setFunction={setDensity} current={density} color="white"/>
                    <SelectButton buttonOption="Loose" setFunction={setDensity} current={density} color="white"/>
                    <SelectButton buttonOption="Medium Dense" setFunction={setDensity} current={density} color="white"/>
                    <SelectButton buttonOption="Dense" setFunction={setDensity} current={density} color="white"/>
                    <SelectButton buttonOption="Very Dense" setFunction={setDensity} current={density} color="white"/>
                  </HStack>
                </List.Accordion>
              </View>
              <View style={{marginTop: "0.5%", marginBottom: "0.5%"}} >
                <List.Accordion title="Hardness" id="1" theme={{colors: {background: '#f0f0f0', primary: 'black'}}}>
                  <HStack space={4} alignItems="center" justifyContent="center" style={{ flexWrap: "wrap" }}>
                    <SelectButton buttonOption="Very Soft" setFunction={setHardness} current={hardness} color="white"/>
                    <SelectButton buttonOption="Soft" setFunction={setHardness} current={hardness} color="white"/>
                    <SelectButton buttonOption="Firm" setFunction={setHardness} current={hardness} color="white"/>
                    <SelectButton buttonOption="Stiff" setFunction={setHardness} current={hardness} color="white"/>
                    <SelectButton buttonOption="Very Stiff" setFunction={setHardness} current={hardness} color="white"/>
                    <SelectButton buttonOption="Hard" setFunction={setHardness} current={hardness} color="white"/>
                  </HStack>
                </List.Accordion>
              </View>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={{color: "black" }}>Cancel</PaperButton>
            <DeleteClassification setModalVisible={setVisible} classification={classification} refreshClassifications={refreshClassifications}/>
            <UpdateClassification setModalVisible={setVisible} classification={{log_id: classification.log_id, start_depth: startDepth, end_depth: endDepth, uscs: uscs, color: color, moisture: moisture, density: density, hardness: hardness }} refreshClassifications={refreshClassifications}/>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};



const SelectClassificationList = ({ id, classifications_list, refreshClassifications }) => {

  return(
    <View style={{height: "90%"}}>
        <Text style={{marginLeft: '2%', marginBottom: '5%', fontSize: 24, fontWeight: '500'}}>Classifications</Text>
        <ScrollView style={styles.scrollView}>
            {classifications_list.map(classification => (
                <SelectClassificationButton classification={classification} key={uuid()} refreshClassifications={refreshClassifications}/>
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

});

export default SelectClassificationList;
