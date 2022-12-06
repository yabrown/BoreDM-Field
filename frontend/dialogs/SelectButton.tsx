import React from 'react';
import { View } from "react-native";
import { Button } from 'react-native-paper';

const SelectButton = ({ current, buttonOption, setFunction, color, highlightedColor="lightgrey" }) => (  
  <View style={{ minWidth: 140, margin: 4 }}>
    <Button
      style={{borderColor: color }}
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

export default SelectButton;