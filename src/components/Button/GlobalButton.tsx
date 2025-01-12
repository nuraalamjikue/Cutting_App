import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';

type GlobalButtonProps = {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  fontSize?: number;
};

const GlobalButton: React.FC<GlobalButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  fontSize,
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        buttonStyle,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
      disabled={disabled}>
      <Text
        style={[
          styles.buttonText,
          {fontSize: fontSize || styles.buttonText.fontSize},
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: height * 0.012,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: height * 0.012,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pressedButton: {
    backgroundColor: '#3700B3',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
});

export default GlobalButton;
