import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    containerItem: {
      paddingTop: 0,
      alignItems: "center",
      flexDirection: "row",
      height: "auto",
      flexWrap: "wrap",
      gap: 2,
       justifyContent: "space-between",
    
    },
    containerNames: {
      marginLeft: 10,
    },
    coinName: {
      flexDirection: "row",
    },
    text: {
      color: "#fff",
    },
    textPrice: {
      color: "#fff",
      fontWeight: "400",
    },
    pricePercentage: {
      textAlign: "right",
    },
    priceUp: {
      color: "#00B589",
    },
    priceDown: {
      color: "#fc4422",
    },
    leftBlock: {
      flex: 1,
      alignItems: "center",
    },
    image: {
      alignItems: "center",
      width: 30,
      height: 30,
    },
    textSymbol: {
      color: "#c8cbfa",
      textTransform: "uppercase",
    },
    otherInfo: {
      flex: 1,
      // justifyContent: "right",
      alignItems: 'center',
      
    },
    title: {
      flex: 1,
      alignItems: "center",
      paddingBottom: 2,
      flexWrap: "nowrap",
    },
  })
