// import React from 'react';
// import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
// import globalStyles from '../components/styles/globalStyles';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const HomeScreen = ({navigation}: any) => {
//   const scheme = useColorScheme() || 'light';
//   const styles = globalStyles(scheme);
//   const myIcon1 = <Icon name="comments" size={30} color="#900" />;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to the Home Screen</Text>
//       <TouchableOpacity
//         style={styles.primary_button}
//         onPress={() => navigation.navigate('Details')}>
//         <Text style={styles.primary_buttonText}>Go to Details</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default HomeScreen;

// import React, {useEffect, useState} from 'react';
// import {View, Text, Button, SafeAreaView, useColorScheme} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {RootState} from '../redux/store';
// import {logout} from '../redux/slices/authSlice';
// import globalStyles from '../components/styles/globalStyles';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import StyledInput from '../components/Inputfield/StyledInput';
// import Toast from 'react-native-toast-message';
// import Spinner from 'react-native-loading-spinner-overlay';
// import instance from '../Axiosinstance';

// const HomeScreen = ({navigation}: any) => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const scheme = useColorScheme() || 'light';
//   const styles = globalStyles(scheme);
//   const [linename, setLinename] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const myIcon1 = <Icon name="comments" size={30} color="#900" />;

//   const handleToastMsg = (type: string, text: string) => {
//     Toast.show({
//       type,
//       text1: text,
//       visibilityTime: 2000,
//     });
//   };

//   const handleLinesetup = async () => {
//     if (!linename) {
//       handleToastMsg('error', 'Please enter line name');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await instance.get(
//         `Cutting/Cuttinglinesetup/${linename}/1`,
//       );

//       if (response.data[0].Message === 'Record successfully inserted') {
//         handleToastMsg('success', 'Data successfully inserted');
//         setLinename('');
//       } else {
//         handleToastMsg('error', 'Invalid credentials');
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || 'Failed to connect to the server';
//       handleToastMsg('error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {user ? (
//         <>
//           <Text>Welcome, {user.employeeCode}!</Text>

//           <View style={styles.row}>
//             {/* First section with Icon Button */}
//             <View style={styles.section}>
//               {/* <Text style={styles.sectionText}>Section 1</Text> */}
//               <StyledInput
//                 placeholder="Enter Line Name"
//                 value={linename}
//                 onChangeText={setLinename}
//                 errorMessage={!linename ? 'Line name is required' : ''}
//                 width={250}
//               />

//               <Icon.Button
//                 name="facebook"
//                 size={30}
//                 style={styles.primary_button}
//                 onPress={() => handleLinesetup()}>
//                 <Text style={styles.primary_buttonText}>Submit</Text>
//               </Icon.Button>
//             </View>

//             {/* Second section with Cancel Icon Button */}
//             <View style={styles.section}>
//               <Text style={styles.sectionText}>Section 2</Text>
//             </View>
//           </View>

