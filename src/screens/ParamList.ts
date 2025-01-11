import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Employeeinfodata: undefined; // Add all your routes here
  Login: undefined;
  LaywiseCutting: undefined;
  LaywiseCuttingEdit: {id: number};
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
