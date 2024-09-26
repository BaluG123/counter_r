import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, Alert, Modal, StyleSheet, Platform, BackHandler,Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';


const ListScreen = () => {
  const bannerRef = useRef<BannerAd>(null);
  const [counters, setCounters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  useForeground(() => {
    if (Platform.OS === 'android') {
      bannerRef.current?.load();
    }
  });



  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-2627956667785383/2591700513';


  const borderColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#33FFF1', '#F1FF33'];

  useEffect(() => {
    loadCounters();
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      "Exit",
      "Are you sure you want to Exit?",
      [
        {
          text: "Cancel",
          onPress: () => null, // Do nothing
          style: "cancel"
        },
        { text: "OK", onPress: () => BackHandler.exitApp() } // Exit the app
      ],
      { cancelable: false }
    );
    return true; // Prevent default behavior
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
  
    // Cleanup the event listener
    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadCounters();
    }, [])
  );


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

  const saveCounters = async (updatedCounters) => {
    try {
      await AsyncStorage.setItem('counters', JSON.stringify(updatedCounters));
      setCounters(updatedCounters);
    } catch (error) {
      console.log('Failed to save counters:', error);
    }
  };

  const handleAddCounter = () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter a title.');
      return;
    }

    const newCounter = {
      id: Math.random().toString(),
      title,
      count: count || '0',
      date: date.toLocaleString(), // Date and time
    };

    const updatedCounters = [newCounter, ...counters];
    saveCounters(updatedCounters);
    resetModal();
  };

  const handleEditCounter = () => {
    const updatedCounters = counters.map((counter) =>
      counter.id === selectedCounter.id ? { ...counter, title, count, date: date.toLocaleString() } : counter
    );
    saveCounters(updatedCounters);
    resetModal();
  };

  const resetModal = () => {
    setTitle('');
    setCount('');
    setDate(new Date());
    setModalVisible(false);
    setSelectedCounter(null);
  };

  const deleteCounter = (id) => {
    Alert.alert(
      'Delete Counter',
      'Are you sure you want to delete this counter?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedCounters = counters.filter((counter) => counter.id !== id);
            saveCounters(updatedCounters);
          },
        },
      ]
    );
  };

  const openAddModal = () => {
    setEditMode(false);
    resetModal();
    setModalVisible(true);
  };

  const openEditModal = (counter) => {
    setSelectedCounter(counter);
    setTitle(counter.title);
    setCount(counter.count);
    setEditMode(true);
    
    // Make sure the date is converted to a valid Date object
    const parsedDate = new Date(counter.date);
    
    if (!isNaN(parsedDate)) {
      setDate(parsedDate);
    } else {
      setDate(new Date()); // If the date is invalid, set the current date as a fallback
    }
  
    setModalVisible(true);
  };

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
    if (!isOpen) {
      openAddModal();
    }
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListMessage}>
        <Text style={styles.emptyListText}>No counter added yet. Click the plus button to add a new counter.</Text>
      </View>
    );
  };

  const renderCounter = ({ item, index }) => (
    <View style={[styles.counterItem, { borderLeftColor: borderColors[index % borderColors.length], borderLeftWidth: 1.5,borderBottomColor:'gray',borderBottomWidth:1,borderTopColor:'gray',borderTopWidth:1.5,borderRightColor:'gray',borderRightWidth:1.5 }]}>
      <TouchableOpacity
        style={styles.counterText}
        onPress={() => navigation.navigate('Detail', { counter: item })}
      >
        <Text style={styles.counterTitle}>{item.title}</Text>
        <Text style={{color:'black'}}><Icon name="podium" size={20} color="#1da1f2" /> {item.count}</Text>
        <Text style={{color:'black'}}><Icon name="calendar" size={20} color="#1da1f2" /> {item.date}</Text>
      </TouchableOpacity>

      {/* Edit and Delete Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Icon name="create" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteCounter(item.id)}>
          <Icon name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Add Counter Button */}
      {/* <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text style={styles.addButtonText}>Add Counter</Text>
      </TouchableOpacity> */}

      {/* List of Counters */}
      <View style={styles.bannerAd}>
      <BannerAd
      ref={bannerRef}
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
      </View>
      <FlatList
        data={counters}
        keyExtractor={(item) => item.id}
        renderItem={renderCounter}
        ListEmptyComponent={renderEmptyList} // Render the empty list message

      />
            <TouchableOpacity
        style={styles.fab}
        onPress={toggleMenu}
      >
        <Animated.View style={rotation}>
          <Icon name="add" size={24} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={resetModal}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{editMode ? 'Edit Counter' : 'Add Counter'}</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="gray"
        style={[styles.input, { color: 'black' }]} // Title in black color
      />
      <TextInput
        placeholder="Count"
        value={count}
        onChangeText={setCount}
        keyboardType="numeric"
        placeholderTextColor="gray"
        style={styles.input}
      />

      {/* Date and Time Picker */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setOpenDatePicker(true)}>
        <Text style={styles.dateText}><Icon name="calendar" size={20} color="white" />   {`${date.toLocaleString()}`}</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={openDatePicker}
        date={date} // Ensure this is a Date object
        onConfirm={(selectedDate) => {
          setOpenDatePicker(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
        mode="datetime" // Now selecting both date and time
      />

      <View style={styles.buttonGroup}>
      <TouchableOpacity
    style={[styles.button, { backgroundColor: 'red' }]}
    onPress={resetModal}
  >
    <Text style={styles.buttonText}>Cancel</Text>
  </TouchableOpacity>
      <TouchableOpacity
    style={[styles.button, { backgroundColor: '#007bff' }]}
    onPress={editMode ? handleEditCounter : handleAddCounter}
  >
    <Text style={styles.buttonText}>{editMode ? 'Save Changes' : 'Add Counter'}</Text>
  </TouchableOpacity>


      </View>
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
  addButton: {
    backgroundColor: 'green',
    padding: wp('2%'),
    borderRadius: 5,
    marginBottom: hp('2%'),
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: wp('5%'),
  },
  counterItem: {
    backgroundColor: '#fff',
    padding: wp('4%'),
    marginBottom: hp('1%'),
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 5, // This will be overridden in the renderCounter function
  },
  counterText: {
    flex: 1,
    flexDirection: 'column',
  },
  counterTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: 'black',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('20%'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: wp('5%'),
    borderRadius: 10,
    width: wp('85%'),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp('3%'),
    marginBottom: hp('2%'),
    borderRadius: 5,
    fontSize: wp('4.5%'),
    color: 'black',
    width: '100%',
  },
  dateButton: {
    backgroundColor: 'green',
    padding: wp('3%'),
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: hp('2%'),
    width:wp('75%'),
  },
  dateText: {
    color: '#fff',
    fontSize: wp('4%'),
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'), // Adjust margin based on screen height
    width:wp('77%')
  },
  button: {
    flex: 1,
    padding: hp('1.5%'), // Adjust padding based on screen height
    marginHorizontal: wp('1%'), // Adjust margin based on screen width
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Border color
    paddingHorizontal:wp('5%')
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: wp('4%'), // Adjust font size based on screen width
  },
  fab: {
    position: 'absolute',
    width: wp('15%'),
    height: wp('15%'), // Make height equal to width for a circular shape
    alignItems: 'center',
    justifyContent: 'center',
    right: wp('8%'),
    bottom: hp('10%'),
    backgroundColor: '#1da1f2',
    borderRadius: wp('7.5%'), // Half of the width for a circular shape
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyListMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:hp('30%')
  },
  
  emptyListText: {
    fontSize: wp('5%'),
    color: 'gray',
    textAlign: 'center',
    justifyContent:'center'
  },
  bannerAd: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ListScreen;
