import { AccountProvider, useAccount } from './core/contexts/AccountContext'
import { NavigationProvider, useNavigation } from './core/contexts/NavigationContext'
import { DashboardPage } from './modules/dashboard/pages/DashboardPage'
import { TransactionsPage } from './modules/transactions/pages/TransactionsPage'
import { UsersPage } from './modules/users/pages/UsersPage'
import { RewardsPage } from './modules/rewards/pages/RewardsPage'
import { MainLayout } from './shared/layouts/MainLayout'
import { SubAccountLayout } from './shared/layouts/SubAccountLayout'

const MainAccountContent = () => {
  const { activeSection } = useNavigation();

  switch (activeSection) {
    case 'transactions':
      return <TransactionsPage />;
    case 'utilisateurs':
      return <UsersPage />;
    case 'recompenses':
      return <RewardsPage />;
    case 'abonnements':
      return <DashboardPage />; // Placeholder for now
    case 'sous-comptes':
    default:
      return <DashboardPage />;
  }
};

const AppContent = () => {
  const { activeAccountType } = useAccount();

  if (activeAccountType === 'main') {
    return (
      <MainLayout>
        <MainAccountContent />
      </MainLayout>
    );
  }

  return (
    <SubAccountLayout>
      <DashboardPage />
    </SubAccountLayout>
  );
};

function App() {
  return (
    <AccountProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </AccountProvider>
  )
}

export default App
