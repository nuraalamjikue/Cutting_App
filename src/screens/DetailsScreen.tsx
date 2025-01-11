import React from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../components/styles/globalStyles';

const DetailsScreen = ({navigation}: any) => {
  const scheme = useColorScheme() || 'light'; // Fallback to 'light' if undefined
  const styles = globalStyles(scheme); // Dynamically generate styles

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* First section with Icon Button */}
        <View style={styles.section}>
          <Text style={styles.sectionText}>Section 1</Text>

          <Icon.Button
            name="thumbs-up"
            size={20}
            style={styles.primary_button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.cancel_buttonText}>Login with Facebook</Text>
          </Icon.Button>
        </View>

        {/* Second section with Cancel Icon Button */}
        <View style={styles.section}>
          <Text style={styles.sectionText}>Section 2</Text>
          <Icon.Button
            name="facebook"
            size={20}
            style={styles.cancel_button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.cancel_buttonText}>Login with Facebook</Text>
          </Icon.Button>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;
