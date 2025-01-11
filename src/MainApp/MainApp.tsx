import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {RootState} from '../redux/store';
import MenuHeader from '../screens/menu/MenuHeader';
import {StyleSheet, Text, View} from 'react-native';

import Employeeinfodata from '../screens/EmployeeInfo/Employeeinfodata';
import LaywiseCutting from '../screens/Cutting/LaywiseCutting';
import LaywiseCuttingEdit from '../screens/Cutting/LaywiseCuttingEdit';

// const Stack = createNativeStackNavigator();
type RootStackParamList = {
  Home: undefined;
  Employeeinfodata: undefined; // Add all your routes here
  Login: undefined;
  LaywiseCutting: undefined;
  LaywiseCuttingEdit: {id: number};
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainApp = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('isLoggedIn', user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({navigation}) => ({
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
            fontSize: 10,
          },
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Text style={styles.headerText}>
                {user?.employeeName
                  ? `Welcome : ${user.employeeName}`
                  : 'Guest'}
              </Text>
              <MenuHeader />
            </View>
          ),
        })}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Employeeinfodata"
              component={Employeeinfodata}
              options={{headerShown: true}}
            />

            <Stack.Screen
              name="LaywiseCutting"
              component={LaywiseCutting}
              options={{headerShown: true}}
            />

            <Stack.Screen
              name="LaywiseCuttingEdit"
              component={LaywiseCuttingEdit}
              options={{headerShown: true}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    paddingRight: '30%',
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
});
export default MainApp;
