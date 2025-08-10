import { View } from 'react-native';
import TopSecion from './TopSection';
import TextSection from './TextSection';

const Splash = () => {
  return (
    <View className="flex flex-col items-center gap-5">
      <TopSecion />
      <TextSection />
    </View>
  );
};

export default Splash;
