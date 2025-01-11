import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native';

interface StyledInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  secureTextEntry?: boolean;
  width?: number; // Optional width prop
}

const StyledInput: React.FC<StyledInputProps> = ({
  placeholder,
  value,
  onChangeText,
  errorMessage,
  secureTextEntry = false,
  width, // Get width from props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, {width: width || styles.container.width}]}>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          errorMessage ? styles.inputError : null,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#aaa"
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const {width: screenWidth, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: screenWidth * 0.9, // Default width (if no width prop is passed)
    alignSelf: 'center',
  },
  input: {
    height: height * 0.06,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: screenWidth * 0.03,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  inputFocused: {
    borderColor: '#007BFF',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: screenWidth * 0.025,
    marginTop: 2,
    paddingHorizontal: 3,
  },
});

export default StyledInput;
