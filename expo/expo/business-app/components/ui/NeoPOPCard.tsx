/**
 * NeoPOP Card Component
 * CRED-style card with 3D extrude shadow
 */

import React from 'react';
import {
    View,
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { colors, radius, spacing, shadows } from '../../theme/neoPOP';

interface NeoPOPCardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined';
    onPress?: () => void;
    style?: ViewStyle;
    shadowOffset?: number;
}

export const NeoPOPCard: React.FC<NeoPOPCardProps> = ({
    children,
    variant = 'default',
    onPress,
    style,
    shadowOffset = 4,
}) => {
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (onPress) {
            Animated.spring(scale, {
                toValue: 0.98,
                useNativeDriver: true,
            }).start();
        }
    };

    const handlePressOut = () => {
        if (onPress) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    };

    const variantStyles = {
        default: {
            backgroundColor: colors.surface,
            borderColor: colors.surfaceBorder,
            borderWidth: 1,
        },
        elevated: {
            backgroundColor: colors.surfaceElevated,
            borderColor: 'transparent',
            borderWidth: 0,
        },
        outlined: {
            backgroundColor: 'transparent',
            borderColor: colors.accent,
            borderWidth: 2,
        },
    };

    const currentVariant = variantStyles[variant];

    const cardContent = (
        <Animated.View style={{ transform: [{ scale }] }}>
            {/* Shadow layer */}
            <View
                style={[
                    styles.shadowLayer,
                    {
                        top: shadowOffset,
                        left: shadowOffset,
                    },
                ]}
            />

            {/* Main card */}
            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: currentVariant.backgroundColor,
                        borderColor: currentVariant.borderColor,
                        borderWidth: currentVariant.borderWidth,
                    },
                    style,
                ]}
            >
                {children}
            </View>
        </Animated.View>
    );

    if (onPress) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.container}
            >
                {cardContent}
            </TouchableOpacity>
        );
    }

    return <View style={styles.container}>{cardContent}</View>;
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    shadowLayer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#000',
        borderRadius: radius.lg,
    },
    card: {
        padding: spacing.lg,
        borderRadius: radius.lg,
    },
});

export default NeoPOPCard;
