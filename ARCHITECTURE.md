# Architecture du Dashboard ShawaPay

## Structure Modulaire

Le projet suit une architecture modulaire avec deux espaces principaux : **Main Account** et **Sub-Account**.

### 📁 Structure des Dossiers

```
src/
├── modules/
│   ├── main-account/              # Modules du compte principal
│   │   └── index.ts              # Exports des modules
│   │
│   ├── dashboard/                 # Dashboard principal
│   │   ├── pages/
│   │   │   └── DashboardPage.tsx
│   │   └── components/
│   │
│   ├── transactions/              # Transactions (main account)
│   │   └── pages/
│   │       └── TransactionsPage.tsx
│   │
│   ├── users/                     # Utilisateurs (main account)
│   │   └── pages/
│   │       └── UsersPage.tsx
│   │
│   ├── rewards/                   # Récompenses (main account)
│   │   └── pages/
│   │       └── RewardsPage.tsx
│   │
│   └── sub-account/               # Modules du sous-compte
│       ├── pages/
│       │   ├── SubAccountLayout.tsx           # Layout wrapper
│       │   ├── SubAccountDashboardPage.tsx    # Dashboard
│       │   ├── SubAccountTransactionsPage.tsx # Transactions
│       │   ├── SubAccountClientsPage.tsx      # Clients
│       │   ├── SubAccountReversementsPage.tsx # Reversements
│       │   └── SubAccountDevelopersPage.tsx   # Développeurs (API)
│       ├── components/
│       └── index.ts
│
├── shared/
│   ├── components/
│   │   └── common/
│   │       └── data-table/        # Composants DataTable réutilisables
│   │           ├── TransactionDataTable.tsx
│   │           ├── DataTableSkeleton.tsx
│   │           └── ...
│   └── layouts/
│       ├── MainLayout.tsx         # Layout pour main account
│       ├── SubAccountLayout.tsx   # Layout pour sub-account
│       ├── SidebarMain.tsx        # Sidebar main account
│       ├── SubAccountSidebar.tsx  # Sidebar sub-account
│       └── Header.tsx
│
└── core/
    ├── contexts/
    │   ├── NavigationContext.tsx   # Gestion navigation main account
    │   ├── SubAccountContext.tsx   # Gestion navigation sub-account
    │   └── AccountContext.tsx      # Gestion du type de compte
    └── components/
```

## 🔄 Navigation et Routing

### Main Account (Compte Principal)

**Sections disponibles :**
- `sous-comptes` - Dashboard principal avec sous-comptes
- `transactions` - Transactions du compte principal
- `utilisateurs` - Gestion des utilisateurs
- `recompenses` - Gestion des récompenses
- `abonnements` - Abonnements

**Navigation :**
- Gérée par `NavigationContext`
- Sidebar : `SidebarMain.tsx`
- Layout : `MainLayout.tsx`

### Sub-Account (Sous-Compte)

**Sections disponibles :**
- `dashboard` - Tableau de bord du sous-compte
- `transactions` - Transactions du sous-compte
- `clients` - Gestion des clients
- `reversements` - Gestion des reversements
- `developers` - Clés API et développeurs

**Navigation :**
- Gérée par `SubAccountContext`
- Sidebar : `SubAccountSidebar.tsx`
- Layout : `SubAccountLayout.tsx` (wrapper)

## 🔀 Basculement entre Comptes

Le basculement entre compte principal et sous-compte est géré par `AccountContext` :

```typescript
// Dans AccountContext
activeAccountType: 'main' | 'sub'

// Dans App.tsx
if (activeAccountType === 'main') {
  return <MainLayout><MainAccountContent /></MainLayout>
} else {
  return <SubAccountLayoutPage />
}
```

## 📊 Composants Réutilisables

### TransactionDataTable

Composant DataTable avancé utilisé dans :
- Transactions (main account)
- Utilisateurs (main account)
- Récompenses (main account)
- Transactions (sub-account)
- Clients (sub-account)
- Reversements (sub-account)

**Fonctionnalités :**
- Filtrage par date
- Filtrage par période
- Autres filtres (dynamiques)
- Onglets de statut avec icônes
- Recherche
- Téléchargement
- Actions en masse
- Pagination
- Sélection de lignes

## 🎨 Thème et Couleurs

**Couleur principale :** Dégradé bleu-violet
- Gradient : `from-blue-600 to-violet-600`
- Utilisé pour : boutons actifs, titres, accents

**Couleurs sémantiques :**
- Succès : vert
- Erreur : rouge
- Avertissement : amber/orange
- Info : bleu

## 🔐 Contextes Disponibles

### NavigationContext
Gère la navigation du compte principal
```typescript
useNavigation() => {
  activeSection: MainSection
  setActiveSection: (section: MainSection) => void
}
```

### SubAccountContext
Gère la navigation du sous-compte
```typescript
useSubAccount() => {
  activeSection: SubAccountSection
  setActiveSection: (section: SubAccountSection) => void
  currentSubAccountId?: string
  setCurrentSubAccountId: (id: string) => void
}
```

### AccountContext
Gère le type de compte actif
```typescript
useAccount() => {
  activeAccountType: 'main' | 'sub'
  currentAccount: Account
  switchToMainAccount: () => void
  switchToSubAccount: (id: string) => void
}
```

## 📝 Ajout d'une Nouvelle Page

### Pour Main Account

1. Créer le dossier : `src/modules/[module-name]/pages/`
2. Créer la page : `[ModuleName]Page.tsx`
3. Ajouter le type dans `NavigationContext` : `type MainSection = '...' | '[new-section]'`
4. Ajouter l'item dans `SidebarMain.tsx`
5. Ajouter le case dans `MainAccountContent` (App.tsx)

### Pour Sub-Account

1. Créer la page : `src/modules/sub-account/pages/SubAccount[ModuleName]Page.tsx`
2. Ajouter le type dans `SubAccountContext` : `type SubAccountSection = '...' | '[new-section]'`
3. Ajouter l'item dans `SubAccountSidebar.tsx`
4. Ajouter le case dans `SubAccountContent` (SubAccountLayout.tsx)

## 🚀 Déploiement

- URL principale : `http://localhost:5174/`
- Tous les modules sont intégrés dans le même bundle
- Navigation client-side via contextes React
