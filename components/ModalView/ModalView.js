import { Modal, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./ModalView.styles"
import { useDispatch } from "react-redux"
import { setFlagForView } from "../../store/reducersSlice"
import { useState } from "react"

export const ModalView = ({ modal, setModal }) => {
  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState(null)

  const handlePress = (e) => {
    if (e === 1) {
      dispatch(setFlagForView(false))
    } else {
      dispatch(setFlagForView(true))
    }
    setModal(false)
  }

  const handleItemPress = (itemId) => {
    setActiveItem(itemId)
    handlePress(itemId)
  }

  return (
    <Modal
      transparent={true}
      visible={modal}
      animationType='fade'
      onRequestClose={() => setModal(false)}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={() => setModal(false)}
      >
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownContent}>
            <TouchableOpacity
              style={[styles.dropdownItem, activeItem === 1 && styles.dropdownItemActive]}
              onPress={() => handleItemPress(1)}
            >
              <View style={styles.indicator} />
              <Text style={styles.dropdownText}>Small</Text>
              <View style={styles.iconContainer}>
                <Ionicons name='apps-outline' size={18} color='#D4AF37' />
              </View>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity
              style={[styles.dropdownItem, activeItem === 2 && styles.dropdownItemActive]}
              onPress={() => handleItemPress(2)}
            >
              <View style={styles.indicator} />
              <Text style={styles.dropdownText}>Large</Text>
              <View style={styles.iconContainer}>
                <Ionicons name='grid-outline' size={18} color='#D4AF37' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}
