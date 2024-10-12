// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, FlatList, TouchableOpacity, TextInput, Button, Alert, Modal, StyleSheet, Platform, BackHandler,Animated } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import DatePicker from 'react-native-date-picker';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

// const ListScreen = () => {
//   const bannerRef = useRef<BannerAd>(null);
//   const [counters, setCounters] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedCounter, setSelectedCounter] = useState(null);
//   const [title, setTitle] = useState('');
//   const [count, setCount] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [openDatePicker, setOpenDatePicker] = useState(false);
//   const navigation = useNavigation();
//   const [isOpen, setIsOpen] = useState(false);
//   const animation = useRef(new Animated.Value(0)).current;

//   useForeground(() => {
//     if (Platform.OS === 'android') {
//       bannerRef.current?.load();
//     }
//   });

//   const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-2627956667785383/2591700513';

//   const borderColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#33FFF1', '#F1FF33'];

//   useEffect(() => {
//     loadCounters();
//   }, []);

//   const handleBackPress = () => {
//     Alert.alert(
//       "Exit",
//       "Are you sure you want to Exit?",
//       [
//         {
//           text: "Cancel",
//           onPress: () => null, // Do nothing
//           style: "cancel"
//         },
//         { text: "OK", onPress: () => BackHandler.exitApp() } // Exit the app
//       ],
//       { cancelable: false }
//     );
//     return true; // Prevent default behavior
//   };

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       handleBackPress
//     );

//     // Cleanup the event listener
//     return () => backHandler.remove();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       loadCounters();
//     }, [])
//   );

//   const loadCounters = async () => {
//     try {
//       const storedCounters = await AsyncStorage.getItem('counters');
//       if (storedCounters) {
//         setCounters(JSON.parse(storedCounters));
//       }
//     } catch (error) {
//       console.log('Failed to load counters:', error);
//     }
//   };

//   const saveCounters = async (updatedCounters) => {
//     try {
//       await AsyncStorage.setItem('counters', JSON.stringify(updatedCounters));
//       setCounters(updatedCounters);
//     } catch (error) {
//       console.log('Failed to save counters:', error);
//     }
//   };

//   const handleAddCounter = () => {
//     if (title.trim() === '') {
//       Alert.alert('Error', 'Please enter a title.');
//       return;
//     }

//     const newCounter = {
//       id: Math.random().toString(),
//       title,
//       count: count || '0',
//       date: date.toLocaleString(), // Date and time
//     };

//     const updatedCounters = [newCounter, ...counters];
//     saveCounters(updatedCounters);
//     resetModal();
//   };

//   const handleEditCounter = () => {
//     const updatedCounters = counters.map((counter) =>
//       counter.id === selectedCounter.id ? { ...counter, title, count, date: date.toLocaleString() } : counter
//     );
//     saveCounters(updatedCounters);
//     resetModal();
//   };

//   const resetModal = () => {
//     setTitle('');
//     setCount('');
//     setDate(new Date());
//     setModalVisible(false);
//     setSelectedCounter(null);
//   };

//   const deleteCounter = (id) => {
//     Alert.alert(
//       'Delete Counter',
//       'Are you sure you want to delete this counter?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             const updatedCounters = counters.filter((counter) => counter.id !== id);
//             saveCounters(updatedCounters);
//           },
//         },
//       ]
//     );
//   };

//   const openAddModal = () => {
//     setEditMode(false);
//     resetModal();
//     setModalVisible(true);
//   };

//   const openEditModal = (counter) => {
//     setSelectedCounter(counter);
//     setTitle(counter.title);
//     setCount(counter.count);
//     setEditMode(true);

//     // Make sure the date is converted to a valid Date object
//     const parsedDate = new Date(counter.date);

//     if (!isNaN(parsedDate)) {
//       setDate(parsedDate);
//     } else {
//       setDate(new Date()); // If the date is invalid, set the current date as a fallback
//     }

//     setModalVisible(true);
//   };

//   const toggleMenu = () => {
//     const toValue = isOpen ? 0 : 1;

//     Animated.spring(animation, {
//       toValue,
//       friction: 5,
//       useNativeDriver: true,
//     }).start();

//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       openAddModal();
//     }
//   };

//   const rotation = {
//     transform: [
//       {
//         rotate: animation.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '45deg'],
//         }),
//       },
//     ],
//   };

