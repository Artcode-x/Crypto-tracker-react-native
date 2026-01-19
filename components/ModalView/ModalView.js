// import { Modal, Text, TouchableOpacity, View } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { styles } from "./ModalView.styles"
// import { useDispatch } from "react-redux"
// import { setFlagForView } from "../../store/reducersSlice"

// export const ModalView = ({ modal, setModal }) => {
//   const dispatch = useDispatch()
//   const handlePress = (e) => {
//     if (e === 1) {
//       dispatch(setFlagForView(false))
//       // console.log("open small")
//     } else {
//       dispatch(setFlagForView(true))
//       //   console.log("open large")
//     }
//     setModal(!modal)
//   }
//   return (
//     <Modal
//       transparent={true}
//       visible={modal}
//       animationType='fade'
//       onRequestClose={handlePress}
//     >
//       <View style={styles.dropdown}>
//         <View style={styles.dropbox}>
//           <TouchableOpacity style={styles.dropdownItem} onPress={() => handlePress(1)}>
//             <Text style={styles.dropdownText}>Small</Text>
//             <Ionicons style={styles.changePoint} name='apps' size={20} />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.dropdownItem} onPress={() => handlePress(2)}>
//           <Text style={styles.dropdownText}>Large</Text>
//           <Ionicons style={styles.changePoint} name='grid' size={20} />
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   )
// }

// ModalView.jsx
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
