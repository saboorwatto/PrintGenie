import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';

type LogoSize = 'small' | 'medium' | 'large';

type Props = {
  size?: LogoSize;
  style?: StyleProp<ImageStyle>;
};

const SIZES: Record<LogoSize, { width: number; height: number }> = {
  small: { width: 140, height: 56 },
  medium: { width: 180, height: 72 },
  large: { width: 220, height: 88 },
};

export default function PrintGenieLogo({ size = 'medium', style }: Props) {
  return (
    <Image
      source={require('../../assets/printgenie-logo.png')}
      style={[styles.logo, SIZES[size], style]}
      resizeMode="contain"
      accessibilityLabel="PrintGenie logo"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
