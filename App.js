import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import Logo from './Components/Logo';
import { Card } from 'react-native-paper';
import { AutoFocus } from 'expo-camera/build/Camera.types';

export default function App() {

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

  let camera = Camera;

  const CameraPreview = ({photo}) => {
    console.log('Photo', photo)
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        />
      </View>
    )
  }

  const __showPhotos = async () => {
    return (
      <CameraPreview photo={capturedImage.uri} />
    )
  }

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
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  console.log("captured image ", capturedImage)

  if (hasPermission === 'granted') {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
        <Logo />
        <Text>Welcome to Jaren's React Native App.</Text>
      {hasPermission ? (
        <Camera style={{ flex: 1, width: "100%", height: "100%" }}
          ref={(r) => {
            camera = r
          }} type={type} />
      ) : (
        <>
        {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} />
        ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14874e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              marginHorizontal: 57,
              marginTop: 30,
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

          <TouchableOpacity
            onPress={__showPhotos}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14874e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              marginHorizontal: 57,
              marginBottom: 30,
              marginTop: 30
            }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                Gallary
              </Text>
              </TouchableOpacity>
          
        </View>
        )}
        </>
      )
      }
      
      <TouchableOpacity
            onPress={__takePicture}
            style={{
            width: 70,
            height: 70,
            bottom: 0,
            borderRadius: 50,
            backgroundColor: '#fff'
            }}
            />
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
  buttonContainer: {
    borderRadius: 50,
  }
});

