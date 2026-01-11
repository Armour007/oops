/**
 * NeoPOP Button Component
 * CRED-style 3D extruded button with press animation
 */

import React, { useRef } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    ViewStyle,
    TextStyle,
    View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, shadows, spacing, radius, animations } from '../../theme/neoPOP';

interface NeoPOPButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const NeoPOPButton: React.FC<NeoPOPButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    icon,
    style,
    textStyle,
}) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: animations.pressTranslate,
                duration: animations.fast,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: animations.pressTranslate,
                duration: animations.fast,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: animations.pressScale,
                duration: animations.fast,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(translateX, {
                toValue: 0,
                ...animations.spring,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                ...animations.spring,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                ...animations.spring,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Variant styles
    const variantStyles = {
        primary: {
            backgroundColor: colors.accent,
            textColor: colors.textInverse,
            borderColor: '#000',
            shadowColor: '#000',
        },
        secondary: {
            backgroundColor: colors.teal,
            textColor: colors.textInverse,
            borderColor: '#000',
            shadowColor: '#000',
        },
        outline: {
            backgroundColor: 'transparent',
            textColor: colors.accent,
            borderColor: colors.accent,
            shadowColor: colors.accent,
        },
        ghost: {
            backgroundColor: 'transparent',
            textColor: colors.textPrimary,
            borderColor: 'transparent',
            shadowColor: 'transparent',
        },
    };

    // Size styles
    const sizeStyles = {
        sm: { height: 36, paddingHorizontal: 16, fontSize: 14 },
        md: { height: 48, paddingHorizontal: 24, fontSize: 16 },
        lg: { height: 56, paddingHorizontal: 32, fontSize: 18 },
    };

    const currentVariant = variantStyles[variant];
    const currentSize = sizeStyles[size];

    return (
        <View style={[styles.container, fullWidth && styles.fullWidth, style]}>
            {/* Shadow layer (NeoPOP 3D effect) */}
            {variant !== 'ghost' && (
                <View
                    style={[
                        styles.shadowLayer,
                        {
                            height: currentSize.height,
                            paddingHorizontal: currentSize.paddingHorizontal,
                            backgroundColor: currentVariant.shadowColor,
                        },
                        fullWidth && styles.fullWidth,
                    ]}
                />
            )}

            {/* Button layer */}
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX },
                            { translateY },
                            { scale },
                        ],
                    },
                ]}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={disabled}
                    style={[
                        styles.button,
                        {
                            height: currentSize.height,
                            paddingHorizontal: currentSize.paddingHorizontal,
                            backgroundColor: disabled ? colors.surfaceElevated : currentVariant.backgroundColor,
                            borderColor: currentVariant.borderColor,
                        },
                        fullWidth && styles.fullWidth,
                    ]}
                >
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text
                        style={[
                            styles.text,
                            {
                                fontSize: currentSize.fontSize,
                                color: disabled ? colors.textTertiary : currentVariant.textColor,
                            },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
    },
    fullWidth: {
        width: '100%',
        alignSelf: 'stretch',
    },
    shadowLayer: {
        position: 'absolute',
        top: 4,
        left: 4,
        right: -4,
        borderRadius: radius.sm,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.sm,
        borderWidth: 2,
    },
    iconContainer: {
        marginRight: spacing.xs,
    },
    text: {
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

export default NeoPOPButton;
