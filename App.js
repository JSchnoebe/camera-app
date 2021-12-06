import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  let camera = Camera;


  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setHasPermission(status === 'granted');
    } else {
      Alert.alert('Access denied')
    }
  }

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
   
  }

  if (hasPermission === 'granted') {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>This is Jaren's React Native App.</Text>
      {hasPermission ? (
        <Camera style={{ flex: 1, width: "100%" }}
          ref={(r) => {
            camera = r
          }} type={type} />
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take a picture!
            </Text>
          </TouchableOpacity>
        </View>
      )
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

