import { LinearGradient } from "expo-linear-gradient"
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./AmountInputModal.styles"

const AmountInputModal = ({
  inputModalVisible,
  selectedCoinForInput,
  userAssets,
  amountInputRef,
  setInputModalVisible,
  saveAmount
}) => (
  <Modal
    visible={inputModalVisible}
    transparent={true}
    animationType='fade'
    onRequestClose={() => setInputModalVisible(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={["rgba(26, 26, 26, 0.95)", "rgba(40, 40, 40, 0.9)"]}
          style={styles.modalGradient}
        >
          {selectedCoinForInput && (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Enter amount of {selectedCoinForInput.name}
                </Text>
                <Text style={styles.modalSubtitle}>
                  ({selectedCoinForInput.symbol?.toUpperCase()})
                </Text>
                {/* <Text style={styles.modalPrice}>
                        Current price: $
                        {selectedCoinForInput.current_price?.toLocaleString() || "0.00"}
                      </Text> */}
              </View>

              <TextInput
                style={styles.amountInput}
                key={selectedCoinForInput.id}
                defaultValue={(userAssets[selectedCoinForInput?.id] || "").toString()}
                onChangeText={(text) => {
                  amountInputRef.current = text
                }}
                placeholder='0.00'
                placeholderTextColor='rgba(255, 255, 255, 0.3)'
                keyboardType='decimal-pad'
                autoFocus={true}
              />

              <View style={styles.modalButtonsRow}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Отмена ввода количества")
                    setInputModalVisible(false)
                  }}
                  style={styles.modalButtonCancel}
                >
                  <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveAmount} style={styles.modalButtonSave}>
                  <LinearGradient
                    colors={["#D4AF37", "#B3791F"]}
                    style={styles.saveButtonGradient}
                  >
                    <Text style={styles.modalButtonTextSave}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </LinearGradient>
      </View>
    </View>
  </Modal>
)

export default AmountInputModal
