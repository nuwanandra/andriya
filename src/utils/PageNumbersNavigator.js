import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const PageNumbersNavigator = ({currentPage, totalPages, onPageChange}) => {
  const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      {pageNumbers.map(pageNumber => (
        <TouchableOpacity
          key={pageNumber}
          style={[
            styles.pageNumberButton,
            pageNumber === currentPage && styles.activeButton,
          ]}
          onPress={() => onPageChange(pageNumber)}>
          <Text style={styles.pageNumberText}>{pageNumber}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pageNumberButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  activeButton: {
    backgroundColor: 'gray',
  },
  pageNumberText: {
    color: 'black',
  },
});

export default PageNumbersNavigator;
