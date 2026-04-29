import React, { useEffect, useRef, memo } from "react"
import { View, Animated, StyleSheet, Easing } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const ShimmerCard = memo(
  ({ children, style, isLoading = true, shimmerIntensity = "medium" }) => {
    const shimmerAnimation = useRef(new Animated.Value(-1)).current

    // Настройки интенсивности
    const intensityMap = {
      low: {
        primary: "rgba(255, 255, 255, 0.04)",
        gold: "rgba(255, 215, 0, 0.06)",
        highlight: "rgba(255, 255, 255, 0.08)"
      },
      medium: {
        primary: "rgba(255, 255, 255, 0.06)",
        gold: "rgba(255, 215, 0, 0.12)",
        highlight: "rgba(255, 255, 255, 0.15)"
      },
      high: {
        primary: "rgba(255, 255, 255, 0.08)",
        gold: "rgba(255, 215, 0, 0.18)",
        highlight: "rgba(255, 255, 255, 0.22)"
      }
    }

    const colors = intensityMap[shimmerIntensity] || intensityMap.medium

    useEffect(() => {
      let animation1 = null

      if (isLoading) {
        // Основная анимация с easing для плавности
        animation1 = Animated.loop(
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: 3000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
            isInteraction: false
          })
        )

        animation1.start()
      } else {
        shimmerAnimation.stopAnimation()
        shimmerAnimation.setValue(-1)
      }

      return () => {
        if (animation1) animation1.stop()
      }
    }, [isLoading, shimmerAnimation])

    if (!isLoading) {
      return <View style={style}>{children}</View>
    }

    const translateX = shimmerAnimation.interpolate({
      inputRange: [-1, -0.5, 0, 0.5, 1],
      outputRange: [-400, -200, 0, 200, 400]
    })

    const opacityAnim = shimmerAnimation.interpolate({
      inputRange: [-1, -0.5, 0, 0.5, 1],
      outputRange: [0.3, 0.5, 1, 0.5, 0.3]
    })

    return (
      <View style={[style, styles.container]}>
        {children}

        <View style={StyleSheet.absoluteFillObject} pointerEvents='none'>
          {/* Первый слой - основной шиммер */}
          <Animated.View
            style={[
              styles.shimmerOverlay,
              {
                transform: [{ translateX }],
                opacity: opacityAnim
              }
            ]}
          >
            <LinearGradient
              colors={["transparent", colors.highlight, "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.shimmerGradient}
            />
          </Animated.View>

          {/* Третий слой - эффект мягкого края (статичный) */}
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0.02)",
              "transparent",
              "transparent",
              "rgba(255, 255, 255, 0.02)"
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.edgeGlow}
          />
        </View>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden"
  },
  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "150%",
    height: "100%"
  },

  shimmerGradient: {
    width: "100%",
    height: "100%"
  },
  edgeGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default ShimmerCard
