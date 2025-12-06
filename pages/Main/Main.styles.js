import { StyleSheet } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

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
    marginBottom: 10,
    alignItems: "center"
  },

  title: {
    fontSize: RFValue(17),
    color: "#fff",
    marginTop: 10
  },

  searchInput: {
    color: "#fff",
    borderBottomColor: "#c8cbfa",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "left",
    marginTop: 7,
    padding: 3
  },

  changeView: {
    color: "white",
    alignItems: "center",
    paddingTop: "3%"
  },

  openMenu: {
    //
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
    width: "100%",
    paddingVertical: 50
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    textShadowColor: "rgba(14, 2, 117, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },

  // ErrorContainer для других ошибок (не 429)
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 15,
    margin: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#f44336",
    alignItems: "center"
  },

  errorText: {
    color: "#c62828",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10
  },

  retryButton: {
    backgroundColor: "gray",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5
  },

  retryButtonText: {
    color: "wheat",
    fontSize: 14,
    fontWeight: "600"
  },

  // Информационный контейнер
  infoContainer: {
    padding: 8,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: "100%"
  },

  infoText: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "center"
  },

  // Баннер ошибки 429
  errorBanner: {
    backgroundColor: "#ff6b35",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
    zIndex: 1000,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    width: "95%",
    alignSelf: "center"
  },

  errorBannerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  errorBannerText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    fontWeight: "500"
  },

  retryButtonSmall: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 10
  },

  retryButtonTextSmall: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600"
  },

  countdownBar: {
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 1.5,
    marginTop: 8,
    overflow: "hidden",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0
  },

  countdownProgress: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 1.5
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 150 // ???
  },

  emptyText: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
    textAlign: "center"
  }
})
