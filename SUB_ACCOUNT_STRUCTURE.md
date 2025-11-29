# Structure des Sous-Comptes

## Architecture Modulaire

### 📁 Structure du Module

```
src/modules/sub-accounts/
├── components/
│   ├── SubAccountOverview.tsx      # Aperçu et statistiques
│   ├── SubAccountTransactions.tsx  # Gestion des transactions
│   ├── SubAccountSettings.tsx      # Paramètres et configuration
│   ├── SubAccountNavigation.tsx    # Navigation interne
│   └── index.ts                    # Exports publics
├── pages/
│   ├── SubAccountDetailPage.tsx    # Page principale
│   └── index.ts                    # Exports publics
├── types/
│   └── index.ts                    # Types TypeScript
└── index.ts                        # Export du module
```

## 🔄 Contexte de Navigation

### SubAccountContext
Gère l'état global des sous-comptes :
- `activeSubAccountId` : ID du sous-compte actif
- `activeSection` : Section active (overview, transactions, settings)
- `setActiveSubAccountId()` : Sélectionner un sous-compte
- `setActiveSection()` : Changer de section

```typescript
import { useSubAccount } from '@/core/contexts/SubAccountContext'

const { activeSubAccountId, activeSection, setActiveSubAccountId, setActiveSection } = useSubAccount()
```

## 🎯 Sections du Sous-Compte

### 1. Overview (Aperçu)
- Statistiques principales
- Transactions récentes
- Graphiques de performance
- Indicateurs clés

### 2. Transactions
- Liste complète des transactions
- Filtres avancés (date, période, type, source)
- Statuts (succès, échec, en attente, remboursé)
- Actions en masse (remboursement)
- Pagination

### 3. Settings (Paramètres)
- Informations générales
- Paramètres de sécurité (2FA)
- Notifications
- Clés API

## 🔗 Routage

### Flux de Navigation

1. **Sélection du sous-compte** (DashboardPage)
   - Utilisateur clique sur "Accéder au sous-compte"
   - `setActiveSubAccountId(id)` est appelé
   - `switchToSubAccount(id)` change le compte actif

2. **Affichage du détail** (SubAccountDetailPage)
   - Le contexte SubAccount fournit l'ID actif
   - La navigation interne affiche la section sélectionnée
   - Les composants reçoivent l'ID en props

3. **Changement de section** (SubAccountNavigation)
   - Utilisateur clique sur un onglet
   - `setActiveSection(section)` met à jour l'état
   - Le composant correspondant s'affiche

## 📊 Intégration avec App.tsx

```typescript
<SubAccountProvider>
  <AppContent />
</SubAccountProvider>
```

Le `SubAccountProvider` enveloppe toute l'application pour que le contexte soit accessible partout.

## 🎨 Composants Clés

### SubAccountNavigation
Navigation par onglets avec icônes :
- Aperçu (LayoutGrid)
- Transactions (CreditCard)
- Paramètres (Settings)

### SubAccountOverview
Affiche :
- 4 cartes de statistiques
- Transactions récentes
- Tendances

### SubAccountTransactions
Utilise `TransactionDataTable` avec :
- Filtres date/période/autres
- Statuts avec icônes
- Actions en masse
- Pagination

### SubAccountSettings
Sections :
- Paramètres généraux
- Sécurité (2FA)
- Notifications
- Clés API

## 🔐 Sécurité

- Les sous-comptes sont accessibles uniquement après authentification
- Le contexte SubAccount gère l'accès
- Les données sont filtrées par sous-compte

## 📝 Types

```typescript
interface SubAccountTransaction {
  id: string
  type: 'debit' | 'credit'
  status: 'success' | 'failed' | 'pending' | 'refunded'
  source: string
  clientName: string
  amount: number
  date: string
  // ... autres champs
}

interface SubAccountOverviewData {
  totalTransactions: number
  totalAmount: number
  successRate: number
  averageAmount: number
  recentTransactions: SubAccountTransaction[]
}
```

## 🚀 Utilisation

### Accéder à un sous-compte
```typescript
const { setActiveSubAccountId } = useSubAccount()
setActiveSubAccountId('sub_123')
```

### Changer de section
```typescript
const { setActiveSection } = useSubAccount()
setActiveSection('transactions')
```

### Récupérer l'état actuel
```typescript
const { activeSubAccountId, activeSection } = useSubAccount()
```

## 📈 Extensibilité

Pour ajouter une nouvelle section :

1. Créer un composant dans `components/`
2. Ajouter le type dans `SubAccountContext`
3. Ajouter un bouton dans `SubAccountNavigation`
4. Ajouter la condition dans `SubAccountDetailPage`
5. Exporter depuis `index.ts`
