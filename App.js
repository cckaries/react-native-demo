import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import configureStore from './src/stores/configureStore';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store = configureStore();

// Register navigation
Navigation.registerComponent(
  'test.AuthScreen',
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'test.SharePlaceScreen',
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'test.FindPlaceScreen',
  () => FindPlaceScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'test.PlaceDetailScreen',
  () => PlaceDetailScreen,
  store,
  Provider
);

Navigation.registerComponent('test.SideDrawer', () => SideDrawer);

// Start an app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'test.AuthScreen',
    title: 'Login'
  }
});
