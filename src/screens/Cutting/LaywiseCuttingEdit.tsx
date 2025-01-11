// import React, {useEffect, useState} from 'react';
// import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
// import {RouteProp} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import {instanceERP} from '../../Axiosinstance';
// import {RootState} from '../../redux/store';
// import {RootStackParamList} from '../ParamList';

// // Define type for route parameters
// type LaywiseCuttingEditScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'LaywiseCuttingEdit'
// >;

// // Define props for the component
// type LaywiseCuttingEditProps = {
//   route: LaywiseCuttingEditScreenRouteProp;
// };

// interface LaywiseCuttingData {
//   id: number;
//   cutNo: string;
//   companyName: string;
//   floorName: string;
//   seasonName: string;
// }

// const LaywiseCuttingEdit: React.FC<LaywiseCuttingEditProps> = ({route}) => {
//   const {id} = route.params; // Extract the ID from route parameters
//   const getToken = useSelector((state: RootState) => state.auth.user?.token); // Get the user token from Redux store
//   const [cartingdata, setCartingData] = useState<LaywiseCuttingData[]>([]); // State to store fetched data

//   // Fetch data from API when component mounts or when ID/token changes

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await instanceERP.post(
//           `/Laycutting/get_cut_laywise_cutting_master_by_id/302995`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${getToken}`,
//               'Content-Type': 'application/json',
//             },
//           },
//         );

//         setCartingData(response.data.res);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (getToken) {
//       fetchData();
//     }
//   }, [getToken, id]);

//   console.log('Fetched Data:', cartingdata); // Log the data state

//   return <View style={styles.container}></View>;
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 8,
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     marginVertical: 8,
//     borderRadius: 5,
//     backgroundColor: '#f9f9f9',
//   },
//   label: {
//     fontWeight: 'bold',
//   },
//   detailText: {
//     marginVertical: 4,
//   },
//   loadingText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//   },
// });

// export default LaywiseCuttingEdit;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {instanceERP} from '../../Axiosinstance';
import {RootState} from '../../redux/store';
import {RootStackParamList} from '../ParamList';

type LaywiseCuttingEditScreenRouteProp = RouteProp<
  RootStackParamList,
  'LaywiseCuttingEdit'
>;

type LaywiseCuttingEditProps = {
  route: LaywiseCuttingEditScreenRouteProp;
};

interface LaywiseDetailDataData {
  id: number;
  Color: string;
  ShadeNo: string;
  LayQty: number;
  QtyYds: number;
}

const LaywiseCuttingEdit: React.FC<LaywiseCuttingEditProps> = ({route}) => {
  const {id} = route.params;
  const getToken = useSelector((state: RootState) => state.auth.user?.token);
  const [detailData, setDetailData] = useState<LaywiseDetailDataData[]>([]);
  const [masterId, setMasterId] = useState<number>();
  const [cutNo, setCutNo] = useState<number>();

  const [loading, setLoading] = useState(true); // To handle loading state

  // const GetMasterByID = async () => {
  //     //debugger;
  //     instance
  //       .post(
  //         `Laycutting/get_cut_laywise_cutting_master_by_id/${encodeURIComponent(
  //           Id
  //         )}`
  //       )
  //       .then((res) => {
  //         var result = JSON.parse(res.data.res);
  //         console.log(res.data);
  //         setMasterId(result[0].id);
  //         setCutNo(result[0].cutno);
  //         // setdate(result[0].cutdate);
  //         setCutDate(result[0].cutdate);
  //         settableNo(result[0].tableno);
  //         setIsFinal(result[0].isMainFabric);
  //         setStartTime((result[0].startTime = null ? null : result[0].startTime));

  //         setEndTime((result[0].endTime = null ? null : result[0].endTime));
  //         setCutBy(result[0].cutBy);
  //         setWidth(result[0].width);
  //         setLength(result[0].length);
  //         setLayQty(result[0].layqty);
  //         setSelecteCompany({
  //           label: result[0].companyName,
  //           value: result[0].companyid,
  //         });
  //         setSelecteFloor({
  //           label: result[0].floorName,
  //           value: result[0].floorid,
  //         });
  //         setSelecteYear({ label: result[0].yearname, value: result[0].year });
  //         setSelectedBuyer({ label: result[0].buyer, value: result[0].buyerid });
  //         setSelectedSeason({
  //           label: result[0].seasonName,
  //           value: result[0].seasonid,
  //         });
  //         setSelectedStyle({
  //           label: result[0].styleName,
  //           value: result[0].styleid,
  //         });
  //         setSelectedOperation({
  //           label: result[0].operation,
  //           value: result[0].operation,
  //         });
  //         setSelectedCuttingType({
  //           label: result[0].cuttingType,
  //           value: result[0].cuttingType,
  //         });
  //         setSelectedSpreadingType({
  //           label: result[0].spreadingType,
  //           value: result[0].spreadingType,
  //         });
  //         setPatternNumber(result[0].patternNumber);
  //         setSelectedPo({ label: result[0].po, value: result[0].po });
  //         setSelectedColor({ label: result[0].color, value: result[0].color });
  //         //  setData(result[0].details);
  //         setDetailData(result[0].details);
  //         setSizeOption(result[0].ratio);
  //         setMarkerNo(result[0].ratio[0].markerno);
  //         setMarkerDate(result[0].ratio[0].markerDate);
  //         setmMrkerBy(result[0].ratio[0].by);
  //         setEfficiency(result[0].ratio[0].effeciency);
  //         setMarkerNote(result[0].ratio[0].note);
  //         setLayMarker(result[0].Markerratio[0]);
  //         setMarkerName(
  //           result[0].Markerratio[0] ? result[0].Markerratio[0].markername : ""
  //         );
  //         setNumberOfParts(
  //           result[0].Markerratio[0] ? result[0].Markerratio[0].numberofparts : ""
  //         );
  //         setSelectefabricItem({
  //           label: result[0].fabricItem,
  //           value: result[0].fabricItem,
  //         });
  //         setSelectefabricColor({
  //           label: result[0].fabricColor,
  //           value: result[0].fabricColor,
  //         });
  //         setcuttingNo(result[0].cuttingNo);

  //         console.log("Lay Marer" + layMarker);
  //         var tt = 0;
  //         result[0].ratio.map(function (e) {
  //           tt += parseInt(e.ratio);
  //         });
  //         setTotal(tt);

  //         var totalLayQty = 0;
  //         if (result[0].details.length > 0) {
  //           for (var i = 0; i < result[0].details.length; i++) {
  //             totalLayQty = totalLayQty + result[0].details[i].LayQty;
  //             result[0].details[i].TtlLay = totalLayQty;
  //           }

  //           setData(result[0].details);
  //         }
  //       });
  //   };

  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await instanceERP.post(
        `/Laycutting/get_cut_laywise_cutting_master_by_id/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      var result = JSON.parse(response.data.res);
      // console.log(response.data);
      setMasterId(result[0].id);
      setCutNo(result[0].cutno);
      setDetailData(result[0].details);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [getToken, id]);

  //console.log('detailData ' + JSON.stringify(detailData, null, 2));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItemDetailData = ({item}: {item: LaywiseDetailDataData}) => (
    <View style={styles.card}>
      <Text style={styles.heading}>Cut No: {item.Color}</Text>
      <Text style={styles.detailText}>ShadeNo: {item.ShadeNo}</Text>
      <Text style={styles.detailText}>LayQty: {item.LayQty}</Text>
      <Text style={styles.detailText}>QtyYds: {item.QtyYds}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cut No: {cutNo}</Text>
      <>
        <FlatList
          data={detailData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItemDetailData}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: 'bold',
  },
  detailText: {
    marginVertical: 4,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default LaywiseCuttingEdit;
