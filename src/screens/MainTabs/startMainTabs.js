import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Ionicons.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Ionicons.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
    Ionicons.getImageSource(Platform.OS === 'android' ? 'md-menu': 'ios-menu', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'test.FindPlaceScreen',
          label: 'Find Place',
          title: 'Find Place YAY',
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: 'Menu',
                id: 'sideDrawerToggle'
              }
            ]
          }
        },
        {
          screen: 'test.SharePlaceScreen',
          label: 'Share Place',
          title: 'Share Place YAY',
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: 'Menu',
                id: 'sideDrawerToggle'
              }
            ]
          }
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: 'orange'
      },
      appStyle: {
        tabBarSelectedButtonColor: 'orange'
      },
      drawer: {
        left: {
          screen: 'test.SideDrawer'
        }
      }
    });
  });
};

export default startTabs;
