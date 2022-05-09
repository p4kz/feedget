import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  options: {
    width: '100%',
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 20,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary
  }
  
});