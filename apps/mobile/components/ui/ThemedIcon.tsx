import hexColors from '@/constants/hexColors';
import { useTheme } from '@/providers/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>['name'];

interface ThemedIconProps {
  name?: FontAwesomeIconName;
  children?: React.ReactNode;
  size?: number;
}

const ThemedIcon = ({ name, children, size }: ThemedIconProps) => {
  const { themeName, colorScheme } = useTheme();
  const color = hexColors[themeName][colorScheme ?? 'light'].tint;
  //if children available make a new component which wraps the children with the themed styles
  const themedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      return React.cloneElement(child as React.ReactElement<{ color?: string; size?: number }>, {
        color,
        size
      });
    }
    return child;
  });
  return children ? themedChildren : <FontAwesome name={name} color={color} size={size} />;
};

export default ThemedIcon;
