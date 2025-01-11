// import React, {useEffect} from 'react';
// import {BackHandler, Alert} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HomeScreen from './src/screens/HomeScreen';
// import DetailsScreen from './src/screens/DetailsScreen';
// import MenuHeader from './src/screens/menu/MenuHeader';

// const Stack = createNativeStackNavigator();

// const App: React.FC = () => {
//   useEffect(() => {
//     // Function to handle back button press
//     const handleBackPress = () => {
//       Alert.alert(
//         'Information',
//         'App not Exit',
//         [
//           // {
//           //   text: 'Cancel',
//           //   onPress: () => null,
//           //   style: 'cancel',
//           // },
//           {
//             text: 'Yes',
//             onPress: () => null,
//           },
//         ],
//         {cancelable: false},
//       );
//       return true;
//     };
//     BackHandler.addEventListener('hardwareBackPress', handleBackPress);
//     return () =>
//       BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={({navigation}) => ({
//           headerBackTitleVisible: false,
//           headerStyle: {
//             backgroundColor: '#fff',
//             fontSize: 10,
//           },
//           headerRight: () => <MenuHeader />,
//         })}>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             title: 'Welcome Home',
//           }}
//         />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import MainApp from './src/MainApp/MainApp';
import {Alert, BackHandler} from 'react-native';

const App = () => {
  useEffect(() => {
    // Function to handle back button press
    const handleBackPress = () => {
      Alert.alert(
        'Information',
        'App not Exit',
        [
          // {
          //   text: 'Cancel',
          //   onPress: () => null,
          //   style: 'cancel',
          // },
          {
            text: 'Yes',
            onPress: () => null,
          },
        ],
        {cancelable: false},
      );
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
