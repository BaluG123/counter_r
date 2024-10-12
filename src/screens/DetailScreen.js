// import React, { useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar, Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

// const DetailScreen = ({ route }) => {
//   const bannerRef = useRef<BannerAd>(null);
//   const { counter, onGoBack } = route.params;
//   const [count, setCount] = useState(parseInt(counter.count, 10));
//   const navigation = useNavigation();

//   useForeground(() => {
//     if (Platform.OS === 'android') {
//       bannerRef.current?.load();
//     }
//   });

//   const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-2627956667785383/9111272173';

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
//       <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
//       <TouchableOpacity style={styles.backButton} onPress={handleSave}>
//         <Icon name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>

//       <View style={styles.card}>
//         <Text style={styles.title}>{counter.title}</Text>
//         <Text style={styles.date}>{counter.date}</Text>
//         <View style={styles.countContainer}>
//           <Text style={styles.countText}>{count}</Text>
//           <TouchableOpacity onPress={handleIncrement} style={styles.incrementButton}>
//             <Icon name="add-circle" size={80} color="#4CAF50" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//         <Icon name="save-outline" size={24} color="#fff" />
//         <Text style={styles.saveButtonText}>Save</Text>
//       </TouchableOpacity>
//       <View style={styles.bannerAd}>
//       <BannerAd
//       ref={bannerRef}
//       unitId={adUnitId}
//       size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//     />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor: '#4c669f',
//   },
//   backButton: {
//     position: 'absolute',
//     top: hp('5%'),
//     left: wp('5%'),
//     zIndex: 1,
//     color:'black'
//   },
//   card: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 15,
//     padding: wp('8%'),
//     alignItems: 'center',
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     width: wp('85%'),
//   },
//   title: {
//     fontSize: wp('7%'),
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
//     marginTop: hp('2%'),
//   },
//   countText: {
//     fontSize: wp('20%'),
//     fontWeight: 'bold',
//     color: '#1e88e5',
//     marginBottom: hp('4%'),
//   },
//   incrementButton: {
//     backgroundColor: '#e8f5e9',
//     borderRadius: 40,
//     padding: wp('2%'),
//   },
//   saveButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4CAF50',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('6%'),
//     borderRadius: 30,
//     marginTop: hp('5%'),
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: wp('4.5%'),
//     fontWeight: 'bold',
//     marginLeft: wp('2%'),
//   },
//   bannerAd: {
//     position: 'absolute',
//     bottom: 0,
//     width: wp('100%')
//   },
// });

// export default DetailScreen;

//**********Animated */
// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   interpolate,
//   Extrapolate,
// } from 'react-native-reanimated';
// import {loadCounters, saveCounters} from '../utils/jsonStorageUtility';

// const DetailScreen = ({route}) => {
//   const {counter, onGoBack} = route.params;
//   const [count, setCount] = useState(parseInt(counter.count, 10));
//   const navigation = useNavigation();

//   const progress = useSharedValue(0);
//   const scale = useSharedValue(1);

//   const handleIncrement = () => {
//     setCount(prevCount => prevCount + 1);
//     progress.value = withSpring(progress.value + 0.1, {damping: 15});
//     scale.value = withSpring(1.2, {}, () => {
//       scale.value = withSpring(1);
//     });
//   };

//   const handleSave = async () => {
//     try {
//       const counters = await loadCounters();
//       const updatedCounters = counters.map(item =>
//         item.id === counter.id ? {...item, count: count.toString()} : item,
//       );
//       await saveCounters(updatedCounters);
//       Alert.alert('Success', 'Counter updated successfully!');
//       if (onGoBack) {
//         onGoBack();
//       }
//       navigation.goBack();
//     } catch (error) {
//       console.error('Failed to save counter:', error);
//       Alert.alert('Error', 'Failed to save counter. Please try again.');
//     }
//   };

//   const progressStyle = useAnimatedStyle(() => {
//     return {
//       width: interpolate(
//         progress.value,
//         [0, 1],
//         [0, wp('70%')],
//         Extrapolate.CLAMP,
//       ),
//     };
//   });

//   const countStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{scale: scale.value}],
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
//       <TouchableOpacity style={styles.backButton} onPress={handleSave}>
//         <Icon name="arrow-back" size={24} color="white" />
//       </TouchableOpacity>

//       <View style={styles.card}>
//         <Text style={styles.title}>{counter.title}</Text>
//         <Text style={styles.date}>{counter.date}</Text>
//         <View style={styles.countContainer}>
//           <Animated.Text style={[styles.countText, countStyle]}>
//             {count}
//           </Animated.Text>
//           <TouchableOpacity
//             onPress={handleIncrement}
//             style={styles.incrementButton}>
//             <Icon name="add-circle" size={80} color="#4CAF50" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.progressContainer}>
//           <Animated.View style={[styles.progressBar, progressStyle]} />
//         </View>
//       </View>

