import React, { useState, useRef } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Entypo, Ionicons, SimpleLineIcons, MaterialCommunityIcons, FontAwesome6, AntDesign, FontAwesome5 } from '@expo/vector-icons';

interface Product {
  id: number;
  name: string;
  image: any; // Adjust this type according to your image source type
  price: string;
  brand: string;
}

// Sample data for products
const products: Product[] = [
  {
    id: 1,
    name: 'Noodles',
    image: require('../../assets/products/indomie.png'),
    price: 'N 200',
    brand: 'Indomie',
  },
  {
    id: 2,
    name: 'Rice',
    image: require('../../assets/products/rice.png'),
    price: 'N 500',
    brand: 'RawFoods',
  },
  {
    id: 3,
    name: 'Pasta',
    image: require('../../assets/products/pasta.png'),
    price: 'N 150',
    brand: 'RawFoods',
  },
  {
    id: 4,
    name: 'Toothpaste',
    image: require('../../assets/products/toothpaste.png'),
    price: 'N 150',
    brand: 'Multiple brands',
  },
];

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const toggleModal = (product: Product, event: any) => {
    event.target.measure((fx: number, fy: number, width: number, height: number, px: number, py: number) => {
      let x = px;
      let y = py + height;
      const modalHeight = 230; // Adjust according to the actual modal height

      // Ensure the modal doesn't go off the right edge of the screen
      if (x + 150 > windowWidth) {
        x = windowWidth - 155;
      }

      // Ensure the modal doesn't go off the bottom edge of the screen
      if (y + modalHeight > windowHeight) {
        y = py - modalHeight;
      }

      setModalPosition({ x, y });
      setSelectedProduct(product);
      setModalVisible(true);
    });
  };

  return (
    <View style={styles.container}>
      {/* Horizontal ScrollView for Categories */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: 10, }}>
            <Text style={{ fontSize: 14, fontFamily: 'SF-ProDisplay-Medium' }}>Canned Goods</Text>
            <Text style={{ fontSize: 14, fontFamily: 'SF-ProDisplay-Medium' }}>Grains and Pasta</Text>
            <Text style={{ fontSize: 14, fontFamily: 'SF-ProDisplay-Medium' }}>Frozen food</Text>
            <Text style={{ fontSize: 14, fontFamily: 'SF-ProDisplay-Medium' }}>Baby products</Text>
          </View>
        </ScrollView>
      </View>
      {/* Row for Stock Categories */}
      <View style={{ 
        flexDirection: 'row', justifyContent: 'space-around', 
        alignItems: 'center', backgroundColor: 'white', width: '100%', 
        padding: 10, marginVertical:5, shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        borderRadius:10 }}>
        <View style={{ ...styles.allstocks, backgroundColor: '#CCEBFF', }}>
          <Text style={{ color: '#007AFF' }}>All Stock</Text>
        </View>
        <View style={styles.allstocks}>
          <Text style={{ color: 'white' }}>Low Stock</Text>
        </View>
        <View style={styles.allstocks}>
          <Text style={{ color: 'white' }}>Expired</Text>
        </View>
      </View>
      {/* Main Content Section */}
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {products.map((product) => (
          <View key={product.id} 
            style={{ flexDirection: 'row', alignItems: 'center', 
              backgroundColor: 'white', paddingHorizontal: 10, 
              paddingVertical: 15, marginBottom: 5, gap: 10, 
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 2, }}>
            <View>
              <Image source={product.image} style={{ width: 80, height: 80, borderRadius: 50 }} />
            </View>
            <View style={{ marginLeft: 10, flexDirection: 'row', flex: 1, gap: 2 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Image source={require("../../assets/products/foodicon.png")} style={{ width: 15, height: 18}}/>
                <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline',  color: '#00BFFF' }}>{product.name}</Text>
                </View>
                  <View style={{ backgroundColor: '#CCEBFF', padding: 0, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 15 }}>
                    <Text>{product.brand}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 5 }}>
                  <Text style={{ fontWeight: 'bold', color: 'gray' }}>per piece</Text>
                  <View style={{ borderColor: '#E4E4E4', borderWidth: 1, borderRadius: 15, paddingVertical: 2, alignItems: 'center', flex: 0.4 }}>
                  <Text style={{ marginLeft: 5 }}>{product.price}</Text>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={(event) => toggleModal(product, event)}>
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => alert('Add button pressed')}>
        <AntDesign name="plus" size={16} color="white" /><Text style={{ color: 'white' }}>New</Text>
      </TouchableOpacity>

      {/* Modal for Dropdown Menu */}
      <Modal
        transparent={true}
        animationType="none"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContainer, { top: modalPosition.y, left: modalPosition.x }]}>
            <TouchableOpacity style={styles.twoItems} onPress={() => alert('Edit selected')}>
            <SimpleLineIcons name="pencil" size={15} color="black" /><Text style={styles.modalItem}>Edit Stock</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.twoItems} onPress={() => alert('Supplies selected')}>
            <Ionicons name="person-outline" size={15} color="black" /><Text style={styles.modalItem}>Supplies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.twoItems} onPress={() => alert('Export selected')}>
            <MaterialCommunityIcons name="export-variant" size={15} color="black" /><Text style={styles.modalItem}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.twoItems} onPress={() => alert('Duplicate selected')}>
            <FontAwesome6 name="copy" size={15} color="black" /><Text style={styles.modalItem}>Duplicate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.twoItems} onPress={() => alert('Share selected')}>
            <AntDesign name="sharealt" size={15} color="black" /><Text style={styles.modalItem}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.twoItems} onPress={() => alert('History selected')}>
            <FontAwesome5 name="history" size={15} color="black" /><Text style={styles.modalItem}>View history</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.twoItems} onPress={() => alert('Delete clicked')}>
            <AntDesign name="delete" size={15} color="black" /><Text style={styles.modalItem}>Delete</Text>
            </TouchableOpacity>
            {/* Add more options as needed */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  allstocks: {
    backgroundColor: '#00A6FB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomColor: '#ddd',
  },
  twoItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#00A6FB',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: 'row',
    gap: 3,
  },
});

export default HomeScreen;
