import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function Widget() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hello React-Native
      </Text>
    </View>
  );
}