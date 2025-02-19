import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import PostListScreen from '../screens/PostListScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import RegisterTeacherScreen from '../screens/RegisterTeacherScreen';
import EditPostScreen from '../screens/EditPostScreen';

const Stack = createStackNavigator();

const AppNavigator = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PostList">
        <Stack.Screen
          name="PostList"
          component={PostListScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ title: 'Detalhes do Post' }}
        />
        {isAuthenticated && (
          <>
            <Stack.Screen
              name="CreatePost"
              component={CreatePostScreen}
              options={{ title: 'Criar Post' }}
            />
            <Stack.Screen
              name="EditPost"
              component={EditPostScreen}
              options={{ title: 'Editar Post' }}
            />
            <Stack.Screen
              name="RegisterTeacher"
              component={RegisterTeacherScreen}
              options={{ title: 'Cadastrar Professor' }}
            />
          </>
        )}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;