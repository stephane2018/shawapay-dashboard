import React from 'react';

export const SubscriptionsPage: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Abonnements</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4">
                    <p className="text-gray-600 dark:text-gray-400">
                        Gestion des abonnements et plans
                    </p>
                    {/* Subscriptions content will go here */}
                </div>
            </div>
        </div>
    );
};
