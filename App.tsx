import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const App = () => {
  const [counters, setCounters] = useState([]);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);

  useEffect(() => {
    loadCounters();
  }, []);

  const loadCounters = async () => {
    try {
      const storedCounters = await AsyncStorage.getItem('counters');
      if (storedCounters) {
        setCounters(JSON.parse(storedCounters));
      }
    } catch (error) {
      console.log('Failed to load counters:', error);
    }
  };

  const saveCounters = async (newCounters) => {
    try {
      await AsyncStorage.setItem('counters', JSON.stringify(newCounters));
      setCounters(newCounters);
    } catch (error) {
      console.log('Failed to save counters:', error);
    }
  };

  const addCounter = () => {
    if (title) {
      const newCounter = {
        id: Date.now().toString(),
        title,
        count,
        date: date.toLocaleDateString(),
      };
      const newCounters = [...counters, newCounter];
      saveCounters(newCounters);
      setTitle('');
      setCount(0);
      setDate(new Date());
    } else {
      Alert.alert('Please enter a title');
    }
  };

  const deleteCounter = (id) => {
    Alert.alert(
      "Delete Counter", // Title
      "Are you sure you want to delete this counter?", // Message
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const newCounters = counters.filter((counter) => counter.id !== id);
            saveCounters(newCounters);
          },
          style: "destructive", // For iOS, it gives a red color to the "Yes" button
        },
      ]
    );
  };
  

  const incrementCount = (counter) => {
    const updatedCounters = counters.map((item) =>
      item.id === counter.id ? { ...item, count: item.count + 1 } : item
    );
    saveCounters(updatedCounters);
  };


  const openEditModal = (counter) => {
    setSelectedCounter(counter);
    setTitle(counter.title);
    setCount(counter.count);
    
    // Make sure the date is converted to a valid Date object
    const parsedDate = new Date(counter.date);
    
    if (!isNaN(parsedDate)) {
      setDate(parsedDate);
    } else {
      setDate(new Date()); // If the date is invalid, set the current date as a fallback
    }
  
    setIsEditModalVisible(true);
  };
  

  const saveEdit = () => {
    const updatedCounters = counters.map((item) =>
      item.id === selectedCounter.id
        ? { ...item, title, count, date: date.toLocaleDateString() }
        : item
    );
    saveCounters(updatedCounters);
    setIsEditModalVisible(false);
    setSelectedCounter(null);
  };

  const renderCounter = ({ item }) => (
    <View style={styles.counterItem}>
      <Text style={styles.counterTitle}>{item.title}</Text>
      <Text style={{color:"black"}}>{item.count}</Text>
      <Text style={{color:"black"}}>{item.date}</Text>
      <View style={styles.counterActions}>
        <TouchableOpacity onPress={() => incrementCount(item)}>
          <Icon name="add-circle" size={wp('8%')} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Icon name="create" size={wp('8%')} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteCounter(item.id)}>
          <Icon name="trash" size={wp('8%')} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
  <Text style={styles.headerText}>Counter</Text>
</View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          // style={styles.input}
          style={styles.inputMultiline}
          placeholderTextColor={'black'}
          multiline={true}
          maxLength={50}
        />
        <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
          <Text style={styles.dateButton}>Select Date</Text>
        </TouchableOpacity>
        <Button title="Add Counter" onPress={addCounter} />
      </View>
      <FlatList
        data={counters}
        keyExtractor={(item) => item.id}
        renderItem={renderCounter}
      />

      <DatePicker
        modal
        open={isDatePickerVisible}
        date={date}
        onConfirm={(selectedDate) => {
          setIsDatePickerVisible(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setIsDatePickerVisible(false);
        }}
      />

      <Modal visible={isEditModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{color:"black"}}>Edit Counter</Text>
            <TextInput
              placeholder="Edit title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholderTextColor={"black"}
            />
            <TextInput
              placeholder="Edit count"
              value={count.toString()}
              onChangeText={(text) => setCount(parseInt(text) || 0)}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor={'black'}
            />
            <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
              <Text style={styles.dateButton}>Edit Date</Text>
            </TouchableOpacity>
            <Button title="Save Changes" onPress={saveEdit}/>
            <Button title="Cancel" onPress={() => setIsEditModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF', // Change this color to your preferred background color
    paddingVertical: hp('1.2%'),  // Vertical padding for height
    alignItems: 'center',  // Center content horizontally
    justifyContent: 'center',  // Center content vertically
    borderRadius: 5,  // Rounded corners
    marginBottom: hp('2%'),  // Space below the header
  },
  headerText: {
    fontSize: wp('5%'),  // Font size
    fontWeight: 'bold',  // Bold font
    color: '#fff',  // White text color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  counterItem: {
    backgroundColor: '#fff',
    padding: wp('5%'),
    marginBottom: hp('1.5%'),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  counterTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: "black",
    width: wp('100%')
  },
  counterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: wp('90%'),
    padding: wp('5%'),
    backgroundColor: '#fff',  // White background for modal content
    borderRadius: 10,  // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,  // Adds shadow for Android
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',  // Light gray border
    borderRadius: 5,
    padding: wp('3%'),
    marginVertical: hp('1%'),
    fontSize: wp('4%'),
    color: '#000',  // Black text color
    backgroundColor: '#f9f9f9',  // Light background for input
  },
  dateButton: {
    padding: wp('3%'),
    fontSize: wp('4%'),
    color: '#007AFF',  // iOS style blue color for date button
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: wp('3%'),
    marginVertical: hp('1%'),
    fontSize: wp('4%'),
    color: '#000',
    backgroundColor: '#f9f9f9',
    height: hp('6%'),  // Adjust height for multiline
    textAlignVertical: 'top',  // Align text to the top
    width:wp('35%')
  },
});

export default App;