//   const renderEmptyList = () => {
//     return (
//       <View style={styles.emptyListMessage}>
//         <Text style={styles.emptyListText}>No counter added yet. Click the plus button to add a new counter.</Text>
//       </View>
//     );
//   };

//   const renderCounter = ({ item, index }) => (
//     <View style={[styles.counterItem, { borderLeftColor: borderColors[index % borderColors.length], borderLeftWidth: 1.5,borderBottomColor:'gray',borderBottomWidth:1,borderTopColor:'gray',borderTopWidth:1.5,borderRightColor:'gray',borderRightWidth:1.5 }]}>
//       <TouchableOpacity
//         style={styles.counterText}
//         onPress={() => navigation.navigate('Detail', { counter: item })}
//       >
//         <Text style={styles.counterTitle}>{item.title}</Text>
//         <Text style={{color:'black'}}><Icon name="podium" size={20} color="#1da1f2" /> {item.count}</Text>
//         <Text style={{color:'black'}}><Icon name="calendar" size={20} color="#1da1f2" /> {item.date}</Text>
//       </TouchableOpacity>

//       {/* Edit and Delete Buttons */}
//       <View style={styles.actionButtons}>
//         <TouchableOpacity onPress={() => openEditModal(item)}>
//           <Icon name="create" size={24} color="green" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => deleteCounter(item.id)}>
//           <Icon name="trash" size={24} color="red" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Add Counter Button */}
//       {/* <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
//         <Text style={styles.addButtonText}>Add Counter</Text>
//       </TouchableOpacity> */}

//       {/* List of Counters */}
//       <View style={styles.bannerAd}>
//       <BannerAd
//       ref={bannerRef}
//       unitId={adUnitId}
//       size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//     />
//       </View>
//       <FlatList
//         data={counters}
//         keyExtractor={(item) => item.id}
//         renderItem={renderCounter}
//         ListEmptyComponent={renderEmptyList} // Render the empty list message

//       />
//             <TouchableOpacity
//         style={styles.fab}
//         onPress={toggleMenu}
//       >
//         <Animated.View style={rotation}>
//           <Icon name="add" size={24} color="#FFF" />
//         </Animated.View>
//       </TouchableOpacity>
// <Modal
//   visible={modalVisible}
//   animationType="slide"
//   transparent={true}
//   onRequestClose={resetModal}
// >
//   <View style={styles.modalContainer}>
//     <View style={styles.modalContent}>
//       <Text style={styles.modalTitle}>{editMode ? 'Edit Counter' : 'Add Counter'}</Text>

//       <TextInput
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//         placeholderTextColor="gray"
//         style={[styles.input, { color: 'black' }]} // Title in black color
//       />
//       <TextInput
//         placeholder="Count"
//         value={count}
//         onChangeText={setCount}
//         keyboardType="numeric"
//         placeholderTextColor="gray"
//         style={styles.input}
//       />

//       {/* Date and Time Picker */}
//       <TouchableOpacity style={styles.dateButton} onPress={() => setOpenDatePicker(true)}>
//         <Text style={styles.dateText}><Icon name="calendar" size={20} color="white" />   {`${date.toLocaleString()}`}</Text>
//       </TouchableOpacity>

//       <DatePicker
//         modal
//         open={openDatePicker}
//         date={date} // Ensure this is a Date object
//         onConfirm={(selectedDate) => {
//           setOpenDatePicker(false);
//           setDate(selectedDate);
//         }}
//         onCancel={() => {
//           setOpenDatePicker(false);
//         }}
//         mode="datetime" // Now selecting both date and time
//       />

//       <View style={styles.buttonGroup}>
//       <TouchableOpacity
//     style={[styles.button, { backgroundColor: 'red' }]}
//     onPress={resetModal}
//   >
//     <Text style={styles.buttonText}>Cancel</Text>
//   </TouchableOpacity>
//       <TouchableOpacity
//     style={[styles.button, { backgroundColor: '#007bff' }]}
//     onPress={editMode ? handleEditCounter : handleAddCounter}
//   >
//     <Text style={styles.buttonText}>{editMode ? 'Save Changes' : 'Add Counter'}</Text>
//   </TouchableOpacity>

