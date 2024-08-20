import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://api.papacapim.just.pro.br/posts');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.papacapim.just.pro.br/users?limit=5');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
    fetchUsers();
  }, []);

  const renderUserProfile = ({ item }) => (
    <TouchableOpacity
      style={styles.profileCard}
      onPress={() => navigation.navigate('UserProfile', { userId: item.id })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.userProfilesContainer}>
          <Text style={styles.sectionTitle}>Perfis de Usuários</Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            renderItem={renderUserProfile}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPost}
    />
  );
};

const styles = StyleSheet.create({
  userProfilesContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 16,
  },
});

export default FeedScreen;