//       <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//         <Icon name="save-outline" size={24} color="#fff" />
//         <Text style={styles.saveButtonText}>Save</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#4c669f',
//   },
//   backButton: {
//     position: 'absolute',
//     top: hp('5%'),
//     left: wp('5%'),
//     zIndex: 1,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: wp('8%'),
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//     width: wp('85%'),
//   },
//   title: {
//     fontSize: wp('7%'),
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
//     marginTop: hp('2%'),
//   },
//   countText: {
//     fontSize: wp('20%'),
//     fontWeight: 'bold',
//     color: '#1e88e5',
//     marginBottom: hp('4%'),
//   },
//   incrementButton: {
//     backgroundColor: '#e8f5e9',
//     borderRadius: 40,
//     padding: wp('2%'),
//   },
//   progressContainer: {
//     width: wp('70%'),
//     height: hp('1.5%'),
//     backgroundColor: '#e0e0e0',
//     borderRadius: 10,
//     marginTop: hp('4%'),
//     overflow: 'hidden',
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#4CAF50',
//     borderRadius: 10,
//   },
//   saveButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4CAF50',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('6%'),
//     borderRadius: 30,
//     marginTop: hp('5%'),
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: wp('4.5%'),
//     fontWeight: 'bold',
//     marginLeft: wp('2%'),
//   },
// });

// export default DetailScreen;

// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   interpolate,
//   Extrapolate,
// } from 'react-native-reanimated';
// import {loadCounters, saveCounters} from '../utils/jsonStorageUtility';

// const DetailScreen = ({route}) => {
//   const {counter, onGoBack} = route.params;
//   const [count, setCount] = useState(parseInt(counter.count, 10));
//   const navigation = useNavigation();

//   const progress = useSharedValue(0);
//   const scale = useSharedValue(1);

//   const handleIncrement = () => {
//     setCount(prevCount => prevCount + 1);
//     progress.value = withSpring(progress.value + 0.1, {damping: 15});
//     scale.value = withSpring(1.2, {}, () => {
//       scale.value = withSpring(1);
//     });
//   };

//   const handleSave = async () => {
//     try {
//       const counters = await loadCounters();
//       const updatedCounters = counters.map(item =>
//         item.id === counter.id ? {...item, count: count.toString()} : item,
//       );
//       await saveCounters(updatedCounters);
//       Alert.alert('Success', 'Counter updated successfully!');
//       if (onGoBack) {
//         onGoBack();
//       }
//       navigation.goBack();
//     } catch (error) {
//       console.error('Failed to save counter:', error);
//       Alert.alert('Error', 'Failed to save counter. Please try again.');
//     }
//   };

//   const wp70 = wp('70%');

//   const progressStyle = useAnimatedStyle(() => {
//     return {
//       width: interpolate(progress.value, [0, 1], [0, wp70], Extrapolate.CLAMP),
//     };
//   });

//   const countStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{scale: scale.value}],
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
//       <TouchableOpacity style={styles.backButton} onPress={handleSave}>
//         {/* <Icon name="arrow-back" size={24} color="white" /> */}
//       </TouchableOpacity>

//       <View style={styles.card}>
//         <Text style={styles.title}>{counter.title}</Text>
//         <Text style={styles.date}>{counter.date}</Text>
//         <View style={styles.countContainer}>
//           <Animated.Text style={[styles.countText, countStyle]}>
//             {count}
//           </Animated.Text>
//           <TouchableOpacity
//             onPress={handleIncrement}
//             style={styles.incrementButton}>
//             <Icon name="add-circle" size={80} color="#4CAF50" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.progressContainer}>
//           <Animated.View style={[styles.progressBar, progressStyle]} />
//         </View>
//       </View>

//       <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//         <Icon name="save-outline" size={24} color="#fff" />
//         <Text style={styles.saveButtonText}>Save</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#4c669f',
//   },
//   backButton: {
//     position: 'absolute',
//     top: hp('5%'),
//     left: wp('5%'),
//     zIndex: 1,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: wp('8%'),
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//     width: wp('85%'),
//   },
//   title: {
//     fontSize: wp('7%'),
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
//     marginTop: hp('2%'),
//   },
//   countText: {
//     fontSize: wp('20%'),
//     fontWeight: 'bold',
//     color: '#1e88e5',
//     marginBottom: hp('4%'),
//   },
//   incrementButton: {
//     backgroundColor: '#e8f5e9',
//     borderRadius: 40,
//     padding: wp('2%'),
//   },
//   progressContainer: {
//     width: wp('70%'),
//     height: hp('1.5%'),
//     backgroundColor: '#e0e0e0',
//     borderRadius: 10,
//     marginTop: hp('4%'),
//     overflow: 'hidden',
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#4CAF50',
//     borderRadius: 10,
//   },
//   saveButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4CAF50',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('6%'),
//     borderRadius: 30,
//     marginTop: hp('5%'),
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: wp('4.5%'),
//     fontWeight: 'bold',
//     marginLeft: wp('2%'),
//   },
// });

// export default DetailScreen;

// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   withTiming,
//   Easing,
//   FadeIn,
//   FadeOut,
// } from 'react-native-reanimated';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const AnimatedTouchableOpacity =
//   Animated.createAnimatedComponent(TouchableOpacity);