//       </View>
//     </View>
//   </View>
// </Modal>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//   },
//   addButton: {
//     backgroundColor: 'green',
//     padding: wp('2%'),
//     borderRadius: 5,
//     marginBottom: hp('2%'),
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: wp('5%'),
//   },
//   counterItem: {
//     backgroundColor: '#fff',
//     padding: wp('4%'),
//     marginBottom: hp('1%'),
//     borderRadius: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderLeftWidth: 5, // This will be overridden in the renderCounter function
//   },
//   counterText: {
//     flex: 1,
//     flexDirection: 'column',
//   },
//   counterTitle: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: wp('20%'),
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: wp('5%'),
//     borderRadius: 10,
//     width: wp('85%'),
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: wp('6%'),
//     fontWeight: 'bold',
//     marginBottom: hp('2%'),
//     color: 'black',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: wp('3%'),
//     marginBottom: hp('2%'),
//     borderRadius: 5,
//     fontSize: wp('4.5%'),
//     color: 'black',
//     width: '100%',
//   },
//   dateButton: {
//     backgroundColor: 'green',
//     padding: wp('3%'),
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//     width:wp('75%'),
//   },
//   dateText: {
//     color: '#fff',
//     fontSize: wp('4%'),
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: hp('1%'), // Adjust margin based on screen height
//     width:wp('77%')
//   },
//   button: {
//     flex: 1,
//     padding: hp('1.5%'), // Adjust padding based on screen height
//     marginHorizontal: wp('1%'), // Adjust margin based on screen width
//     borderRadius: 5,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc', // Border color
//     paddingHorizontal:wp('5%')
//   },
//   buttonText: {
//     color: '#fff', // Text color
//     fontSize: wp('4%'), // Adjust font size based on screen width
//   },
//   fab: {
//     position: 'absolute',
//     width: wp('15%'),
//     height: wp('15%'), // Make height equal to width for a circular shape
//     alignItems: 'center',
//     justifyContent: 'center',
//     right: wp('8%'),
//     bottom: hp('10%'),
//     backgroundColor: '#1da1f2',
//     borderRadius: wp('7.5%'), // Half of the width for a circular shape
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   emptyListMessage: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical:hp('30%')
//   },

//   emptyListText: {
//     fontSize: wp('5%'),
//     color: 'gray',
//     textAlign: 'center',
//     justifyContent:'center'
//   },
// bannerAd: {
//   alignItems: 'center',
//   marginBottom: 10,
// },
// });

// export default ListScreen;

//***** avbove code is working perfectly fine */
// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   Modal,
//   StyleSheet,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Animated, {
//   FadeIn,
//   FadeOut,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
//   withSpring,
//   Layout,
// } from 'react-native-reanimated';
// import {Swipeable} from 'react-native-gesture-handler';
// import DatePicker from 'react-native-date-picker';
// import {loadCounters, saveCounters} from '../utils/jsonStorageUtility';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
//   useForeground,
// } from 'react-native-google-mobile-ads';
// import LinearGradient from 'react-native-linear-gradient';
// import {SwipeListView} from 'react-native-swipe-list-view';

// const adUnitId = __DEV__
//   ? TestIds.ADAPTIVE_BANNER
//   : 'ca-app-pub-2627956667785383/2591700513';

// const ListScreen = () => {
//   const bannerRef = useRef(null);
//   const [counters, setCounters] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedCounter, setSelectedCounter] = useState(null);
//   const [title, setTitle] = useState('');
//   const [count, setCount] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [openDatePicker, setOpenDatePicker] = useState(false);
//   const navigation = useNavigation();

//   // Create shared values for modal opacity and FAB scale
//   const modalOpacity = useSharedValue(0);
//   const scaleAdd = useSharedValue(1);

//   useEffect(() => {
//     loadCountersFromStorage();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       loadCountersFromStorage();
//     }, []),
//   );

//   const borderColors = [
//     '#FF6B6B', // Soft Red
//     '#FFD93D', // Warm Yellow
//     '#6BCB77', // Fresh Green
//     '#4D96FF', // Calm Blue
//     '#FFB5E8', // Light Pink
//     '#845EC2', // Deep Purple
//     '#FFC75F', // Sunrise Orange
//     '#2D98DA', // Ocean Blue
//     '#F9A8D4', // Rosy Pink
//     '#F98404', // Tangerine
//     '#5D9CEC', // Sky Blue
//     '#2ECC71', // Emerald Green
//     '#F39C12', // Bright Amber
//     '#9B59B6', // Amethyst
//     '#1ABC9C', // Turquoise
//     '#D4AC0D', // Goldenrod
//     '#FF5733', // Vivid Orange
//     '#3498DB', // Bold Blue
//     '#D35400', // Pumpkin Orange
//     '#A569BD', // Lavender Purple
//   ];

