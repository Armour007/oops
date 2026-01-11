/**
 * Centralized Error Handler for Merchant App
 * Provides user-friendly error messages, retry logic, and offline queue
 */

import { Alert } from 'react-native';

// Error types
export type ErrorType =
    | 'network'
    | 'auth'
    | 'validation'
    | 'server'
    | 'unknown';

export interface AppError {
    type: ErrorType;
    message: string;
    originalError?: any;
    retryable: boolean;
}

// User-friendly error messages
const ERROR_MESSAGES: Record<ErrorType, string> = {
    network: 'Unable to connect. Please check your internet connection.',
    auth: 'Session expired. Please log in again.',
    validation: 'Please check your input and try again.',
    server: 'Something went wrong. Please try again later.',
    unknown: 'An unexpected error occurred.',
};

/**
 * Parse API error into user-friendly format
 */
export function parseError(error: any): AppError {
    // Network error
    if (error.message?.includes('Network request failed') ||
        error.message?.includes('Network error')) {
        return {
            type: 'network',
            message: ERROR_MESSAGES.network,
            originalError: error,
            retryable: true,
        };
    }

    // Auth error
    if (error.status === 401 || error.message?.includes('Unauthorized')) {
        return {
            type: 'auth',
            message: ERROR_MESSAGES.auth,
            originalError: error,
            retryable: false,
        };
    }

    // Validation error
    if (error.status === 400 || error.status === 422) {
        return {
            type: 'validation',
            message: error.message || ERROR_MESSAGES.validation,
            originalError: error,
            retryable: false,
        };
    }

    // Server error
    if (error.status >= 500) {
        return {
            type: 'server',
            message: ERROR_MESSAGES.server,
            originalError: error,
            retryable: true,
        };
    }

    // Unknown error
    return {
        type: 'unknown',
        message: error.message || ERROR_MESSAGES.unknown,
        originalError: error,
        retryable: true,
    };
}

/**
 * Show user-friendly error alert
 */
export function showError(error: AppError, onRetry?: () => void) {
    const buttons: any[] = [{ text: 'OK', style: 'cancel' }];

    if (error.retryable && onRetry) {
        buttons.push({ text: 'Retry', onPress: onRetry });
    }

    Alert.alert('Error', error.message, buttons);
}

/**
 * Retry wrapper with exponential backoff
 */
export async function withRetry<T>(
    fn: () => Promise<T>,
    options: {
        maxAttempts?: number;
        delayMs?: number;
        onRetry?: (attempt: number, error: any) => void;
    } = {}
): Promise<T> {
    const { maxAttempts = 3, delayMs = 1000, onRetry } = options;
    let lastError: any;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (attempt < maxAttempts) {
                onRetry?.(attempt, error);
                // Exponential backoff: 1s, 2s, 4s...
                await new Promise(resolve =>
                    setTimeout(resolve, delayMs * Math.pow(2, attempt - 1))
                );
            }
        }
    }

    throw lastError;
}

/**
 * Offline action queue for processing when back online
 */
interface QueuedAction {
    id: string;
    action: () => Promise<any>;
    createdAt: number;
    description: string;
}

class OfflineQueue {
    private queue: QueuedAction[] = [];
    private isProcessing: boolean = false;

    /**
     * Add action to queue
     */
    add(action: () => Promise<any>, description: string): string {
        const id = `action_${Date.now()}`;
        this.queue.push({
            id,
            action,
            createdAt: Date.now(),
            description,
        });
        console.log(`📥 Queued offline action: ${description}`);
        return id;
    }

    /**
     * Process all queued actions
     */
    async processQueue(): Promise<void> {
        if (this.isProcessing || this.queue.length === 0) return;

        this.isProcessing = true;
        console.log(`🔄 Processing ${this.queue.length} queued actions...`);

        const results = await Promise.allSettled(
            this.queue.map(item => item.action())
        );

        const succeeded = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;

        console.log(`✅ Queue processed: ${succeeded} succeeded, ${failed} failed`);

        // Clear processed items (keep failed for retry)
        this.queue = this.queue.filter((_, index) =>
            results[index].status === 'rejected'
        );

        this.isProcessing = false;
    }

    /**
     * Get queue status
     */
    getStatus() {
        return {
            count: this.queue.length,
            isProcessing: this.isProcessing,
        };
    }

    /**
     * Clear all queued actions
     */
    clear() {
        this.queue = [];
    }
}

// Export singleton instance
export const offlineQueue = new OfflineQueue();
