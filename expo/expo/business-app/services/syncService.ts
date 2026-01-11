/**
 * Sync Service for Real-time Updates
 * Polls the backend at regular intervals to keep data fresh
 */

import { useCampaignStore } from '../store/campaignStore';
import { useCRMStore } from '../store/crmStore';
import { useAuthStore } from '../store/authStore';

// Polling intervals (in milliseconds)
const POLLING_INTERVALS = {
    campaigns: 30000,      // 30 seconds
    crm: 120000,          // 2 minutes
    analytics: 60000,     // 1 minute
};

class SyncService {
    private campaignInterval: ReturnType<typeof setInterval> | null = null;
    private crmInterval: ReturnType<typeof setInterval> | null = null;
    private analyticsInterval: ReturnType<typeof setInterval> | null = null;
    private isRunning: boolean = false;

    /**
     * Start all sync polling
     */
    start() {
        if (this.isRunning) {
            console.log('🔄 SyncService already running');
            return;
        }

        const { user } = useAuthStore.getState();
        if (!user?.merchantId) {
            console.warn('⚠️ Cannot start sync: No merchant logged in');
            return;
        }

        const merchantId = user.merchantId;
        this.isRunning = true;
        console.log('🚀 SyncService started for merchant:', merchantId);

        // Start campaign sync
        this.campaignInterval = setInterval(() => {
            this.syncCampaigns(merchantId);
        }, POLLING_INTERVALS.campaigns);

        // Start CRM sync
        this.crmInterval = setInterval(() => {
            this.syncCRM(merchantId);
        }, POLLING_INTERVALS.crm);

        // Initial sync
        this.syncAll(merchantId);
    }

    /**
     * Stop all sync polling
     */
    stop() {
        if (this.campaignInterval) {
            clearInterval(this.campaignInterval);
            this.campaignInterval = null;
        }
        if (this.crmInterval) {
            clearInterval(this.crmInterval);
            this.crmInterval = null;
        }
        if (this.analyticsInterval) {
            clearInterval(this.analyticsInterval);
            this.analyticsInterval = null;
        }
        this.isRunning = false;
        console.log('🛑 SyncService stopped');
    }

    /**
     * Sync all data immediately
     */
    async syncAll(merchantId: string) {
        console.log('🔄 Syncing all data...');
        await Promise.all([
            this.syncCampaigns(merchantId),
            this.syncCRM(merchantId),
        ]);
        console.log('✅ All data synced');
    }

    /**
     * Sync campaigns from backend
     */
    private async syncCampaigns(merchantId: string) {
        try {
            await useCampaignStore.getState().initializeCampaigns(merchantId);
            console.log('✅ Campaigns synced');
        } catch (error) {
            console.error('❌ Campaign sync failed:', error);
        }
    }

    /**
     * Sync CRM data from backend
     */
    private async syncCRM(merchantId: string) {
        try {
            await useCRMStore.getState().initializeCustomers(merchantId);
            console.log('✅ CRM synced');
        } catch (error) {
            console.error('❌ CRM sync failed:', error);
        }
    }

    /**
     * Force refresh a specific data type
     */
    async refresh(type: 'campaigns' | 'crm' | 'all') {
        const { user } = useAuthStore.getState();
        if (!user?.merchantId) return;

        const merchantId = user.merchantId;

        switch (type) {
            case 'campaigns':
                await this.syncCampaigns(merchantId);
                break;
            case 'crm':
                await this.syncCRM(merchantId);
                break;
            case 'all':
                await this.syncAll(merchantId);
                break;
        }
    }
}

// Export singleton instance
export const syncService = new SyncService();
