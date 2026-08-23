import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type AvatarProps = {
  imageUrl?: string | null;
  initials: string;
  bgColor: string;
  textColor: string;
  size?: number;
  rounded?: boolean; // true = circle (Users), false = rounded square (Shops)
};

export default function Avatar({
  imageUrl,
  initials,
  bgColor,
  textColor,
  size = 40,
  rounded = true,
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = imageUrl && !failed;
  const borderRadius = rounded ? size / 2 : size * 0.27;

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius, backgroundColor: bgColor },
      ]}
    >
      {showImage ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: size, height: size, borderRadius }}
          onError={() => setFailed(true)}
        />
      ) : (
        <Text style={[styles.initials, { color: textColor, fontSize: size * 0.35 }]}>
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  initials: { fontWeight: '700' },
});