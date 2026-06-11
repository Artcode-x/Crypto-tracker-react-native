import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  goldenSkeletonWrapper: {
    width: 70,
    height: 16,
    borderRadius: 4,
    marginTop: 4,
    overflow: "hidden",
    position: "relative"
  },

  goldenSkeletonBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(212, 175, 55, 0.12)"
  },

  shimmerOverlay: {
    position: "absolute",
    width: "200%",
    height: "100%",
    left: 0,
    top: 0
  },

  shimmerGradient: {
    width: "100%",
    height: "100%"
  },

  goldenBorder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "rgba(212, 175, 55, 0.3)"
  }
})
