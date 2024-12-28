import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Темный полупрозрачный фон
    },
    modalContent: {
      width: "90%",
      maxWidth: 500,
      height: 'auto',
      backgroundColor: "white",
      borderRadius: 20,
       paddingVertical: 5,
       paddingHorizontal: 5,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 24, 
      fontWeight: "bold",
      color: "#333",
      paddingBottom: '10',
    },
    closeButton: {
       marginTop: 10,
  
      backgroundColor: "#ff4757",
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    closeButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    chartButtons: {
       flexDirection: 'row',
       gap: '10',
      backgroundColor: 'whitesmoke',
      padding: '10',
      borderRadius: '2%',
      // add
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 5, // Для Android
    },
    chartButton: {
      marginTop: 0,
      backgroundColor: '#cccccc',
      borderRadius: 5,
      paddingVertical: 7,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    activeButton: {
      backgroundColor: '#000', 
    },
    buttonText: {
      color: '#000',
    },
    activeButtonText: {
      color: '#fff', 
    },
    container: {
      alignItems: 'center',
      padding: '5',
  },
  image: {
      width: 30,
      height: 30, 
      marginTop: 5,
  },
  priceText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#333',
  },
  coinInfo: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderRadius: '2%', 
    paddingLeft: '10', 
    paddingRight: '10', 
    alignItems: "center", 
    backgroundColor: 'whitesmoke',
     // add
     padding: '3',
     shadowColor: '#000',
     shadowOffset: {
         width: 0,
         height: 4,
     },
     shadowOpacity: 0.15,
     shadowRadius: 6,
     elevation: 5, // Для Android
  },
  coinInfoBox: {
    flex: 1,
     alignItems: 'flex-start', 
     paddingRight: 10 
  }
  });