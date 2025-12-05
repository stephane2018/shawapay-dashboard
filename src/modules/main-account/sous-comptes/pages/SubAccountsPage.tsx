import React from 'react';
import { SubAccountsSection } from '@/modules/main-account/dashboard/components/SubAccountsSection';

export const SubAccountsPage = () => {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Mes sous-comptes
                    </h2>
                    <p className="text-muted-foreground">
                        Gérez et accédez à tous vos sous-comptes
                    </p>
                </div>
            </div>

            {/* Sub Accounts Section */}
            <SubAccountsSection />
        </div>
    );
};
