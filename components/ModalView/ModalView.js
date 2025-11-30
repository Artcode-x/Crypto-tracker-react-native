import { Modal, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./ModalView.styles"
import { useDispatch } from "react-redux"
import { setFlagForView } from "../../store/reducersSlice"

export const ModalView = ({ modal, setModal }) => {
  const dispatch = useDispatch()
  const handlePress = (e) => {
    if (e === 1) {
      dispatch(setFlagForView(false))
      // console.log("open small")
    } else {
      dispatch(setFlagForView(true))
      //   console.log("open large")
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
            <Text style={styles.dropdownText}>Small</Text>
            <Ionicons style={styles.changePoint} name='apps' size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.dropdownItem} onPress={() => handlePress(2)}>
          <Text style={styles.dropdownText}>Large</Text>
          <Ionicons style={styles.changePoint} name='grid' size={20} />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