//   const loadCountersFromStorage = async () => {
//     const loadedCounters = await loadCounters();
//     setCounters(loadedCounters);
//   };

//   const handleAddCounter = async () => {
//     if (title.trim() === '') {
//       Alert.alert('Error', 'Please enter a title.');
//       return;
//     }

//     const newCounter = {
//       id: Math.random().toString(),
//       title,
//       count: count || '0',
//       date: date.toLocaleString(),
//     };

//     const updatedCounters = [newCounter, ...counters];
//     await saveCounters(updatedCounters);
//     setCounters(updatedCounters);
//     resetModal();
//   };

//   const handleEditCounter = async () => {
//     const updatedCounters = counters.map(counter =>
//       counter.id === selectedCounter.id
//         ? {...counter, title, count, date: date.toLocaleString()}
//         : counter,
//     );
//     await saveCounters(updatedCounters);
//     setCounters(updatedCounters);
//     resetModal();
//   };

//   const resetModal = () => {
//     setTitle('');
//     setCount('');
//     setDate(new Date());
//     setModalVisible(false);
//     setSelectedCounter(null);
//     modalOpacity.value = withTiming(0, {duration: 300}); // Fade out effect when modal is closed
//   };

//   const deleteCounter = async id => {
//     Alert.alert(
//       'Delete Counter',
//       'Are you sure you want to delete this counter?',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             const updatedCounters = counters.filter(
//               counter => counter.id !== id,
//             );
//             await saveCounters(updatedCounters);
//             setCounters(updatedCounters);
//           },
//         },
//       ],
//     );
//   };

//   const openAddModal = () => {
//     setEditMode(false);
//     resetModal();
//     setModalVisible(true);
//     modalOpacity.value = withTiming(1, {duration: 300}); // Fade in effect
//   };

//   const openEditModal = counter => {
//     setSelectedCounter(counter);
//     setTitle(counter.title);
//     setCount(counter.count);
//     setEditMode(true);

//     const parsedDate = new Date(counter.date);
//     if (!isNaN(parsedDate)) {
//       setDate(parsedDate);
//     } else {
//       setDate(new Date());
//     }

//     setModalVisible(true);
//     modalOpacity.value = withTiming(1, {duration: 300}); // Fade in effect
//   };

//   // Use an animated style for the modal
//   const modalStyle = useAnimatedStyle(() => {
//     return {
//       opacity: modalOpacity.value,
//     };
//   });

//   // Use an animated style for the FAB
//   const addButtonStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{scale: scaleAdd.value}],
//     };
//   });

//   const renderCounter = ({item, index}) => (
//     <Animated.View
//       entering={FadeIn.delay(index * 100).springify()}
//       exiting={FadeOut}
//       layout={Layout.springify()}>
//       <LinearGradient
//         colors={['#ffffff', '#f0f0f0']}
//         style={[
//           styles.counterItem,
//           {borderLeftColor: borderColors[index % borderColors.length]},
//         ]}>
//         <TouchableOpacity
//           style={styles.counterText}
//           onPress={() =>
//             navigation.navigate('Detail', {
//               counter: item,
//               onGoBack: loadCountersFromStorage,
//             })
//           }>
//           <Text style={styles.counterTitle}>{item.title}</Text>
//           <View style={styles.counterInfo}>
//             <Icon name="trophy-outline" size={20} color="#1da1f2" />
//             <Text style={styles.counterCount}>{item.count}</Text>
//           </View>
//           <View style={styles.counterInfo}>
//             <Icon name="calendar-outline" size={20} color="#1da1f2" />
//             <Text style={styles.counterDate}>{item.date}</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => openEditModal(item)}>
//           <Icon name="create-outline" size={24} color="#4CAF50" />
//         </TouchableOpacity>
//       </LinearGradient>
//     </Animated.View>
//   );

//   const renderHiddenItem = (data, rowMap) => (
//     <View style={styles.rowBack}>
//       <TouchableOpacity
//         style={[styles.backRightBtn, styles.backRightBtnRight]}
//         onPress={() => deleteCounter(data.item.id)}>
//         <Icon name="trash-outline" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );

//   const renderEmptyList = () => (
//     <View style={styles.emptyListMessage}>
//       <Text style={styles.emptyListText}>
//         No counter added yet. Click the plus button to add a new counter.
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <SwipeListView
//         data={counters}
//         renderItem={renderCounter}
//         renderHiddenItem={renderHiddenItem}
//         rightOpenValue={-75}
//         previewRowKey={'0'}
//         previewOpenValue={-40}
//         previewOpenDelay={3000}
//         friction={1000}
//         tension={40}
//         ListEmptyComponent={renderEmptyList}
//         keyExtractor={item => item.id}
//       />
//       <Animated.View style={[styles.fab, addButtonStyle]}>
//         <TouchableOpacity
//           onPress={() => {
//             scaleAdd.value = withSpring(1.2, {}, () => {
//               scaleAdd.value = withSpring(1);
//             });
//             openAddModal();
//           }}>
//           <Icon name="add" size={24} color="#FFF" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Modal
//         visible={modalVisible}
//         animationType="none" // Disable default animation
//         transparent={true}
//         onRequestClose={resetModal}>
//         <Animated.View style={[styles.modalContainer, modalStyle]}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>
//               {editMode ? 'Edit Counter' : 'Add Counter'}
//             </Text>

//             <TextInput
//               placeholder="Title"
//               value={title}
//               onChangeText={setTitle}
//               placeholderTextColor="gray"
//               style={[styles.input, {color: 'black'}]}
//             />
//             <TextInput
//               placeholder="Count"
//               value={count}
//               onChangeText={setCount}
//               keyboardType="numeric"
//               placeholderTextColor="gray"
//               style={styles.input}
//             />

//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={() => setOpenDatePicker(true)}>
//               <Text style={styles.dateText}>
//                 <Icon name="calendar" size={20} color="white" />{' '}
//                 {`${date.toLocaleString()}`}
//               </Text>
//             </TouchableOpacity>

//             <DatePicker
//               modal
//               open={openDatePicker}
//               date={date}
//               onConfirm={selectedDate => {
//                 setOpenDatePicker(false);
//                 setDate(selectedDate);
//               }}
//               onCancel={() => {
//                 setOpenDatePicker(false);
//               }}
//               mode="datetime"
//             />

//             <View style={styles.buttonGroup}>
//               <TouchableOpacity
//                 style={[styles.button, {backgroundColor: 'red'}]}
//                 onPress={resetModal}>
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.button, {backgroundColor: '#007bff'}]}
//                 onPress={editMode ? handleEditCounter : handleAddCounter}>
//                 <Text style={styles.buttonText}>
//                   {editMode ? 'Save Changes' : 'Add Counter'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Animated.View>
//       </Modal>
//       <BannerAd
//         ref={bannerRef}
//         unitId={adUnitId}
//         size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   counterItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: hp('2%'),
//     marginVertical: hp('0.5%'),
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     elevation: 1,
//     borderLeftWidth: 5,
//   },
//   counterText: {
//     flex: 1,
//   },
//   counterTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   counterCount: {
//     fontSize: 16,
//     color: 'black',
//   },
//   counterDate: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   deleteAction: {
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: wp('15%'),
//     height: '100%',
//   },
//   fab: {
//     position: 'absolute',
//     right: 16,
//     bottom: wp('16%'), // Adjust this value as needed
//     backgroundColor: '#1da1f2',
//     borderRadius: hp('10%'),
//     elevation: 6,
//     padding: wp('4%'),
//     marginBottom: wp('8%'), // Add margin here
//   },
//   emptyListMessage: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: wp('5%'),
//   },
//   emptyListText: {
//     fontSize: 16,
//     color: 'gray',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: wp('5%'),
//     width: wp('80%'),
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: hp('2%'),
//     color: 'black',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: hp('2%'),
//   },
//   dateButton: {
//     backgroundColor: '#1da1f2',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   dateText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     flex: 1,
//     padding: 10,
//     borderRadius: 5,
//     marginHorizontal: wp('2%'),
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default ListScreen;

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  Layout,
} from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker';
import {loadCounters, saveCounters} from '../utils/jsonStorageUtility';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import {SwipeListView} from 'react-native-swipe-list-view';
import CustomAlert from './CustomAlert';
import CustomDelete from './Customdelete';
import Toast from 'react-native-toast-message';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-2627956667785383/2591700513';

