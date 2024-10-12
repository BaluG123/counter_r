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

//*********below code is working awesome */

// import React, {useState, useEffect, useCallback} from 'react';
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
//   withSequence,
//   withTiming,
//   useAnimatedProps,
//   runOnJS,
// } from 'react-native-reanimated';
// import {loadCounters, saveCounters} from '../utils/jsonStorageUtility';
// import LinearGradient from 'react-native-linear-gradient';
// import {Svg, Circle} from 'react-native-svg';

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// const DetailScreen = ({route}) => {
//   const {counter, onGoBack} = route.params;
//   const [count, setCount] = useState(parseInt(counter.count, 10));
//   const navigation = useNavigation();

//   const progress = useSharedValue(0);
//   const scale = useSharedValue(1);
//   const buttonOpacity = useSharedValue(0);
//   const cardScale = useSharedValue(0.9);

//   useEffect(() => {
//     cardScale.value = withSpring(1);
//     buttonOpacity.value = withTiming(1, {duration: 500});
//   }, []);

//   const incrementCount = useCallback(() => {
//     setCount(prevCount => prevCount + 1);
//   }, []);

//   const handleIncrement = useCallback(() => {
//     runOnJS(incrementCount)();
//     progress.value = withSpring(progress.value + 0.1, {damping: 15});
//     scale.value = withSequence(
//       withSpring(1.2, {damping: 10}),
//       withSpring(1, {damping: 15}),
//     );
//   }, [incrementCount, progress, scale]);

//   const handleSave = useCallback(async () => {
//     try {
//       const counters = await loadCounters();
//       const updatedCounters = counters.map(item =>
//         item.id === counter.id ? {...item, count: count.toString()} : item,
//       );
//       await saveCounters(updatedCounters);
//       Alert.alert('Success', 'Counter saved successfully!');
//       if (onGoBack) {
//         onGoBack();
//       }
//       cardScale.value = withSpring(0.9, {}, () => {
//         runOnJS(navigation.goBack)();
//       });
//     } catch (error) {
//       console.error('Failed to save counter:', error);
//       Alert.alert('Error', 'Failed to save counter. Please try again.');
//     }
//   }, [count, counter.id, onGoBack, navigation, cardScale]);

//   const SIZE = wp('70%');
//   const STROKE_WIDTH = 15;
//   const RADIUS = (SIZE - STROKE_WIDTH) / 2;
//   const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

//   const countStyle = useAnimatedStyle(() => ({
//     transform: [{scale: scale.value}],
//   }));

//   const buttonStyle = useAnimatedStyle(() => ({
//     opacity: buttonOpacity.value,
//     transform: [
//       {
//         scale: interpolate(buttonOpacity.value, [0, 1], [0.8, 1]),
//       },
//     ],
//   }));

//   const cardStyle = useAnimatedStyle(() => ({
//     transform: [{scale: cardScale.value}],
//   }));

//   const animatedProps = useAnimatedProps(() => ({
//     strokeDashoffset: interpolate(
//       progress.value,
//       [0, 1],
//       [CIRCUMFERENCE, 0],
//       Extrapolate.CLAMP,
//     ),
//   }));

//   return (
//     <LinearGradient
//       colors={['#4c669f', '#3b5998', '#192f6a']}
//       style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4c669f" />

//       <Animated.View style={[styles.card, cardStyle]}>
//         <Text style={styles.title}>{counter.title}</Text>
//         <Text style={styles.date}>{counter.date}</Text>
//         <View style={styles.countContainer}>
//           <Svg width={SIZE} height={SIZE}>
//             <Circle
//               cx={SIZE / 2}
//               cy={SIZE / 2}
//               r={RADIUS}
//               stroke="#E0E0E0"
//               strokeWidth={STROKE_WIDTH}
//             />
//             <AnimatedCircle
//               cx={SIZE / 2}
//               cy={SIZE / 2}
//               r={RADIUS}
//               stroke="#4CAF50"
//               strokeWidth={STROKE_WIDTH}
//               strokeDasharray={CIRCUMFERENCE}
//               animatedProps={animatedProps}
//               strokeLinecap="round"
//             />
//           </Svg>
//           <Animated.Text style={[styles.countText, countStyle]}>
//             {count}
//           </Animated.Text>
//         </View>
//         <TouchableOpacity
//           onPress={handleIncrement}
//           style={styles.incrementButton}>
//           <Icon name="add-circle" size={60} color="#4CAF50" />
//         </TouchableOpacity>
//       </Animated.View>

