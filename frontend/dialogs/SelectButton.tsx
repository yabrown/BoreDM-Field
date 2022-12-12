import React from 'react';
import { View } from "react-native";
import { Button } from 'react-native-paper';

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

export default SelectButton;
