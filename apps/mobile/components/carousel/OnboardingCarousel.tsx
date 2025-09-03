import React, { useState, useRef } from 'react';
import { View, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import OnboardingCard from './OnboardingCard';
import CarouselIndicator from './CarouselIndicator';
import PronunciationIcon from '../../svg/PronunciationIcon';
import PersonalizedLearningIcon from '../../svg/PersonalizedLearningIcon';
import AIConversationIcon from '../../svg/AIConversationIcon';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

const OnboardingCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const slides = [
    {
      title: 'Perfect Pronunciation',
      subtitle: 'AI-powered speech analysis',
      description:
        'Get instant feedback on your pronunciation with detailed analysis and tips for improvement.',
      backgroundColor: '#FF6B35',
      icon: <PronunciationIcon width={80} height={80} />
    },
    {
      title: 'Personalized Learning',
      subtitle: 'Lessons that adapt to your interests',
      description:
        "Our AI creates custom lessons based on your goals, whether it's travel, business, or casual conversation.",
      backgroundColor: '#2ECC71',
      icon: <PersonalizedLearningIcon width={80} height={80} />
    },
    {
      title: 'AI Conversation Partners',
      subtitle: 'Practice with intelligent tutors 24/7',
      description:
        'Chat with AI tutors that understand context, correct mistakes gently, and adapt to your learning pace.',
      backgroundColor: '#3498DB',
      icon: <AIConversationIcon width={80} height={80} />
    }
  ];

  const handleScroll = (event: {
    nativeEvent: { layoutMeasurement: { width: number }; contentOffset: { x: number } };
  }) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true
      });
      setCurrentIndex(nextIndex);
    } else {
      router.replace('/(auth)');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      scrollViewRef.current?.scrollTo({
        x: prevIndex * screenWidth,
        animated: true
      });
      setCurrentIndex(prevIndex);
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)');
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pb-4 pt-12">
        <Text className="text-2xl font-bold text-gray-900">LinguaAI</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-base font-medium text-gray-600">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        className="flex-1"
      >
        {slides.map((slide, index) => (
          <View key={index} style={{ width: screenWidth }}>
            <OnboardingCard
              title={slide.title}
              subtitle={slide.subtitle}
              description={slide.description}
              backgroundColor={slide.backgroundColor}
              icon={slide.icon}
            />
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="px-6 pb-8">
        <CarouselIndicator currentIndex={currentIndex} totalSlides={slides.length} />

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={handlePrevious}
            className={`px-6 py-3 ${currentIndex === 0 ? 'opacity-30' : ''}`}
            disabled={currentIndex === 0}
          >
            <Text className="text-base font-medium text-gray-600">Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} className="rounded-full bg-blue-500 px-8 py-3">
            <Text className="text-base font-semibold text-white">
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingCarousel;