//           <Toast />
//           {loading && (
//             <Spinner
//               visible={loading}
//               textContent="Loading..."
//               textStyle={globalStyles(scheme).spinnerTextStyle}
//             />
//           )}
//         </>
//       ) : (
//         <Text>You are not logged in.</Text>
//       )}
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import {Table, Row} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../components/styles/globalStyles';
import StyledInput from '../components/Inputfield/StyledInput';
import {RootState} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../screens/ParamList';
import {instance} from '../Axiosinstance';

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const scheme = useColorScheme() || 'light';
  const styles = globalStyles(scheme);
  const navigation = useNavigation<NavigationProps>();
  const myIcon1 = <Icon name="comments" size={30} color="#900" />;
  const [lineName, setLineName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<string[][]>([]);

  const tableHeaders = [
    <Text style={{color: '#fff', textAlign: 'center'}}>ID</Text>,
    <Text style={{color: '#fff', textAlign: 'center'}}>Line Name</Text>,
    <Text style={{color: '#fff', textAlign: 'center'}}>Update</Text>,
    <Text style={{color: '#fff', textAlign: 'center'}}>Delete</Text>,
  ];
  const columnWidths = [200, 200, 100, 100];

  const showToast = (type: string, message: string) => {
    Toast.show({
      type,
      text1: message,
      visibilityTime: 2000,
    });
  };

  const fetchTableData = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get('/Cutting/getCuttingLineData');
      const formattedData = response.data.map((item: any) => [
        item.id,
        item.LineName,
        'Edit',
      ]);
      setTableData(formattedData);
    } catch (error) {
      showToast('error', 'Failed to fetch table data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (rowData: string[]) => {
    // console.log('Edit action for:', rowData);
    // showToast('info', `Edit Button Clicked for Line ID: ${rowData[0]}`);
    setLineName(rowData[1]);
  };

  const handleDelete = async (rowData: string[]) => {
    showToast('info', `Edit Button Clicked for Line ID: ${rowData[0]}`);

    setIsLoading(true);
    try {
      const response = await instance.get(
        `Cutting/deleteCuttingLineData/${rowData[0]}`,
      );

      if (response.data[0]?.Message === 'Record successfully deleted') {
        showToast('success', 'Data Delete successfully');
        setLineName('');
        fetchTableData();
      } else {
        showToast('error', 'Failed to insert data');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to connect to the server';
      showToast('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLineSetup = async () => {
    if (!lineName.trim()) {
      showToast('error', 'Please enter a line name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await instance.get(
        `Cutting/Cuttinglinesetup/${lineName}/1`,
      );

      if (response.data[0]?.Message === 'Record successfully inserted') {
        showToast('success', 'Data successfully inserted');
        setLineName('');
        fetchTableData();
      } else {
        showToast('error', 'Failed to insert data');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to connect to the server';
      showToast('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlegoemployeepage = () => {
    console.log('LaywiseCutting');
    navigation.navigate('LaywiseCutting');

    // navigation.navigate('EmployeeinfodataScreen');
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <>
          <View style={styles.row}>
            <StyledInput
              placeholder="Enter Line Name"
              value={lineName}
              onChangeText={setLineName}
              errorMessage={lineName.length >= 5 ? '' : 'Line name is required'}
              width={250}
            />
            <View style={{height: 75, marginHorizontal: 10}}>
              <Icon.Button
                name="save"
                size={20}
                style={styles.primary_button}
                onPress={handleLineSetup}>
                <Text style={styles.primary_buttonText}>Submit</Text>
              </Icon.Button>
            </View>
          </View>

          <View style={localStyles.tableContainer}>
            <ScrollView horizontal>
              <View>
                <Table borderStyle={localStyles.tableBorderStyle}>
                  <Row
                    data={tableHeaders}
                    widthArr={columnWidths}
                    style={localStyles.header}
                    textStyle={localStyles.text}
                  />
                </Table>
                <ScrollView style={localStyles.dataWrapper}>
                  <Table borderStyle={localStyles.tableBorderStyle}>
                    {tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={[
                          <Text style={{color: '#000', textAlign: 'center'}}>
                            {rowData[0]}
                          </Text>,
                          <Text style={{color: '#000', textAlign: 'center'}}>
                            {rowData[1]}
                          </Text>,

                          <Icon.Button
                            name="edit"
                            size={20}
                            color="#fff"
                            backgroundColor="#3b5998"
                            onPress={() => handleEdit(rowData)}>
                            Edit
                          </Icon.Button>,
                          <Icon.Button
                            name="trash"
                            size={20}
                            color="#fff"
                            backgroundColor="red"
                            onPress={() => handleDelete(rowData)}>
                            Delete
                          </Icon.Button>,
                        ]}
                        widthArr={columnWidths}
                        style={[
                          localStyles.row,
                          index % 2 === 0 ? {} : {backgroundColor: '#F7F6E7'},
                        ]}
                        textStyle={localStyles.text}
                      />
                    ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
            <View
              style={{
                height: 75,
                marginHorizontal: 10,
                alignItems: 'center',
              }}>
              <Icon.Button
                name="chevron-right"
                size={20}
                style={styles.primary_button}
                onPress={() => handlegoemployeepage()}>
                <Text style={styles.primary_buttonText}>next</Text>
              </Icon.Button>
            </View>
          </View>

          <Toast />
          <Spinner
            visible={isLoading}
            textContent="Loading..."
            textStyle={styles.spinnerTextStyle}
          />
        </>
      ) : (
        <Text>You are not logged in.</Text>
      )}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  tableContainer: {flex: 1, padding: 16, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
  tableBorderStyle: {borderWidth: 1, borderColor: '#C1C0B9'},
});

export default HomeScreen;
