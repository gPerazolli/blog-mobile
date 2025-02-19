import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.15.13:3000/posts'; 

const EditPostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params; 

  useEffect(() => {
    const fetchTokenAndPost = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (!storedToken) {
        navigation.replace('Login'); 
      } else {
        setToken(storedToken);
        try {
          const response = await axios.get(`${API_URL}/${postId}`);
          const { title, content, author } = response.data;
          setTitle(title);
          setContent(content);
          setAuthor(author);
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar o post.');
          console.error(error);
        }
      }
    };

    fetchTokenAndPost();
  }, [postId]);

  const handleUpdatePost = async () => {
    if (!token) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    if (!title || !content || !author) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      await axios.put(
        `${API_URL}/${postId}`,
        { title, content, author },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o post.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Conteúdo"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Button title="Salvar" onPress={handleUpdatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EditPostScreen;