// const DetailScreen = ({route, navigation}) => {
//   const {counter, onGoBack} = route.params;
//   const [count, setCount] = useState(parseInt(counter.count, 10));

//   const scale = useSharedValue(1);
//   const rotation = useSharedValue(0);

//   const incrementCount = () => {
//     setCount(prevCount => prevCount + 1);
//     animateButton();
//   };

//   const decrementCount = () => {
//     setCount(prevCount => Math.max(0, prevCount - 1));
//     animateButton();
//   };

//   const animateButton = () => {
//     scale.value = withSpring(1.2, {}, finished => {
//       if (finished) {
//         scale.value = withSpring(1);
//       }
//     });
//   };

//   const saveChanges = async () => {
//     // Implement the logic to save changes
//     // This could involve updating the counter in storage and calling onGoBack
//     rotation.value = withTiming(360, {
//       duration: 1000,
//       easing: Easing.linear,
//     });
//     // After saving, you might want to navigate back or show a success message
//   };

//   const buttonStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{scale: scale.value}],
//     };
//   });

//   const saveButtonStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{rotate: `${rotation.value}deg`}],
//     };
//   });

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <AnimatedTouchableOpacity onPress={saveChanges} style={saveButtonStyle}>
//           <Icon name="save" size={24} color="#007AFF" />
//         </AnimatedTouchableOpacity>
//       ),
//     });
//   }, [navigation, count]);

//   return (
//     <Animated.View
//       entering={FadeIn.duration(500)}
//       exiting={FadeOut.duration(500)}
//       style={styles.container}>
//       <Text style={styles.title}>{counter.title}</Text>
//       <Animated.Text
//         style={[
//           styles.count,
//           useAnimatedStyle(() => ({opacity: withTiming(1)})),
//         ]}>
//         {count}
//       </Animated.Text>
//       <View style={styles.buttonContainer}>
//         <AnimatedTouchableOpacity
//           style={[styles.button, buttonStyle]}
//           onPress={decrementCount}>
//           <Icon name="remove" size={30} color="#FFF" />
//         </AnimatedTouchableOpacity>
//         <AnimatedTouchableOpacity
//           style={[styles.button, buttonStyle]}
//           onPress={incrementCount}>
//           <Icon name="add" size={30} color="#FFF" />
//         </AnimatedTouchableOpacity>
//       </View>
//       <Text style={styles.date}>Last updated: {counter.date}</Text>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f5f5f5',
//     padding: wp('5%'),
//   },
//   title: {
//     fontSize: wp('6%'),
//     fontWeight: 'bold',
//     marginBottom: hp('2%'),
//     color: '#333',
//   },
//   count: {
//     fontSize: wp('15%'),
//     fontWeight: 'bold',
//     color: '#1da1f2',
//     marginBottom: hp('4%'),
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginBottom: hp('4%'),
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     borderRadius: wp('10%'),
//     width: wp('20%'),
//     height: wp('20%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   date: {
//     fontSize: wp('4%'),
//     color: '#666',
//   },
// });

// export default DetailScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {loadCounters, saveCounters} from '../utils/jsonStorageUtility';

const DetailScreen = ({route}) => {
  const {counter, onGoBack} = route.params;
  const [count, setCount] = useState(parseInt(counter.count, 10));
  const navigation = useNavigation();

  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const buttonOpacity = useSharedValue(0); // New shared value for button opacity

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
    progress.value = withSpring(progress.value + 0.1, {damping: 15});
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
    buttonOpacity.value = withTiming(1, {duration: 300}); // Fade in the save button
  };

  const handleSave = async () => {
    try {
      const counters = await loadCounters();
      const updatedCounters = counters.map(item =>
        item.id === counter.id ? {...item, count: count.toString()} : item,
      );
      await saveCounters(updatedCounters);
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

  const wp70 = wp('70%');

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(progress.value, [0, 1], [0, wp70], Extrapolate.CLAMP),
    };
  });

  const countStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
      <TouchableOpacity style={styles.backButton} onPress={handleSave}>
        {/* <Icon name="arrow-back" size={24} color="white" /> */}
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>{counter.title}</Text>
        <Text style={styles.date}>{counter.date}</Text>
        <View style={styles.countContainer}>
          <Animated.Text style={[styles.countText, countStyle]}>
            {count}
          </Animated.Text>
          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.incrementButton}>
            <Icon name="add-circle" size={80} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </View>
      </View>

      <Animated.View style={[styles.saveButton, buttonStyle]}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButtonContent}>
          <Icon name="save-outline" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4c669f',
  },
  backButton: {
    position: 'absolute',
    top: hp('5%'),
    left: wp('5%'),
    zIndex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: wp('8%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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
  progressContainer: {
    width: wp('70%'),
    height: hp('1.5%'),
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: hp('4%'),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  saveButton: {
    opacity: 0,
    marginTop: hp('5%'),
    transition: 'opacity 0.3s',
  },
  saveButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('6%'),
    borderRadius: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginLeft: wp('2%'),
  },
});

export default DetailScreen;
