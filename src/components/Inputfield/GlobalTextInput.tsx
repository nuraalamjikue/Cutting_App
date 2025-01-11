import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Text,
  Dimensions,
} from 'react-native';
interface GlobalTextInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  secureTextEntry?: boolean;
  width?: number;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'visible-password'; // Optional keyboard type
}

const GlobalTextInput: React.FC<GlobalTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  errorMessage,
  secureTextEntry = false,
  width,
  keyboardType,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#aaa"
        keyboardType={keyboardType}
        {...rest}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};
const {width: screenWidth, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  errorText: {
    color: '#FF0000',
    fontSize: screenWidth * 0.025,
    marginTop: 2,
    paddingHorizontal: 3,
  },
});

export default GlobalTextInput;
