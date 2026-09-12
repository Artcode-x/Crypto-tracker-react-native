import React, { useRef, useEffect } from "react"
import { Animated, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { styles } from "./AnimatedGoldenSkeleton.styles"

const AnimatedGoldenSkeleton = () => {
  const shimmerValue = useRef(new Animated.Value(-1)).current
  const pulseOpacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      })
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseOpacity, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(pulseOpacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true
        })
      ])
    ).start()
  }, [])

  const translateX = shimmerValue.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200]
  })

  return (
    <View style={styles.goldenSkeletonWrapper}>
      <Animated.View style={[styles.goldenSkeletonBg, { opacity: pulseOpacity }]} />
      <Animated.View style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}>
        <LinearGradient
          colors={[
            "transparent",
            "rgba(212, 175, 55, 0.4)",
            "rgba(255, 215, 0, 0.6)",
            "rgba(212, 175, 55, 0.4)",
            "transparent"
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.shimmerGradient}
        />
      </Animated.View>
      <View style={styles.goldenBorder} />
    </View>
  )
}

export default AnimatedGoldenSkeleton
