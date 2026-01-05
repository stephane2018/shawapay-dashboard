import { Outlet } from 'react-router-dom'
import { AccountProvider, useAccount } from './core/contexts/AccountContext'
import { ThemeProvider } from './core/providers/ThemeProvider'
import { MainLayout } from './shared/layouts/MainLayout'
import { SubAccountLayout } from './shared/layouts/SubAccountLayout'
import { useAuthInit } from './core/hooks/use-auth-init'

const AppContent = () => {
  const { activeAccountType } = useAccount();
  useAuthInit(); // Initialize auth state

  if (activeAccountType === 'main') {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }

  return (
    <SubAccountLayout>
      <Outlet />
    </SubAccountLayout>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="shawapay-ui-theme">
      <AccountProvider>
        <AppContent />
      </AccountProvider>
    </ThemeProvider>
  )
}

export default App
