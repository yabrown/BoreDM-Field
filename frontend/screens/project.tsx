import { View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Project: { notes: string };
};
type Props = NativeStackScreenProps<RootStackParamList, 'Project'>;
const Project = ({route}: Props) => {
  return (
    <View>
      <Text>{route.params.notes}</Text>
    </View>
  );
}

export default Project;