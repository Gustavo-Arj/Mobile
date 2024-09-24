import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Avatar } from 'react-native-paper';
import { api } from '../config/api';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Avatar.Text size={40} label={item.user_login.charAt(0).toUpperCase()} />
      <View style={styles.postContent}>
        <Text style={styles.postUser}>{item.user_login}</Text>
        <Text style={styles.postMessage}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.postButton} onPress={() => navigation.navigate('PostScreen')}>
        <AntDesign name="addfile" size={24} color="white" />
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textAlign: 'center',
  },
  postButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent:"center",
    marginVertical: 10,
    position:"absolute",
    bottom:12,
    margin:0,
    height:60,
    right:20,
    width:60
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  profileButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  postContent: {
    marginLeft: 10,
  },
  postUser: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postMessage: {
    fontSize: 14,
    color: '#555',
  },
});
