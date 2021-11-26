/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {labelImage} from 'vision-camera-image-labeler';

const App = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    const checkPerms = async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      setHasPermission(newCameraPermission === 'authorized');
    };
    checkPerms();
  }, []);

  // const [labs, setLabs] = useState([]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const labels = labelImage(frame);
    console.log({labels});
    // runOnJS(setLabs)(labels);
  }, []);

  if (device == null || !hasPermission)
    return (
      <View style={{...StyleSheet.absoluteFill, backgroundColor: 'red'}}>
        <Text>LOADING</Text>
      </View>
    );
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
    />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
