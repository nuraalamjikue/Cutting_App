import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {instanceERP} from '../../Axiosinstance';
import {RootState} from '../../redux/store';
import {NavigationProps, RootStackParamList} from '../ParamList';
import GlobalDropdown from '../../components/Dropdown/GlobalDropdown';
import GlobalButton from '../../components/Button/GlobalButton';
import GlobalTextInput from '../../components/Inputfield/GlobalTextInput';

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
  RollCode: string;
  QtyYds: number;
  rollNoQr: number;
  Consignment: number;
}
interface TableRowData {
  rollNoQr: number;
  shadeNo: number;
  RollNo: number;
  consignment: number;
  shinkage: number;
  shadeColor: string;
  rollQty: number;
  layer: number;
  totallay: number;
  totalLay: number;
}
type RollDropdownOption = {
  label: string;
  value: string | number;
};
type ColorDropdownOption = {
  label: string;
  value: string | number;
};

const LaywiseCuttingEdit: React.FC<LaywiseCuttingEditProps> = ({route}) => {
  const {id, QrCode} = route.params;
  const flexD = 'column';
  const getToken = useSelector((state: RootState) => state.auth.user?.token);
  const [detailData, setDetailData] = useState<LaywiseDetailDataData[]>([]);
  const [laywisecutdetails, setLaywisecutdetails] = useState<TableRowData[]>(
    [],
  );
  const [layMarker, setLayMarker] = useState([]);
  const [masterId, setMasterId] = useState<number>();
  const [cutNo, setCutNo] = useState<number>();
  const [layer, setLayer] = useState<number>(0);
  const [cutpc, setCutpc] = useState<number>(0);

  const [totalLay, setTotalLay] = useState(0);
  const [totalUsedQty, setTotalUsedQty] = useState<number>(0);
  const [short, setShort] = useState<number>(0);

  const [remarks, setRemarks] = useState<string>('');
  const [rollQROption, setRollQROption] = useState<RollDropdownOption[]>([]);
  const [selectedRollQR, setSelectedRollQR] = useState<RollDropdownOption>({
    label: '',
    value: '',
  });
  //Details Fileds
  const [rollNo, setRollNo] = useState<number | null>(null);
  const [shadeNo, setShadeNo] = useState<string | null>(null);
  const [consignment, setConsignment] = useState<number | null>(null);
  const [shinkage, setShinkage] = useState<number | null>(null);
  const [shadeColor, setShadeColor] = useState<string | null>(null);
  const [rollQty, setRollQty] = useState<number | null>(null);
  const navigation = useNavigation<NavigationProps>();

  // const [shadeColorOption, setShadeColorOption] = useState<
  //   ColorDropdownOption[]
  // >([]);
  // const [selectedShadeColor, setSelectedShadeColor] =
  //   useState<ColorDropdownOption>({
  //     label: '',
  //     value: '',
  //   });

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
      //console.log('result' + result);
      // console.log(
      //   'response cutting Edit Data ' + JSON.stringify(response.data.res),
      // );
      setMasterId(result[0].id);
      setCutNo(result[0].cutno);
      setDetailData(result[0].details);
      setLayMarker(result[0].Markerratio[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const loadRollQr = async () => {
    try {
      // Make the POST request
      const response = await instanceERP.post(
        `Laycutting/Get_issue_roll_code/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Map response data to the required format
      const newArray = response.data.res.map((item: any) => ({
        value: item.value,
        label: item.label,
      }));
      // Update the state with the new options
      setRollQROption(newArray);
    } catch (error: any) {
      console.error('Error fetching data:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchData();
    loadRollQr();
    if (QrCode !== 'exampleQRCode123') {
      fetchRollDetails(QrCode);
    }
  }, [getToken, id]);

  const fetchRollDetails = async (rollid: string | number) => {
    try {
      const response = await instanceERP.post(
        `Laycutting/Get_roll_details_by_rollid/${rollid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      var result = JSON.parse(response.data.res);
      if (result && result.length > 0) {
        console.log('Roll details' + JSON.stringify(result, null, 2));

        setRollNo(result[0].rollno);
        setShadeNo(result[0].shed);
        setConsignment(result[0].consignment);
        setShinkage(result[0].shrinkage);
        setShadeColor(result[0].rollcolor);
        setLayer(0);
        setCutpc(0);
        setRemarks('');
        let rollValue = 0;
        if (detailData.length > 0) {
          rollValue = detailData.reduce((total, item) => {
            return item.RollCode === rollid
              ? total + (item.QtyYds ?? 0)
              : total;
          }, 0);
        }

        setRollQty(result[0].rollqty - rollValue);

        // const colorOptions = result.map((item: any) => ({
        //   label: item.rollcolor,
        //   value: item.rollid,
        // }));

        // setShadeColorOption(colorOptions);
        // setSelectedShadeColor({
        //   label: result[0].rollcolor,
        //   value: result[0].rollid,
        // });
      } else {
        console.warn('No roll details found for the given roll ID.');
      }
    } catch (error: any) {
      console.error(
        'Error fetching roll details:',
        error.response || error.message,
      );
      // Optionally, set an error state to display in the UI
    }
  };

  const handleRollDropdownChange = (item: RollDropdownOption) => {
    setSelectedRollQR(item);
    fetchRollDetails(item.value);
  };

  const handleQrCodeopen = () => {
    navigation.navigate('QRCodescannerSceen', {id});
  };

  const totalLayQtyCalculation = (value: number) => {
    let totalLayQty = value == null ? 0 : value;
    let vTotalUsedQty = 0;
    let vRollQty = rollQty == null ? 0 : rollQty;
    let vCutPc = cutpc == null ? 0 : cutpc;

    if (detailData.length > 0) {
      detailData.forEach(element => {
        totalLayQty =
          parseInt(totalLayQty.toString()) + parseInt(element.LayQty);
      });
    }

    vTotalUsedQty = (parseInt(value.toString()) * layMarker.Length).toFixed(2);
    setTotalLay(parseInt(totalLayQty.toString()));
    setTotalUsedQty(vTotalUsedQty);
    setShort(
      (
        parseFloat(vCutPc) +
        parseFloat(vTotalUsedQty) -
        parseFloat(vRollQty)
      ).toFixed(2),
    );
  };

  const totalShortQtyCalculation = (value: number) => {
    var vRollQty = rollQty == null ? 0 : rollQty;
    var vCutPC = value == null ? 0 : value;
    var vtotalUsedQty = totalUsedQty == null ? 0 : totalUsedQty;
    const shortQty =
      parseFloat(vtotalUsedQty.toString()) +
      parseFloat(vCutPC.toString()) -
      parseFloat(vRollQty.toString());
    setShort(Number(shortQty.toFixed(2)));
  };

  const HandleLaywiseCutDetails = () => {
    // Ensure `tableRowData` has all required fields
    const tableRowData: LaywiseDetailDataData = {
      RollCode: selectedRollQR.value ? selectedRollQR.value : '0',
      Color: shadeColor || '0',
      RollNo: rollNo || null,
      Consignment: consignment || 0,
      shadeNo: shadeNo || null,
      shinkage: shinkage || null,
      rollQty: rollQty || null,
      layer: layer,
      totalLay: totalLay,
    };

    // Update the state correctly
    setDetailData([...detailData, tableRowData]);
  };

  // const handleColorDropdownChange = (option: ColorDropdownOption) => {
  //   setSelectedShadeColor(option);
  // };

  console.log('detailData', JSON.stringify(detailData, null, 2));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // const renderItemDetailData = ({item}: {item: LaywiseDetailDataData}) => (
  //   <View style={styles.card}>
  //     <Text style={styles.heading}>Cut No: {item.Color}</Text>
  //     <Text style={styles.detailText}>ShadeNo: {item.ShadeNo}</Text>
  //     <Text style={styles.detailText}>LayQty: {item.LayQty}</Text>
  //     <Text style={styles.detailText}>QtyYds: {item.QtyYds}</Text>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View
            style={{flex: 1, flexDirection: flexD, backgroundColor: '#fff'}}>
            <View
              style={{
                flex: 0.5,
                backgroundColor: '#fff',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{width: '75%'}}>
                <GlobalDropdown
                  data={rollQROption || []}
                  placeholder="Select Roll"
                  searchPlaceholder="Search Roll"
                  onChange={handleRollDropdownChange}
                  width={width * 0.6}
                />
              </View>
              <View style={{width: '20%'}}>
                <View style={{width: width * 0.18}}>
                  <GlobalButton
                    //title={buyerValue ? 'Fetch Data' : 'Select a Buyer First'}
                    title={'Scan'}
                    onPress={() => {
                      handleQrCodeopen();
                    }}
                    // disabled={!buyerValue}
                    // fontSize={ 16}
                    buttonStyle={{
                      // backgroundColor: buyerValue ? '#6200EE' : '#BDBDBD',
                      backgroundColor: '#6200EE',
                    }}
                  />
                </View>
              </View>

              {/* <GlobalDropdown
                data={shadeColorOption || []}
                placeholder="Select Color"
                searchPlaceholder="Search Color"
                onChange={handleColorDropdownChange}
                width={200}
              /> */}
            </View>

            <View style={{flex: 6, marginTop: height * 0.02}}>
              <View style={styles.containerHeader}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.headerText}>Roll No</Text>
                    <Text style={styles.cell}>{rollNo}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.headerText}>shade No</Text>
                    <Text style={styles.cell}>{shadeNo}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.headerText}>consignment</Text>
                    <Text style={styles.cell}>{consignment}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.headerText}>shinkage (%)</Text>
                    <Text style={styles.cell}>{shinkage}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.headerText}>Roll YDS</Text>
                    <Text style={styles.cell}>{rollQty}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={[styles.headerText, {color: '#F9B115'}]}>
                      Shade Color : {shadeColor}
                    </Text>
                  </View>
                  <View style={styles.column}></View>
                </View>
              </View>
              <View style={{marginTop: height * 0.02}}></View>
              <View
                style={[styles.containerHeader, {backgroundColor: '#C4C5C3'}]}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={[styles.headerText, {color: '#333'}]}>
                      Layer
                    </Text>
                    <GlobalTextInput
                      placeholder="Enter Layer Name"
                      value={layer.toString()}
                      onChangeText={text => {
                        setLayer(Number(text));
                        totalLayQtyCalculation(Number(text));
                      }}
                      keyboardType="numeric"
                      width={width * 0.25}
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={[styles.headerText, {color: '#333'}]}>
                      Cut Pc
                    </Text>
                    <GlobalTextInput
                      placeholder="Enter Cut Pc Qty"
                      value={cutpc.toString()}
                      onChangeText={text => {
                        setCutpc(Number(text));
                        totalShortQtyCalculation(Number(text));
                      }}
                      keyboardType="numeric"
                      width={width * 0.25}
                    />
                  </View>

                  <View style={styles.column}>
                    <Text style={[styles.headerText, {color: '#333'}]}>
                      Remarks
                    </Text>
                    <GlobalTextInput
                      placeholder="Enter Remarks"
                      value={remarks}
                      onChangeText={setRemarks}
                      width={width * 0.25}
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={[styles.headerText, {color: '#333'}]}>
                      Total Lay
                    </Text>
                    <GlobalTextInput
                      placeholder="Enter Remarks"
                      value={totalLay.toString()}
                      onChangeText={() => null}
                      editable={false}
                      width={width * 0.25}
                    />
                  </View>

                  <View style={styles.column}>
                    <Text style={[styles.headerText, {color: '#333'}]}>
                      Total Used YDS
                    </Text>
                    <GlobalTextInput
                      placeholder="Enter Remarks"
                      value={totalUsedQty.toString()}
                      onChangeText={() => null}
                      editable={false}
                      width={width * 0.25}
                    />
                  </View>

                  <View style={styles.column}>
                    <Text style={[styles.headerText, {color: '#333'}]}>
                      Short (YDS):
                    </Text>
                    <GlobalTextInput
                      placeholder="Enter Remarks"
                      value={short.toString()}
                      onChangeText={() => null}
                      editable={false}
                      width={width * 0.25}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                marginTop: height * 0.02,
              }}>
              <GlobalButton
                title={layer && cutpc ? 'Submit' : 'Enter layer and Cut Pc Qty'}
                onPress={HandleLaywiseCutDetails}
                disabled={!layer && !cutpc}
                buttonStyle={{
                  backgroundColor: layer && cutpc ? '#6200EE' : '#BDBDBD',
                }}
              />

              <View
                style={{
                  backgroundColor: '#f8f9fa',
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#343a40',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    textAlign: 'center',
                  }}>
                  Laywise Cut Details
                </Text>

                {/* Table Header */}
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#6c757d',
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: height * 0.012,
                    }}>
                    ROLL QR
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: height * 0.012,
                    }}>
                    SHADE COLOR
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: height * 0.012,
                    }}>
                    ROLL NO
                  </Text>
                </View>

                {/* Table Rows */}
                {detailData.map((detail, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: index % 2 === 0 ? '#e9ecef' : '#f8f9fa', // Alternating row colors
                      paddingVertical: 10,
                      borderBottomWidth:
                        index === detailData.length - 1 ? 0 : 1,
                      borderBottomColor: '#dee2e6',
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        color: '#495057',
                        textAlign: 'center',
                        fontSize: height * 0.012,
                      }}>
                      {detail.RollCode}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        color: '#495057',
                        textAlign: 'center',
                        fontSize: height * 0.012,
                      }}>
                      {detail.Color}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        color: '#495057',
                        textAlign: 'center',
                        fontSize: height * 0.012,
                      }}>
                      {detail.Consignment}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
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

  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },

  heading_Text: {fontSize: 16, fontWeight: 'bold', color: '#333'},
  Heading_Value: {fontSize: 16, color: '#555', textAlign: 'center'},

  containerHeader: {
    padding: 16, // Add padding around the container
    backgroundColor: '#3C8DBC', // Light background color for contrast
    borderRadius: 8, // Rounded corners
    shadowColor: '#000', // Shadow for elevation
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between columns
    marginBottom: 16, // Space between rows
  },
  column: {
    flex: 1, // Allow columns to take equal width
    alignItems: 'flex-start', // Align text to the start
  },

  cell: {
    fontSize: width * 0.02,
    color: '#333',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    width: width * 0.15,
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: width * 0.02,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
  },
});

export default LaywiseCuttingEdit;
