import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const API_URL = 'http://192.168.15.13:3000/posts'; 

const PostDetailScreen = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { postId } = route.params || {}; 

  useEffect(() => {
    console.log("PostId recebido:", postId); 

    if (!postId) {
      console.error('Post ID não encontrado!');
      return; 
    }

    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (!post) {
    return <Text style={styles.noPostText}>Post não encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Por: {post.author}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PostDetailScreen;
