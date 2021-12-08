import React from 'react';

export default function Gallery() {
  return(
    <View style={styles.container}>
      <CameraPreview photo={capturedImage} />
    </View>
  );
}