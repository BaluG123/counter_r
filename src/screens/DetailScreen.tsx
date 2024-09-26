// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const DetailScreen = ({ route }) => {
//     const { counter, onGoBack } = route.params;
//   const [count, setCount] = useState(parseInt(counter.count, 10));
//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//           <Icon name="save-outline" size={24} color="#1e88e5" />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation, count]);

//   const handleIncrement = () => {
//     setCount(prevCount => prevCount + 1);
//   };

//   const handleSave = async () => {
//     try {
//       const storedCounters = await AsyncStorage.getItem('counters');
//       let counters = storedCounters ? JSON.parse(storedCounters) : [];

//       const updatedCounters = counters.map(item => 
//         item.id === counter.id ? { ...item, count: count.toString() } : item
//       );

//       await AsyncStorage.setItem('counters', JSON.stringify(updatedCounters));
//       Alert.alert('Success', 'Counter updated successfully!');
      
//       // Call the onGoBack function to refresh the ListScreen
//       if (onGoBack) {
//         onGoBack();
//       }
      
//       navigation.goBack();
//     } catch (error) {
//       console.error('Failed to save counter:', error);
//       Alert.alert('Error', 'Failed to save counter. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{counter.title}</Text>
//       <Text style={styles.date}>{counter.date}</Text>
//       <View style={styles.countContainer}>
//         <Text style={styles.countText}>{count}</Text>
//         <TouchableOpacity onPress={handleIncrement} style={styles.incrementButton}>
//           <Icon name="add-circle" size={120} color="#4CAF50" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   title: {
//     fontSize: wp('6%'),
//     fontWeight: 'bold',
//     marginBottom: hp('2%'),
//     color: '#333',
//   },
//   date: {
//     fontSize: wp('4%'),
//     color: '#666',
//     marginBottom: hp('4%'),
//   },
//   countContainer: {
//     alignItems: 'center',
//   },
//   countText: {
//     fontSize: wp('15%'),
//     fontWeight: 'bold',
//     color: '#1e88e5',
//     marginBottom: hp('4%'),
//   },
//   incrementButton: {
//     padding: wp('2%'),
//   },
//   saveButton: {
//     marginRight: wp('4%'),
//   },
// });

// export default DetailScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const DetailScreen = ({ route }) => {
//   const { counter, onGoBack } = route.params;
//   const [count, setCount] = useState(parseInt(counter.count, 10));
//   const navigation = useNavigation();

// //   useEffect(() => {
// //     navigation.setOptions({
// //       headerRight: () => (
// //         <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
// //           <Icon name="save-outline" size={24} color="#1e88e5" />
// //         </TouchableOpacity>
// //       ),
// //     });
// //   }, [navigation, count]);

//   const handleIncrement = () => {
//     setCount(prevCount => prevCount + 1);
//   };

//   const handleSave = async () => {
//     try {
//       const storedCounters = await AsyncStorage.getItem('counters');
//       let counters = storedCounters ? JSON.parse(storedCounters) : [];

//       const updatedCounters = counters.map(item =>
//         item.id === counter.id ? { ...item, count: count.toString() } : item
//       );

//       await AsyncStorage.setItem('counters', JSON.stringify(updatedCounters));
//       Alert.alert('Success', 'Counter updated successfully!');

//       // Call the onGoBack function to refresh the ListScreen (if provided)
//       if (onGoBack) {
//         onGoBack();
//       }

//       navigation.goBack(); // Navigate back to ListScreen
//     } catch (error) {
//       console.error('Failed to save counter:', error);
//       Alert.alert('Error', 'Failed to save counter. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Left Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={handleSave}>
//         <Icon name="arrow-back" size={24} color="#1e88e5" />
//       </TouchableOpacity>

//       <Text style={styles.title}>{counter.title}</Text>
//       <Text style={styles.date}>{counter.date}</Text>
//       <View style={styles.countContainer}>
//         <Text style={styles.countText}>{count}</Text>
//         <TouchableOpacity onPress={handleIncrement} style={styles.incrementButton}>
//           <Icon name="add-circle" size={120} color="#4CAF50" />
//         </TouchableOpacity>
//       </View>
//       <View style={{marginTop:hp('20%')}}>
//       <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//           <Icon name="save-outline" size={50} color="green" />
//           <Text style={{color:'black',marginLeft:wp('2%')}}>Save</Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//     alignItems: 'center',
//     justifyContent: 'center', // Center content vertically
//     backgroundColor: '#f8f8f8',
//   },
//   title: {
//     fontSize: wp('6%'),
//     fontWeight: 'bold',
//     marginBottom: hp('2%'),
//     color: '#333',
//   },
//   date: {
//     fontSize: wp('4%'),
//     color: '#666',
//     marginBottom: hp('4%'),
//   },
//   countContainer: {
//     alignItems: 'center',
//     marginTop:hp('2%')
//   },
//   countText: {
//     fontSize: wp('15%'),
//     fontWeight: 'bold',
//     color: '#1e88e5',
//     marginBottom: hp('4%'),
//   },
//   incrementButton: {
//     padding: wp('2%'),
//   },
//   saveButton: {
//     marginRight: wp('4%'),
//   },
//   backButton: {
//     position: 'absolute', // Place left back button in top-left corner
//     top: hp('2%'), // Adjust position based on your preference
//     left: wp('2%'),
//   },
// });

// export default DetailScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DetailScreen = ({ route }) => {
  const { counter, onGoBack } = route.params;
  const [count, setCount] = useState(parseInt(counter.count, 10));
  const navigation = useNavigation();

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleSave = async () => {
    try {
      const storedCounters = await AsyncStorage.getItem('counters');
      let counters = storedCounters ? JSON.parse(storedCounters) : [];

      const updatedCounters = counters.map(item =>
        item.id === counter.id ? { ...item, count: count.toString() } : item
      );

      await AsyncStorage.setItem('counters', JSON.stringify(updatedCounters));
      Alert.alert('Success', 'Counter updated successfully!');

      if (onGoBack) {
        onGoBack();
      }

      navigation.goBack();
    } catch (error) {
      console.error('Failed to save counter:', error);
      Alert.alert('Error', 'Failed to save counter. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
      <TouchableOpacity style={styles.backButton} onPress={handleSave}>
        <Icon name="arrow-back" size={24} color="black" /> 
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>{counter.title}</Text>
        <Text style={styles.date}>{counter.date}</Text>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
          <TouchableOpacity onPress={handleIncrement} style={styles.incrementButton}>
            <Icon name="add-circle" size={80} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Icon name="save-outline" size={24} color="#fff" />
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#4c669f',
  },
  backButton: {
    position: 'absolute',
    top: hp('5%'),
    left: wp('5%'),
    zIndex: 1,
    color:'black'
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: wp('8%'),
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: wp('85%'),
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#333',
  },
  date: {
    fontSize: wp('4%'),
    color: '#666',
    marginBottom: hp('4%'),
  },
  countContainer: {
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  countText: {
    fontSize: wp('20%'),
    fontWeight: 'bold',
    color: '#1e88e5',
    marginBottom: hp('4%'),
  },
  incrementButton: {
    backgroundColor: '#e8f5e9',
    borderRadius: 40,
    padding: wp('2%'),
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('6%'),
    borderRadius: 30,
    marginTop: hp('5%'),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginLeft: wp('2%'),
  },
});

export default DetailScreen;