const ListScreen = () => {
  const bannerRef = useRef(null);
  const [counters, setCounters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState('');
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [ErroralertVisible, setErrorAlertVisible] = useState(false);

  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const modalOpacity = useSharedValue(0);
  const scaleAdd = useSharedValue(1);

  useEffect(() => {
    loadCountersFromStorage();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadCountersFromStorage();
    }, []),
  );

  const borderColors = [
    '#FF6B6B',
    '#FFD93D',
    '#6BCB77',
    '#4D96FF',
    '#FFB5E8',
    '#845EC2',
    '#FFC75F',
    '#2D98DA',
    '#F9A8D4',
    '#F98404',
    '#5D9CEC',
    '#2ECC71',
    '#F39C12',
    '#9B59B6',
    '#1ABC9C',
    '#D4AC0D',
    '#FF5733',
    '#3498DB',
    '#D35400',
    '#A569BD',
  ];

  const loadCountersFromStorage = async () => {
    const loadedCounters = await loadCounters();
    setCounters(loadedCounters);
  };

  const handleAddCounter = async () => {
    if (title.trim() === '') {
      // Alert.alert('Error', 'Please enter a title.');
      setErrorAlertVisible(true);
      return;
    }

    const newCounter = {
      id: Math.random().toString(),
      title,
      count: count || '0',
      date: date.toLocaleString(),
    };

    const updatedCounters = [newCounter, ...counters];
    await saveCounters(updatedCounters);
    setCounters(updatedCounters);
    resetModal();
  };

  const deleteCounter = id => {
    setPendingDeleteId(id);
    setAlertVisible(true);
  };

  const handleEditCounter = async () => {
    const updatedCounters = counters.map(counter =>
      counter.id === selectedCounter.id
        ? {...counter, title, count, date: date.toLocaleString()}
        : counter,
    );
    await saveCounters(updatedCounters);
    setCounters(updatedCounters);
    resetModal();
    Toast.show({
      type: 'success',
      text1: 'Counter Updated',
      text2: 'The counter has been successfully Updated.',
    });
  };

  const resetModal = () => {
    setTitle('');
    setCount('');
    setDate(new Date());
    setModalVisible(false);
    setSelectedCounter(null);
    modalOpacity.value = withTiming(0, {duration: 300});
  };

  const openAddModal = () => {
    setEditMode(false);
    resetModal();
    setModalVisible(true);
    modalOpacity.value = withTiming(1, {duration: 300});
  };

  const openEditModal = counter => {
    setSelectedCounter(counter);
    setTitle(counter.title);
    setCount(counter.count);
    setEditMode(true);

    const parsedDate = new Date(counter.date);
    if (!isNaN(parsedDate)) {
      setDate(parsedDate);
    } else {
      setDate(new Date());
    }

    setModalVisible(true);
    modalOpacity.value = withTiming(1, {duration: 300});
  };

  const modalStyle = useAnimatedStyle(() => {
    return {
      opacity: modalOpacity.value,
    };
  });

  const addButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleAdd.value}],
    };
  });

  const handleDeleteConfirmation = async () => {
    if (pendingDeleteId) {
      const updatedCounters = counters.filter(
        counter => counter.id !== pendingDeleteId,
      );
      await saveCounters(updatedCounters);
      setCounters(updatedCounters);
      setAlertVisible(false);
      setPendingDeleteId(null);

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Counter Deleted',
        text2: 'The counter has been successfully deleted.',
      });
    }
  };

  const renderItem = ({item, index}) => (
    <Animated.View
      entering={FadeIn.delay(index * 100).springify()}
      exiting={FadeOut}
      layout={Layout.springify()}>
      <LinearGradient
        colors={['#ffffff', '#f0f0f0']}
        style={[
          styles.counterItem,
          {borderLeftColor: borderColors[index % borderColors.length]},
        ]}>
        <TouchableOpacity
          style={styles.counterText}
          onPress={() =>
            navigation.navigate('Detail', {
              counter: item,
              onGoBack: loadCountersFromStorage,
            })
          }>
          <Text style={styles.counterTitle}>{item.title}</Text>
          <View style={styles.counterInfo}>
            <Icon name="trophy-outline" size={20} color="#1da1f2" />
            <Text style={styles.counterCount}>{item.count}</Text>
          </View>
          <View style={styles.counterInfo}>
            <Icon name="calendar-outline" size={20} color="#1da1f2" />
            <Text style={styles.counterDate}>{item.date}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Icon name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );

  const handleDeleteCancellation = () => {
    setAlertVisible(false);
    setPendingDeleteId(null);
  };

  const handleCloseAlert = () => {
    setErrorAlertVisible(false);
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteCounter(data.item.id)}>
        <Icon name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyListMessage}>
      <Text style={styles.emptyListText}>
        No counter added yet. Click the plus button to add a new counter.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={counters}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyList}
      />
      <Animated.View style={[styles.fab, addButtonStyle]}>
        <TouchableOpacity
          onPress={() => {
            scaleAdd.value = withSpring(1.2, {}, () => {
              scaleAdd.value = withSpring(1);
            });
            openAddModal();
          }}>
          <Icon name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>

      <CustomDelete
        visible={alertVisible}
        title="Delete Counter"
        message="Are you sure you want to delete this counter?"
        onCancel={handleDeleteCancellation}
        onConfirm={handleDeleteConfirmation}
      />

      {/* <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={resetModal}>
        <Animated.View style={[styles.modalContainer, modalStyle]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editMode ? 'Edit Counter' : 'Add Counter'}
            </Text>

            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="gray"
              style={[styles.input, {color: 'black'}]}
            />
            <TextInput
              placeholder="Count"
              value={count}
              onChangeText={setCount}
              keyboardType="numeric"
              placeholderTextColor="gray"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setOpenDatePicker(true)}>
              <Text style={styles.dateText}>
                <Icon name="calendar" size={20} color="white" />{' '}
                {`${date.toLocaleString()}`}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={openDatePicker}
              date={date}
              onConfirm={selectedDate => {
                setOpenDatePicker(false);
                setDate(selectedDate);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
              mode="datetime"
            />

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'red'}]}
                onPress={resetModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#007bff'}]}
                onPress={editMode ? handleEditCounter : handleAddCounter}>
                <Text style={styles.buttonText}>
                  {editMode ? 'Save Changes' : 'Add Counter'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal> */}

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={resetModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Icon
              name={editMode ? 'create-outline' : 'add-circle-outline'}
              size={50}
              color="#2193b0"
            /> */}
            <Text style={styles.modalTitle}>
              {editMode ? 'Update Counter' : 'Create Counter'}
            </Text>

            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="gray"
              style={styles.input}
            />
            <TextInput
              placeholder="Count"
              value={count}
              onChangeText={setCount}
              keyboardType="numeric"
              placeholderTextColor="gray"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setOpenDatePicker(true)}>
              <Text style={styles.dateText}>
                <Icon name="calendar" size={20} color="white" />{' '}
                {`${date.toLocaleString()}`}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={openDatePicker}
              date={date}
              onConfirm={selectedDate => {
                setOpenDatePicker(false);
                setDate(selectedDate);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
              mode="datetime"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={resetModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={editMode ? handleEditCounter : handleAddCounter}>
                <Text style={styles.buttonText}>
                  {editMode ? 'Save Changes' : 'Create Counter'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      /> */}
      <CustomAlert
        visible={ErroralertVisible}
        title="Error"
        message="Please enter title"
        onClose={handleCloseAlert}
        showIcon={false}
      />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  counterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('2%'),
    marginVertical: hp('0.5%'),
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 1,
    borderLeftWidth: 5,
  },
  counterText: {
    flex: 1,
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  counterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  counterCount: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  counterDate: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 5,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    height: hp('13%'),
    top: 5,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: wp('16%'),
    backgroundColor: '#1da1f2',
    borderRadius: hp('10%'),
    elevation: 6,
    padding: wp('4%'),
    marginBottom: wp('8%'),
  },
  emptyListMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  emptyListText: {
    fontSize: 16,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp('5%'),
    width: wp('80%'),
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: hp('2%'),
  },
  dateButton: {
    backgroundColor: '#1da1f2',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  dateText: {
    color: 'white',
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: wp('2%'),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: wp('3%'),
    marginBottom: hp('2%'),
    width: '100%',
    color: 'black',
  },
  dateButton: {
    backgroundColor: '#2193b0',
    borderRadius: 10,
    padding: wp('3%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
    width: '100%',
  },
  dateText: {
    color: 'white',
    fontSize: wp('4%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp('2%'),
  },
  cancelButton: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: wp('3%'),
    elevation: 2,
    minWidth: wp('30%'),
  },
  confirmButton: {
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

export default ListScreen;
