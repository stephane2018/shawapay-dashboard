import React from 'react';
import { SidebarSub } from './SidebarSub';
import { Header } from './Header';

interface SubAccountLayoutProps {
    children: React.ReactNode;
}

export const SubAccountLayout = ({ children }: SubAccountLayoutProps) => {
    return (
        <div className="flex h-screen bg-muted/20">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 h-full">
                <SidebarSub />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header SidebarComponent={SidebarSub} />
                <main className="flex-1 overflow-y-auto p-6 bg-muted/40 dark:bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
};
