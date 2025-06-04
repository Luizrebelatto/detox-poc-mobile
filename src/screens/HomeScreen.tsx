import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Mock data - replace with your actual data source
const mockItems = [
  { id: '1', title: 'Item 1', description: 'Description 1' },
  { id: '2', title: 'Item 2', description: 'Description 2' },
  { id: '3', title: 'Item 3', description: 'Description 3' },
  { id: '4', title: 'Item 4', description: 'Description 4' },
  { id: '5', title: 'Item 5', description: 'Description 5' },
];

interface Item {
  id: string;
  title: string;
  description: string;
}

interface HomeScreenProps {
  onLogout: () => void;
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items] = useState<Item[]>(mockItems);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemPress = (item: Item) => {
    navigation.navigate('ItemDetail', { item });
  };

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => handleItemPress(item)}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 100,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  itemContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 