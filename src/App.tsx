import { AccountProvider, useAccount } from './core/contexts/AccountContext'
import { NavigationProvider, useNavigation } from './core/contexts/NavigationContext'
import { MainLayout } from './shared/layouts/MainLayout'
import { SubAccountLayout } from './shared/layouts/SubAccountLayout'
import {
  getMainAccountComponent,
  getSubAccountComponent
} from './core/routes'
import type { MainAccountRoute, SubAccountRoute } from './core/routes'

const MainAccountContent = () => {
  const { activeSection } = useNavigation();

  // Map activeSection to MainAccountRoute
  const route = (activeSection || 'dashboard') as MainAccountRoute;
  const Component = getMainAccountComponent(route);

  return <Component />;
};

const SubAccountContent = () => {
  const { activeSection } = useNavigation();

  // Map activeSection to SubAccountRoute
  const route = (activeSection || 'transactions') as SubAccountRoute;
  const Component = getSubAccountComponent(route);

  return <Component />;
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
      <SubAccountContent />
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
