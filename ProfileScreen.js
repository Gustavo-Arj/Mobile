import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      {/* Adicionar detalhes do perfil e funcionalidades aqui */}
    </View>
  );
};

<Button
  title="Editar Perfil"
  onPress={() => navigation.navigate('EditProfile')}
/>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;