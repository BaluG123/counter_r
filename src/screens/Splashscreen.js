// // SplashScreen.js

// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet,Image } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import {
//   responsiveFontSize as fs
// } from "react-native-responsive-dimensions";

// const Splashscreen = ({ navigation }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('List'); // Replace with your home screen name
//     }, 3000); // 3000 milliseconds = 3 seconds

//     return () => clearTimeout(timer); // Clear the timeout if the component is unmounted
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../components/praycount.png')}
//         style={styles.logo}
//       />
//       <Text style={styles.introText}>Welcome</Text>
//       {/* <Text style={styles.text}>RiddleX</Text> */}
//       {/* You can add your app's logo or any other branding elements here */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#333333', // Customize the background color
//   },
//   logo: {
//     width: hp(25), // Adjust the width as needed
//     height: hp(25), // Adjust the height as needed
//     resizeMode: 'contain', // Choose the resizeMode that fits your image
//     marginBottom:hp(2),
//     // borderWidth:hp(0.1),
//     // borderColor:'#FFFFFF'
//   },
//   text: {
//     fontSize: fs(2.8),
//     fontWeight: '200',
//     color: '#FFFFFF', // Customize the text color
//   },
//   introText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black', // Customize the text color
//     textAlign: 'center', // Center the text
//   },
// });

// export default Splashscreen;

import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {responsiveFontSize as fs} from 'react-native-responsive-dimensions';

const Splashscreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('List');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
        ]}>
        <Image
          source={require('../utils/prayer-counter-logo.png')}
          style={styles.logo}
        />
      </Animated.View>
      <Animated.Text style={[styles.appName, {opacity: fadeAnim}]}>
        DigiCounter
      </Animated.Text>
      <Animated.Text style={[styles.tagline, {opacity: fadeAnim}]}>
        Elevate Your Spiritual Journey
      </Animated.Text>
      <Animated.Text style={[styles.message, {opacity: fadeAnim}]}>
        "Prayer is the key of the morning and the bolt of the evening."
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8', // Light blue-gray background
  },
  logoContainer: {
    marginBottom: hp(4),
  },
  logo: {
    width: hp(25),
    height: hp(25),
    resizeMode: 'contain',
  },
  appName: {
    fontSize: fs(4),
    fontWeight: 'bold',
    color: '#2193b0', // Matching the logo's blue color
    marginBottom: hp(2),
  },
  tagline: {
    fontSize: fs(2.2),
    fontWeight: '500',
    color: '#4A4A4A',
    marginBottom: hp(3),
  },
  message: {
    fontSize: fs(2),
    fontStyle: 'italic',
    color: '#6A6A6A',
    textAlign: 'center',
    paddingHorizontal: wp(10),
  },
});

export default Splashscreen;
