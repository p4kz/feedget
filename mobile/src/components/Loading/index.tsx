import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size='small'
        color={theme.colors.text_on_brand_color} 
      />
    </View>
  );
}