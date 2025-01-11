import {StyleSheet, Dimensions} from 'react-native';

// Get the device's screen width and height
const {width, height} = Dimensions.get('window');

const globalStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#121212' : '#f8f8f8',
      padding: 16,
    },
    text: {
      fontSize: width * 0.04,
      color: theme === 'dark' ? '#ffffff' : '#333333',
    },
    primary_button: {
      backgroundColor: theme === 'dark' ? '#1f78d1' : '#007bff',
      //padding: height * 0.005,
      borderRadius: width * 0.01,
      alignItems: 'center',
      paddingHorizontal: height * 0.01,
      paddingVertical: height * 0.01,
    },
    primary_buttonText: {
      color: theme === 'dark' ? '#ffffff' : '#ffffff',
      fontSize: width * 0.045,
      fontFamily: 'WorkSans-Regular',
    },

    // Cancel button styles
    cancel_button: {
      backgroundColor: theme === 'dark' ? '#d9534f' : '#f44336',
      padding: height * 0.015,
      borderRadius: width * 0.01,
      alignItems: 'center',
      //width: width * 0.4,
    },
    cancel_buttonText: {
      color: theme === 'dark' ? '#ffffff' : '#000000',
      fontSize: width * 0.03,
      fontWeight: 'bold',
    },

    // Two sections in a row
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    section: {
      width: width * 0.5,
      padding: 10,
      alignItems: 'center',
    },
    sectionText: {
      padding: 10,
      fontSize: width * 0.04,
      color: theme === 'dark' ? '#ffffff' : '#333333',
      fontFamily: 'WorkSans-Regular',
    },
    // login pages
    login_container: {
      flex: 1,
      backgroundColor: '#3D30A2',
    },
    login_header: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3D30A2',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
    },
    login_headerText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
    },
    login_subHeaderText: {
      fontSize: 16,
      color: '#E5E5E5',
      marginTop: 8,
    },
    login_formContainer: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    login_loginButton: {
      backgroundColor: '#3D30A2',
      borderRadius: 5,
      paddingVertical: '2%',
      alignItems: 'center',
      marginTop: 20,
      width: width * 0.9,
      alignSelf: 'center',
    },
    login_loginButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    login_forgotPasswordText: {
      color: '#3D30A2',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 15,
    },
    // -----------------------------spinner------------------------
    spinnerTextStyle: {
      color: '#FFF',
    },
    //#region Dropdown area
    // -----------------------------Dropdown------------------------
    // dropdown: {
    //   height: 50,
    //   width: width * 0.45,
    //   borderColor: 'gray',
    //   borderWidth: 0.5,
    //   borderRadius: 8,
    //   paddingHorizontal: 8,
    //   backgroundColor: '#fff',
    // },
    // selectedTextStyle: {
    //   fontSize: 16,
    // },
    // inputSearchStyle: {
    //   height: 40,
    //   fontSize: 16,
    //   color: '#000',
    // },
    // iconStyle: {
    //   width: 20,
    //   height: 20,
    // },
    // -----------------------------End Dropdown------------------------
    //#endregion
  });

export default globalStyles;
