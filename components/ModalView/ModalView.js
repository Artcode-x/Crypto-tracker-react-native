import { useState } from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { styles } from "./ModalView.styles"
export const ModalView = ({ modal, setModal }) => {
  const handlePress = (e) => {
    if (e === 1) {
      console.log("open small")
    } else {
      console.log("open large")
    }
    setModal(!modal)
  }
  return (
    <Modal
      transparent={true}
      visible={modal}
      animationType='fade'
      onRequestClose={handlePress}
    >
      <View style={styles.dropdown}>
        <View style={styles.dropbox}>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => handlePress(1)}>
            <Text style={styles.dropdownText}>Compact</Text>
            <Ionicons style={styles.changePoint} name='grid' size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.dropdownItem} onPress={() => handlePress(2)}>
          <Text style={styles.dropdownText}>Medium</Text>
          <Ionicons style={styles.changePoint} name='list' size={20} />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
