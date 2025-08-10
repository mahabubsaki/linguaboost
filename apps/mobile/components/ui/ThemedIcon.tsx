import hexColors from '@/constants/hexColors';
import { useTheme } from '@/providers/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>['name'];

interface ThemedIconProps {
  name?: FontAwesomeIconName;
  children?: React.ReactNode;
  size?: number;
  color?: string;
}

const ThemedIcon = ({ name, children, size, color }: ThemedIconProps) => {
  const { themeName, colorScheme } = useTheme();
  const themedColor = color ?? hexColors[themeName][colorScheme ?? 'light'].tint;
  //if children available make a new component which wraps the children with the themed styles
  const themedChildren = React.cloneElement(
    children as React.ReactElement<{ color?: string; size?: number }>,
    {
      color: themedColor,
      size
    }
  );
  return children ? themedChildren : <FontAwesome name={name} color={themedColor} size={size} />;
};

export default ThemedIcon;
