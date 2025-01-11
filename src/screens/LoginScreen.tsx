// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   SafeAreaView,
//   useColorScheme,
//   TouchableOpacity,
// } from 'react-native';
// import {useDispatch} from 'react-redux';
// import {login} from '../redux/slices/authSlice';
// import globalStyles from '../components/styles/globalStyles';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import StyledInput from '../components/Inputfield/StyledInput';

// const LoginScreen = ({navigation}: any) => {
//   const dispatch = useDispatch();
//   const scheme = useColorScheme() || 'light';
//   const styles = globalStyles(scheme);
//   const myIcon1 = <Icon name="comments" size={30} color="#900" />;
//   const handleLogin = () => {
//     dispatch(login({name: 'John Doe', email: 'john.doe@example.com'}));
//   };

//   const [email, setEmail] = useState('');

//   return (
//     <SafeAreaView style={{backgroundColor: '#3D30A2', flex: 1}}>
//       <View style={{backgroundColor: '#3D30A2'}}>
//         <View
//           style={{
//             justifyContent: 'center',
//             alignSelf: 'center',
//             marginTop: '20%',
//             marginBottom: '20%',
//           }}>
//           <TouchableOpacity style={styles.primary_button}>
//             <Text style={styles.primary_buttonText}>Login</Text>
//           </TouchableOpacity>
//         </View>

//         <View
//           style={{
//             backgroundColor: '#fff',
//             height: '90%',
//             borderTopRightRadius: 50,
//             borderTopLeftRadius: 50,
//             alignItems: 'center',
//           }}>
//           <Text style={styles.text}>Welcome to the Home Screen</Text>
//           <View style={{marginTop: '20%', marginBottom: '20%'}}>
//             <StyledInput
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               errorMessage={!email ? 'Email is required' : ''}
//             />

//             <Text>Login Screen</Text>
//             <TouchableOpacity
//               style={styles.primary_button}
//               onPress={() => handleLogin()}>
//               <Text style={styles.primary_buttonText}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slices/authSlice';
import StyledInput from '../components/Inputfield/StyledInput';
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
import {jwtDecode} from 'jwt-decode';
import globalStyles from '../components/styles/globalStyles';
import {instance, instanceERP} from '../Axiosinstance';

interface DecodedToken {
  employeeCode?: string;
  [key: string]: any;
}
const LoginScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const scheme = useColorScheme() || 'light';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employeeCode, setEmployeeCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  console.log('instanceERP' + JSON.stringify(instanceERP));

  const showToast = (type: string, message: string) => {
    Toast.show({
      type,
      text1: message,
      visibilityTime: 2000,
    });
  };

  const handleLogin = async () => {
    if (!employeeCode || !password) {
      showToast('error', 'Please enter both Username and Password');
      return;
    }

    setLoading(true);
    console.log('loading');

    try {
      //console.log('instanceERP:', JSON.stringify(instanceERP)); // Logs the Axios instance
      const response = await instanceERP.post('Login/DoLogin', {
        userName: employeeCode,
        password: password,
      });
      const result: {token?: string; message?: string} = response.data;
      if (result.token) {
        const decoded: DecodedToken = jwtDecode(result.token);
        dispatch(
          login({
            employeeCode: decoded?.username,
            employeeName: decoded?.fullname,
            userID: decoded?.userid,
            token: result.token,
          }),
        );
      } else {
        showToast('error', 'Invalid credentials');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to connect to the server';
      showToast('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles(scheme).login_container}>
      <View style={globalStyles(scheme).login_header}>
        <Text style={globalStyles(scheme).login_headerText}>Welcome Back!</Text>
        <Text style={globalStyles(scheme).login_subHeaderText}>
          Login to continue
        </Text>
      </View>
      <Toast />
      <View style={globalStyles(scheme).login_formContainer}>
        <View style={{marginTop: '30%'}}>
          <StyledInput
            placeholder="Employee Code"
            value={employeeCode}
            onChangeText={setEmployeeCode}
            errorMessage={!employeeCode ? 'Employee code is required' : ''}
          />

          <StyledInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            errorMessage={!password ? 'Password is required' : ''}
          />

          <TouchableOpacity
            style={globalStyles(scheme).login_loginButton}
            onPress={handleLogin}
            disabled={!employeeCode || !password}>
            <Text style={globalStyles(scheme).login_loginButtonText}>
              Login test
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => showToast('info', 'Feature not implemented')}>
            <Text style={globalStyles(scheme).login_forgotPasswordText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {loading && (
            <Spinner
              visible={loading}
              textContent="Loading..."
              textStyle={globalStyles(scheme).spinnerTextStyle}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
