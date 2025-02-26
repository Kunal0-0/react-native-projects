import './gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import FavoritesScreen from './screens/FavoritesScreen';
import { MEALS, CATEGORIES } from './data/dummy-data'
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

const stack = createStackNavigator();
const drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();


// Bottom Tab Navigator with Dynamic Categories
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#351401' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#e4baa1'
      }}
    >
      {/* "All Categories" Tab */}
      <BottomTab.Screen 
        name="All Categories" 
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />
        }}
      />

      {/* Dynamically create tabs for each category */}
      {CATEGORIES.map(category => (
        <BottomTab.Screen
          key={category.id}
          name={category.title}
          component={MealsOverviewScreen}
          initialParams={{ categoryID: category.id }}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />
          }}
        />
      ))}

      {/* Favorites Screen */}
      <BottomTab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}


// function DrawerNavigator() {
//   return <drawer.Navigator
//     screenOptions={{
//       headerStyle:{ backgroundColor: '#351401' },
//       headerTintColor: '#ffffff',
//       sceneStyle: {backgroundColor: '#3f2f25'},
//       drawerContentStyle: {backgroundColor: '#351401'},
//       drawerInactiveTintColor: 'white',
//       drawerActiveTintColor: '#351401',
//       drawerActiveBackgroundColor: '#e4baa1'
//     }}
//   >
//       <drawer.Screen 
//       name="Categories" 
//       component={CategoriesScreen}
//       options={{
//         title: 'All Categories',
//         drawerIcon: ({color, size}) => (<Ionicons name="list" color={color} size={size}/>)
//       }}
//       />

//       <drawer.Screen 
//       name="Favorites" 
//       component={FavoritesScreen} 
//       options={{
//         drawerIcon: ({color, size}) => (<Ionicons name="star" color={color} size={size}/>)
//       }}
//       />
//     </drawer.Navigator>
// }

export default function App() {
  return (
    <>
    <StatusBar style='light' />
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator 
          screenOptions={{ // this is the default settings for all the screens, if we do not set this and instead set options in each screen then it will be very cumbersome. If any options are set for any screen then it would win otherwise these default settings will be applied
            headerStyle:{ backgroundColor: '#351401' },
            headerTintColor: '#ffffff',
            contentStyle: {backgroundColor: '#3f2f25'}
          }}
        >
          <stack.Screen 
            name = "Tabs"
            component={BottomTabNavigator}
            options={{
              headerShown: false
            }}
          />

          <stack.Screen 
          name="MealsOverview"
          component={MealsOverviewScreen}
          //options={({ route, navigation }) => {
          //  const catID = route.params.categoryId;
          //  return {
          //    title: catID,
          //  };
          //}}
          /> 

          <stack.Screen 
          name="MealDetails"
          component={MealDetailsScreen}
          options={{
            title: 'About the Meal'
          }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
    </>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});