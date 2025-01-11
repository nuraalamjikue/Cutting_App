// import React from 'react';
// import {Text, View} from 'react-native';

// const LaywiseCutting = () => {
//   return (
//     <View>
//       <Text>dsfdsf</Text>
//     </View>
//   );
// };

// export default LaywiseCutting;

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';

import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Dropdown} from 'react-native-element-dropdown';
import globalStyles from '../../components/styles/globalStyles';
import GlobalDropdown from '../../components/Dropdown/GlobalDropdown';
import GlobalButton from '../../components/Button/GlobalButton';
import {useNavigation} from '@react-navigation/native';
import {instance, instanceERP} from '../../Axiosinstance';
import {NavigationProps} from '../ParamList';

interface Employee {
  employeeId: string;
  employeeName: string;
  imgURL: string;
}
type FloorItem = {
  label: string;
  value: string | number;
};
type BuyerItem = {
  label: string;
  value: string | number;
};
type cuttingtype = {
  id: number;
  cutno: string;
  companyName: string;
  floorName: string;
};

const LaywiseCutting = () => {
  const flexD = 'column';
  const [inputValue, setInputValue] = useState('');
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [cuttingdata, setCuttingdata] = useState<cuttingtype[]>([]);
  const textInputRef = useRef<TextInput>(null);
  const scheme = useColorScheme() || 'light';
  const styles = globalStyles(scheme);
  const navigation = useNavigation<NavigationProps>();
  const [floor, setFloor] = useState<FloorItem[]>([]);
  const [floorValue, setFloorValue] = useState<string | number | null>(null);
  const [buyer, setBuyer] = useState<BuyerItem[]>([]);
  const [buyerValue, setBuyerValue] = useState<string | number | null>(null);
  const [inputfiledready, setInputfiledready] = useState<boolean>(false);
  const gettoken = useSelector((state: RootState) => state.auth.user);

  const {width, height} = Dimensions.get('window');
  useEffect(() => {
    const interval = setInterval(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
        setInputfiledready(true);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handle_fetchCut_Lay_Prod_Search_Grid_Data = async (
    floorID: string | number,
    buyerID: string | number,
  ) => {
    try {
      // API Request Configuration
      const endpoint = 'Laycutting/Cut_Lay_Prod_Search_Grid/';
      const requestData = {
        param1: buyerID || 0,
        param2: 0,
        param3: 0,
        param4: 0,
        param5: floorID || 0,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${gettoken?.token}`,
          'Content-Type': 'application/json',
        },
      };

      // API Call
      const response = await instanceERP.post(endpoint, requestData, config);
      console.log(
        'Response' + JSON.stringify(response.data.res.items, null, 2),
      );

      // Handle API Response
      if (response?.data?.res?.items) {
        setCuttingdata(response.data.res.items); // Update state with response data
      } else {
        console.warn('No items found in response data');
      }
    } catch (error: any) {
      // Handle API Error
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Unknown error occurred';
      console.error('Error fetching data:', errorMessage);
    }
  };

  const GetDropDownBuyer = async () => {
    try {
      const response = await instanceERP.post(
        'Common/GetDropDownBuyer',
        {},
        {
          headers: {
            // Authorization: `Bearer ${gettoken?.token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Assuming response.data is an array of objects with StoreID and StoreName
      const newArray = response.data.res.map((item: any) => ({
        value: item.value,
        label: item.label,
      }));
      setBuyer(newArray);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };
  const GetFloor = async () => {
    try {
      const response = await instanceERP.post(
        'Common/get_floor_id',
        {},
        {
          headers: {
            Authorization: `Bearer ${gettoken?.token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Assuming response.data is an array of objects with StoreID and StoreName
      const newArray = response.data.res.map((item: any) => ({
        value: item.value,
        label: item.label,
      }));
      setFloor(newArray);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    GetDropDownBuyer();
    GetFloor();
  }, []);

  // Function to handle scan data
  const handlesetscanData = (text: string) => {
    console.log('Handlescan: ' + text);
    setInputValue(text);

    if (text.length >= 10) {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }

      // Convert the text to a decimal number
      const decimalNumber = parseInt(text, 10);
      if (isNaN(decimalNumber)) {
        console.log('Invalid number');
        return;
      }

      // Convert decimal number to hexadecimal and pad to at least 10 characters
      let hex = decimalNumber.toString(16).toUpperCase();
      hex = hex.padStart(10, '0');

      // Split the hexadecimal into parts
      const firstPart = hex.slice(0, 6);
      const lastPart = hex.slice(6, 10);

      // Convert both parts back to decimal
      const firstDecValue = parseInt(firstPart, 16).toString();
      const lastDecValue = parseInt(lastPart, 16).toString();

      // Pad the decimal values
      const paddedFirstValue = firstDecValue.padStart(3, '0');
      const paddedLastValue = lastDecValue.padStart(5, '0');

      // Concatenate the padded values
      const result = paddedFirstValue + paddedLastValue;

      if (result.length >= 8) {
        console.log('yes');

        instance
          .get(`/Cutting/ProfileImage/${result}/0`)
          .then(res => {
            const formattedData = Array.isArray(res.data)
              ? res.data
              : [res.data];

            const filteredData = formattedData.filter(
              newEmployee =>
                !employeeList.some(
                  existingEmployee =>
                    existingEmployee.employeeId === newEmployee.employeeId,
                ),
            );

            // Add only non-duplicate employees
            if (filteredData.length > 0) {
              setEmployeeList(prevList => [...prevList, ...filteredData]);
              setInputValue('');
              setInputfiledready(false);
            } else {
              console.log('Duplicate employee code found, not adding.');
            }

            console.log('Employee list after adding: ', filteredData);
          })
          .catch(error => {
            console.error('Error fetching image:', error);
          });
      }
    }
  };

  const handelChangeCuttinglawValue = (id: number) => {
    console.log('id' + id);
    navigation.navigate('LaywiseCuttingEdit', {id});
  };

  return (
    <View style={{flex: 1, flexDirection: flexD, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 8,
            marginVertical: 8,
          }}>
          <View style={{width: width * 0.4}}>
            <GlobalDropdown
              data={floor}
              placeholder="Select Floor"
              searchPlaceholder="Search Floor"
              onChange={(item: BuyerItem) => {
                setBuyerValue(item.value);
              }}
              width={300}
            />
          </View>
          <View style={{width: width * 0.4}}>
            <GlobalDropdown
              data={buyer}
              placeholder="Select Buyer"
              searchPlaceholder="Search Buyer"
              onChange={(item: BuyerItem) => {
                setBuyerValue(item.value);
              }}
              // style={{marginBottom: 20}}
              width={300}
            />
          </View>
          <View style={{width: width * 0.18}}>
            <GlobalButton
              //title={buyerValue ? 'Fetch Data' : 'Select a Buyer First'}
              title={'Fetch Data'}
              onPress={() =>
                handle_fetchCut_Lay_Prod_Search_Grid_Data(
                  buyerValue || 0,
                  floorValue || 0,
                )
              }
              // disabled={!buyerValue}
              // fontSize={ 16}
              buttonStyle={{
                // backgroundColor: buyerValue ? '#6200EE' : '#BDBDBD',
                backgroundColor: '#6200EE',
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 3,
          backgroundColor: '#D3D3D3',
          marginHorizontal: 8,
          marginVertical: 8,
        }}>
        <FlatList
          data={cuttingdata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Pressable onPress={() => handelChangeCuttinglawValue(item?.id)}>
              <View style={style.listItem}>
                <View style={style.listContent}>
                  {/* Employee ID */}
                  <Text style={[style.listText, style.cell]}>
                    {index + 1}. {item?.cutno}
                  </Text>
                  <Text style={[style.listText, style.cell]}>
                    {item?.companyName}
                  </Text>
                  <Text style={[style.listText, style.cell]}>
                    {item?.floorName}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={style.emptyText}>No employees added yet.</Text>
          }
        />
      </View>
      <Text style={style.header}>Employee Info Screen</Text>
      <View
        style={{
          flex: 3,
          backgroundColor: '#D3D3D3',
          marginHorizontal: 8,
          marginVertical: 8,
        }}>
        <FlatList
          data={employeeList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={style.listItem}>
              <View style={style.listContent}>
                {/* Employee ID */}
                <Text style={[style.listText, style.cell]}>
                  {index + 1}. {item?.employeeId}
                </Text>

                {/* Employee Name */}
                <Text style={[style.listText, style.cell]}>
                  {item?.employeeName}
                </Text>

                {/* Profile Image */}
                <View style={style.imageContainer}>
                  {item?.imgURL ? (
                    <Image
                      style={style.profileImage}
                      source={{uri: item?.imgURL}}
                    />
                  ) : (
                    <Text style={style.imagePlaceholder}>Loading image...</Text>
                  )}
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={style.emptyText}>No employees added yet.</Text>
          }
        />
      </View>
      {inputfiledready ? (
        <Text style={{textAlign: 'center'}}>Scan Now</Text>
      ) : (
        <Text style={{textAlign: 'center', color: 'red'}}>Wait ...</Text>
      )}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <TextInput
            ref={textInputRef}
            style={style.input}
            placeholder="Type here..."
            value={inputValue}
            onChangeText={handlesetscanData}
            keyboardType="numeric"
            showSoftInputOnFocus={false}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    height: 0,
    width: 0,
    opacity: 0,
  },

  listItem: {
    marginBottom: 5,
    backgroundColor: '#1577AE',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Add shadow for Android devices
  },
  listContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cell: {
    width: '30%',
    padding: 5,
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  listText: {
    fontSize: 16,
    color: '#fff',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    color: '#999',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default LaywiseCutting;
