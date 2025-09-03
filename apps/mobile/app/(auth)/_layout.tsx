import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { AUTH_TEXT, TERMS_OF_SERVICE, PRIVACY_POLICY } from '@repo/static-text';

type ModalType = 'terms' | 'privacy' | null;

const AuthLayout = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  const getModalContent = () => {
    switch (modalType) {
      case 'terms':
        return TERMS_OF_SERVICE;
      case 'privacy':
        return PRIVACY_POLICY;
      default:
        return null;
    }
  };

  const modalContent = getModalContent();

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="items-center pb-6 pt-8">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-blue-500">
            <MaterialIcons name="language" size={32} color="white" />
          </View>
          <Text className="mb-2 text-3xl font-bold text-gray-900">{AUTH_TEXT.appName}</Text>
          <Text className="text-base text-gray-600">{AUTH_TEXT.tagline}</Text>
        </View>

        {/* Auth Form Container */}
        <View className="flex-1 rounded-t-3xl bg-white px-6 pt-8">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
          </Stack>

          {/* Terms and Privacy Footer */}
          <View className="border-t border-gray-100 py-6">
            <Text className="text-center text-xs leading-5 text-gray-500">
              {AUTH_TEXT.common.termsAndPrivacy}
            </Text>
            <View className="mt-2 flex-row items-center justify-center">
              <TouchableOpacity onPress={() => openModal('terms')}>
                <Text className="text-xs text-blue-500 underline">
                  {AUTH_TEXT.common.termsOfService}
                </Text>
              </TouchableOpacity>
              <Text className="mx-1 text-xs text-gray-500">{AUTH_TEXT.common.and}</Text>
              <TouchableOpacity onPress={() => openModal('privacy')}>
                <Text className="text-xs text-blue-500 underline">
                  {AUTH_TEXT.common.privacyPolicy}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Modal for Terms/Privacy */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView className="flex-1 bg-white">
          {/* Modal Header */}
          <View className="flex-row items-center justify-between border-b border-gray-200 px-6 py-4">
            <Text className="text-xl font-bold text-gray-900">{modalContent?.title}</Text>
            <TouchableOpacity onPress={closeModal}>
              <MaterialIcons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <ScrollView className="flex-1 px-6 py-4">
            <Text className="mb-4 text-sm text-gray-600">{modalContent?.lastUpdated}</Text>
            <Text className="text-base leading-6 text-gray-800">{modalContent?.content}</Text>
          </ScrollView>

          {/* Modal Footer */}
          <View className="border-t border-gray-200 px-6 py-4">
            <TouchableOpacity className="rounded-xl bg-blue-500 py-3" onPress={closeModal}>
              <Text className="text-center text-base font-semibold text-white">Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default AuthLayout;
