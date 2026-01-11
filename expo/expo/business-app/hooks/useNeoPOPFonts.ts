/**
 * Font Loading Hook
 * Loads Google Fonts for NeoPOP design system
 */

import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import {
    DMSerifDisplay_400Regular,
} from '@expo-google-fonts/dm-serif-display';
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';

export const useNeoPOPFonts = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    // Serif - For titles (CRED Cirka equivalent)
                    DMSerifDisplay_400Regular,

                    // Sans - For body text (CRED Gilroy equivalent)
                    Inter_400Regular,
                    Inter_500Medium,
                    Inter_600SemiBold,
                    Inter_700Bold,

                    // Mono - For numbers (CRED Overpass Mono equivalent)
                    JetBrainsMono_400Regular,
                    JetBrainsMono_500Medium,
                    JetBrainsMono_700Bold,
                });
                setFontsLoaded(true);
            } catch (error) {
                console.error('Error loading fonts:', error);
                // Fallback to system fonts
                setFontsLoaded(true);
            }
        }

        loadFonts();
    }, []);

    return fontsLoaded;
};

// Font family constants for easy reference
export const fonts = {
    // Titles
    serifRegular: 'DMSerifDisplay_400Regular',

    // Body
    sansRegular: 'Inter_400Regular',
    sansMedium: 'Inter_500Medium',
    sansSemiBold: 'Inter_600SemiBold',
    sansBold: 'Inter_700Bold',

    // Numbers
    monoRegular: 'JetBrainsMono_400Regular',
    monoMedium: 'JetBrainsMono_500Medium',
    monoBold: 'JetBrainsMono_700Bold',
};

export default useNeoPOPFonts;
