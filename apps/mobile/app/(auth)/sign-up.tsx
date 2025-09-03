import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AUTH_TEXT } from '@repo/static-text';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', AUTH_TEXT.errors.passwordTooShort);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual sign-up logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      Alert.alert('Success', AUTH_TEXT.success.accountCreated);

      router.replace('/splash');
    } catch {
      Alert.alert('Error', AUTH_TEXT.errors.signUpFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // TODO: Implement Google Sign-In
      Alert.alert('Info', 'Google Sign-In coming soon');
    } catch {
      Alert.alert('Error', AUTH_TEXT.errors.networkError);
    }
  };

  const navigateToSignIn = () => {
    router.back();
  };

  return (
    <View className="flex-1 px-6">
      {/* Full Name Input */}
      <View className="mb-4">
        <View className="flex-row items-center rounded-xl bg-gray-100 px-4 py-4">
          <MaterialIcons name="person" size={20} color="#9CA3AF" className="mr-3" />
          <TextInput
            className="ml-3 flex-1 text-base text-gray-700"
            placeholder={AUTH_TEXT.signUp.fullNamePlaceholder}
            placeholderTextColor="#9CA3AF"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Email Input */}
      <View className="mb-4">
        <View className="flex-row items-center rounded-xl bg-gray-100 px-4 py-4">
          <MaterialIcons name="email" size={20} color="#9CA3AF" className="mr-3" />
          <TextInput
            className="ml-3 flex-1 text-base text-gray-700"
            placeholder={AUTH_TEXT.signUp.emailPlaceholder}
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <View className="flex-row items-center rounded-xl bg-gray-100 px-4 py-4">
          <MaterialIcons name="lock" size={20} color="#9CA3AF" className="mr-3" />
          <TextInput
            className="ml-3 flex-1 text-base text-gray-700"
            placeholder={AUTH_TEXT.signUp.passwordPlaceholder}
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="ml-2">
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        className={`mb-6 rounded-xl bg-blue-500 py-4 ${isLoading ? 'opacity-50' : ''}`}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        <Text className="text-center text-lg font-semibold text-white">
          {isLoading ? 'Creating Account...' : AUTH_TEXT.signUp.createAccountButton}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="mb-6 flex-row items-center">
        <View className="h-px flex-1 bg-gray-300" />
        <Text className="mx-4 text-sm text-gray-500">{AUTH_TEXT.common.orContinueWith}</Text>
        <View className="h-px flex-1 bg-gray-300" />
      </View>

      {/* Google Sign In */}
      <TouchableOpacity
        className="mb-6 flex-row items-center justify-center rounded-xl border border-gray-300 bg-white py-4"
        onPress={handleGoogleSignIn}
      >
        <MaterialIcons name="login" size={20} color="#4285F4" className="mr-2" />
        <Text className="ml-2 text-base font-medium text-gray-700">
          {AUTH_TEXT.common.googleSignIn}
        </Text>
      </TouchableOpacity>

      {/* Switch to Sign In */}
      <TouchableOpacity onPress={navigateToSignIn} className="self-center">
        <Text className="text-sm text-gray-600">{AUTH_TEXT.signUp.switchToSignIn}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
