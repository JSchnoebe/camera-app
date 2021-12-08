import React from 'react';

export default function Gallery() {
  return(
    <View style={styles.container}>
      <Image
      source={{ uri: this.state.path }}
      />
    </View>
  );
}