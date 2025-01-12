import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NavigationProps, RootStackParamList} from '../ParamList';

type QRCodescannerScreenRouteProp = RouteProp<
  RootStackParamList,
  'QRCodescannerSceen'
>;

type QRCodescannerSceenProps = {
  route: QRCodescannerScreenRouteProp;
};

const QRCodescannerSceen: React.FC<QRCodescannerSceenProps> = ({route}) => {
  const {id} = route.params;
  const [isCameraAuthorized, setIsCameraAuthorized] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'This app requires camera access to scan QR codes.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setIsCameraAuthorized(true);
          } else {
            Alert.alert('Permission Denied', 'Camera permission is required.');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        setIsCameraAuthorized(true); // iOS handles permissions via Info.plist
      }
    };

    requestCameraPermission();
  }, []);

  const onSuccess = (e: {data: string}) => {
    Alert.alert('Data received' + e.data);
    const QrCode = e.data;
    navigation.navigate('LaywiseCuttingEdit', {id: id || 0, QrCode: QrCode});
  };

  if (!isCameraAuthorized) {
    return (
      <View style={styles.centerText}>
        <Text style={styles.textBold}>
          Please grant camera permission to use this feature.
        </Text>
      </View>
    );
  }

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      // topContent={
      //   <View>
      //     <Text style={styles.centerText}>
      //       Go to{' '}
      //       <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
      //       your computer and scan the QR code.
      //     </Text>
      //   </View>
      // }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRCodescannerSceen;
