/**
 * Utopia NeoPOP Design System
 * Inspired by CRED's design language
 */

// Color Palette
export const colors = {
    // Background Colors
    background: '#0D0D0D',      // Pure black
    surface: '#1A1A1A',         // Card background
    surfaceElevated: '#262626', // Elevated surfaces
    surfaceBorder: '#333333',   // Subtle borders

    // Accent Colors - Vibrant on dark
    accent: '#D4AF37',          // Primary CTA, rewards (Gold)
    teal: '#00D9A3',           // Utopia brand, success
    coral: '#FF6B6B',          // Alerts, hot deals
    purple: '#9B59B6',         // Premium, exclusive
    blue: '#3B82F6',           // Info, links

    // Text Colors
    textPrimary: '#FFFFFF',
    textSecondary: '#9CA3AF',
    textTertiary: '#6B7280',
    textInverse: '#0D0D0D',

    // Semantic Colors
    success: '#00D9A3',
    warning: '#FFB800',
    error: '#FF4444',
    info: '#3B82F6',

    // Gradients (arrays for LinearGradient)
    gradientGold: ['#D4AF37', '#B8962D'],
    gradientTeal: ['#00D9A3', '#00B88A'],
    gradientPremium: ['#9B59B6', '#7B2D96'],
};

// Typography
export const typography = {
    // Font Families (using Google Fonts available in Expo)
    fontFamily: {
        serif: 'DMSerifDisplay_400Regular',      // For titles
        sans: 'Inter_400Regular',                 // For body
        sansMedium: 'Inter_500Medium',           // For labels
        sansBold: 'Inter_700Bold',               // For emphasis
        mono: 'JetBrainsMono_500Medium',         // For numbers
    },

    // Font Sizes
    fontSize: {
        hero: 48,
        h1: 32,
        h2: 24,
        h3: 20,
        body: 16,
        caption: 14,
        small: 12,
    },

    // Line Heights
    lineHeight: {
        tight: 1.1,
        normal: 1.4,
        relaxed: 1.6,
    },
};

// Spacing (8px base)
export const spacing = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
};

// Border Radius
export const radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
};

// Shadows (NeoPOP style - hard edges)
export const shadows = {
    // Standard shadow
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
    },
    // Medium extrude
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    // Large extrude (for CTAs)
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    // Pressed state
    pressed: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 1,
    },
    // Soft shadow (for cards)
    soft: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
};

// Animation Presets
export const animations = {
    // Press animation values
    pressScale: 0.98,
    pressTranslate: 2, // pixels to move down-right

    // Spring config
    spring: {
        tension: 100,
        friction: 12,
    },

    // Timing
    fast: 150,
    normal: 250,
    slow: 400,
};

// Component-specific tokens
export const components = {
    // Buttons
    button: {
        height: {
            sm: 36,
            md: 48,
            lg: 56,
        },
        paddingHorizontal: {
            sm: 16,
            md: 24,
            lg: 32,
        },
    },

    // Cards
    card: {
        padding: spacing.lg,
        borderRadius: radius.lg,
        borderWidth: 1,
    },

    // Tab Bar
    tabBar: {
        height: 64,
        borderRadius: radius.full,
        marginHorizontal: 20,
        marginBottom: 16,
    },

    // Input
    input: {
        height: 56,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
    },
};

// Export all as default theme
export const theme = {
    colors,
    typography,
    spacing,
    radius,
    shadows,
    animations,
    components,
};

export default theme;
