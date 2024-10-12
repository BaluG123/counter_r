import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomAlert = ({visible, title, message, onClose, showIcon = false}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {showIcon && (
            <Icon name="checkmark-circle-outline" size={50} color="#2193b0" />
          )}
          {/* <Icon name="checkmark-circle-outline" size={50} color="#2193b0" /> */}
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: wp('6%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: wp('80%'),
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#2193b0',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  modalMessage: {
    fontSize: wp('4%'),
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  button: {
    backgroundColor: '#2193b0',
    borderRadius: 20,
    padding: wp('3%'),
    elevation: 2,
    minWidth: wp('30%'),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: wp('4%'),
  },
});

export default CustomAlert;
