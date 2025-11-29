import React from 'react';
import { SidebarMain } from './SidebarMain';
import { Header } from './Header';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex h-screen bg-muted/20">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 h-full">
                <SidebarMain />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header SidebarComponent={SidebarMain} />
                <main className="flex-1 overflow-y-auto p-6 bg-muted/40 dark:bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
};
