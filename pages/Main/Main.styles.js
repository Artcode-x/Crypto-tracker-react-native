import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "left"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)" // Темный полупрозрачный фон
  },
  modalContent: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ff4757",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  chartButtons: {
    //  flex: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: "10",
    marginBottom: 20
  },
  chartButton: {
    marginTop: 0,
    backgroundColor: "#cccccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  activeButton: {
    backgroundColor: "#000" // Цвет фона для активной кнопки
  },
  buttonText: {
    color: "#000"
  },
  activeButtonText: {
    color: "#fff" // Цвет текста для активной кнопки
  },
  changeView: {
    color: "white",

    alignItems: "center",
    paddingTop: "3%"
  }
})
