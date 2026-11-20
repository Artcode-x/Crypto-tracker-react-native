import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chartOuterContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 12,
    position: 'relative',
  },
  noDataContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