//       <Animated.View style={[styles.saveButton, buttonStyle]}>
//         <TouchableOpacity onPress={handleSave} style={styles.saveButtonContent}>
//           <Icon name="save-outline" size={24} color="#fff" />
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
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
//     justifyContent: 'center',
//     width: wp('70%'),
//     height: wp('70%'),
//   },
//   countText: {
//     fontSize: wp('20%'),
//     fontWeight: 'bold',
//     color: '#1e88e5',
//     position: 'absolute',
//   },
//   incrementButton: {
//     backgroundColor: '#e8f5e9',
//     borderRadius: 40,
//     padding: wp('2%'),
//     marginTop: hp('4%'),
//   },
//   saveButton: {
//     marginTop: hp('5%'),
//   },
//   saveButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4CAF50',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('6%'),
//     borderRadius: 30,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: wp('4.5%'),
//     fontWeight: 'bold',
//     marginLeft: wp('2%'),
//   },
// });

// export default DetailScreen;

import React, {useState, useEffect, useCallback} from 'react';
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
  useAnimatedProps,
  runOnJS,
} from 'react-native-reanimated';
import {loadCounters, saveCounters} from '../utils/jsonStorageUtility';
import {Svg, Circle} from 'react-native-svg';
import CustomAlert from './CustomAlert';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DetailScreen = ({route}) => {
  const {counter, onGoBack} = route.params;
  const [count, setCount] = useState(parseInt(counter.count, 10));
  const navigation = useNavigation();

  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const buttonOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.9);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    cardScale.value = withSpring(1);
    buttonOpacity.value = withTiming(1, {duration: 500});
  }, []);

  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const handleIncrement = useCallback(() => {
    runOnJS(incrementCount)();
    progress.value = withSpring(progress.value + 0.1, {damping: 15});
    scale.value = withSequence(
      withSpring(1.2, {damping: 10}),
      withSpring(1, {damping: 15}),
    );
  }, [incrementCount, progress, scale]);

  const handleSave = useCallback(async () => {
    try {
      const counters = await loadCounters();
      const updatedCounters = counters.map(item =>
        item.id === counter.id ? {...item, count: count.toString()} : item,
      );
      await saveCounters(updatedCounters);
      // Alert.alert('Success', 'Counter saved successfully!');
      setAlertVisible(true);
      if (onGoBack) {
        onGoBack();
      }
      cardScale.value = withSpring(0.9, {}, () => {
        runOnJS(navigation.goBack)();
      });
    } catch (error) {
      console.error('Failed to save counter:', error);
      Alert.alert('Error', 'Failed to save counter. Please try again.');
    }
  }, [count, counter.id, onGoBack, navigation, cardScale]);

  const SIZE = wp('70%');
  const STROKE_WIDTH = 15;
  const RADIUS = (SIZE - STROKE_WIDTH) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const countStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [
      {
        scale: interpolate(buttonOpacity.value, [0, 1], [0.8, 1]),
      },
    ],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{scale: cardScale.value}],
  }));

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(
      progress.value,
      [0, 1],
      [CIRCUMFERENCE, 0],
      Extrapolate.CLAMP,
    ),
  }));

  const handleAlertClose = () => {
    setAlertVisible(false);
    cardScale.value = withSpring(0.9, {}, () => {
      runOnJS(navigation.goBack)();
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F4F8" />

      <Animated.View style={[styles.card, cardStyle]}>
        <Text style={styles.title}>{counter.title}</Text>
        <Text style={styles.date}>{counter.date}</Text>
        <View style={styles.countContainer}>
          <Svg width={SIZE} height={SIZE}>
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#E0E0E0"
              strokeWidth={STROKE_WIDTH}
            />
            <AnimatedCircle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#2193b0"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={CIRCUMFERENCE}
              animatedProps={animatedProps}
              strokeLinecap="round"
            />
          </Svg>
          <Animated.Text style={[styles.countText, countStyle]}>
            {count}
          </Animated.Text>
        </View>
        <TouchableOpacity
          onPress={handleIncrement}
          style={styles.incrementButton}>
          <Icon name="add-circle" size={60} color="#2193b0" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.saveButton, buttonStyle]}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButtonContent}>
          <Icon name="save-outline" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </Animated.View>
      <CustomAlert
        visible={alertVisible}
        title="Success"
        message="Counter saved successfully!"
        onClose={handleAlertClose}
        showIcon={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4F8', // Light blue-gray background to match SplashScreen
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
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
    width: wp('85%'),
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#2193b0', // Matching the logo's blue color
  },
  date: {
    fontSize: wp('4%'),
    color: '#6A6A6A',
    marginBottom: hp('4%'),
  },
  countContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('70%'),
    height: wp('70%'),
  },
  countText: {
    fontSize: wp('20%'),
    fontWeight: 'bold',
    color: '#2193b0', // Matching the logo's blue color
    position: 'absolute',
  },
  incrementButton: {
    backgroundColor: '#e8f5f8', // Lighter shade of the main blue color
    borderRadius: 40,
    padding: wp('2%'),
    marginTop: hp('4%'),
  },
  saveButton: {
    marginTop: hp('5%'),
  },
  saveButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2193b0', // Matching the logo's blue color
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
