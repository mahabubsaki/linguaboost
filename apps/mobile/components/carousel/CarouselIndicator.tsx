import React from 'react';
import { View } from 'react-native';

interface CarouselIndicatorProps {
  currentIndex: number;
  totalSlides: number;
}

const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({ currentIndex, totalSlides }) => {
  return (
    <View className="mb-8 flex-row items-center justify-center space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full ${
            index === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </View>
  );
};

export default CarouselIndicator;
