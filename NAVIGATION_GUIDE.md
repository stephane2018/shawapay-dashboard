# Guide de Navigation - ShawaPay Dashboard

## 🎯 Vue d'ensemble

Le dashboard ShawaPay utilise une architecture de navigation à deux niveaux :
1. **Compte Principal (Main Account)** - Gestion globale
2. **Sous-comptes (Sub-Accounts)** - Gestion spécifique par sous-compte

## 🏠 Compte Principal

### Sections disponibles

Accédez via la sidebar gauche "Mes sous-comptes" :

| Section | URL | Description |
|---------|-----|-------------|
| **Mes sous-comptes** | `/` | Dashboard principal + liste des sous-comptes |
| **Mes transactions** | `/transactions` | Transactions du compte principal |
| **Utilisateurs** | `/users` | Gestion des utilisateurs |
| **Récompenses** | `/rewards` | Gestion des récompenses |
| **Mes abonnements** | `/subscriptions` | Gestion des abonnements |

### Fonctionnalités du compte principal

- 📊 Dashboard avec statistiques globales
- 💳 Gestion des sous-comptes
- 📈 Visualisation des transactions
- 👥 Gestion des utilisateurs
- 🎁 Gestion des récompenses
- 📋 Rapports et analytics

## 🔄 Basculement vers un Sous-compte

### Depuis la page "Mes sous-comptes"

1. Cliquez sur **"Accéder"** sur la carte du sous-compte
2. Vous êtes automatiquement redirigé vers le dashboard du sous-compte
3. La sidebar change pour afficher les modules du sous-compte

### Retour au compte principal

1. Cliquez sur **"Retour aux sous-comptes"** en haut de la sidebar
2. Vous êtes redirigé vers la page "Mes sous-comptes"

## 📱 Modules du Sous-compte

Une fois dans un sous-compte, accédez via la sidebar gauche :

| Module | Description | Fonctionnalités |
|--------|-------------|-----------------|
| **Tableau de bord** | Vue d'ensemble | Statistiques, accès rapide |
| **Transactions** | Gestion des transactions | Filtres, export, actions en masse |
| **Clients** | Gestion des clients | Ajout, modification, suppression |
| **Reversements** | Gestion des reversements | Suivi, relance, historique |
| **Développeurs** | Clés API | Génération, régénération, suppression |

## 🔐 Contextes de Navigation

### NavigationContext (Compte Principal)

```typescript
import { useNavigation } from '@/core/contexts/NavigationContext'

const { activeSection, setActiveSection } = useNavigation()

// Sections disponibles
type MainSection = 'sous-comptes' | 'transactions' | 'utilisateurs' | 'abonnements' | 'recompenses'

// Changer de section
setActiveSection('transactions')
```

### SubAccountContext (Sous-compte)

```typescript
import { useSubAccount } from '@/core/contexts/SubAccountContext'

const { activeSection, setActiveSection, currentSubAccountId } = useSubAccount()

// Sections disponibles
type SubAccountSection = 'dashboard' | 'transactions' | 'clients' | 'reversements' | 'developers'

// Changer de section
setActiveSection('transactions')
```

### AccountContext (Type de compte)

```typescript
import { useAccount } from '@/core/contexts/AccountContext'

const { activeAccountType, switchToSubAccount, switchToMainAccount } = useAccount()

// Basculer vers un sous-compte
switchToSubAccount('SUB001')

// Retourner au compte principal
switchToMainAccount()
```

## 📊 Composants DataTable

Les pages suivantes utilisent le composant `TransactionDataTable` réutilisable :

### Compte Principal
- ✅ Transactions
- ✅ Utilisateurs
- ✅ Récompenses

### Sous-compte
- ✅ Transactions
- ✅ Clients
- ✅ Reversements

### Fonctionnalités du DataTable

- 🔍 **Recherche** - Recherche en temps réel
- 📅 **Filtres de date** - Filtrer par date unique
- 📆 **Filtres de période** - Filtrer par plage de dates
- 🎯 **Autres filtres** - Filtres dynamiques (type, source, etc.)
- 📑 **Onglets de statut** - Filtrer par statut avec icônes
- 📥 **Téléchargement** - Exporter les données
- ✅ **Sélection** - Sélectionner plusieurs lignes
- ⚡ **Actions en masse** - Appliquer des actions à plusieurs lignes
- 📄 **Pagination** - Navigation entre les pages

## 🎨 Thème et Couleurs

### Couleur principale
- **Gradient bleu-violet** : `from-blue-600 to-violet-600`
- Utilisé pour les boutons actifs, titres, accents

### Couleurs sémantiques
- 🟢 **Succès** : Vert
- 🔴 **Erreur** : Rouge
- 🟠 **Avertissement** : Amber/Orange
- 🔵 **Info** : Bleu

## 🚀 Flux de navigation typique

### Scénario 1 : Consulter les transactions d'un sous-compte

1. Accueil → Cliquez sur "Mes sous-comptes" (sidebar)
2. Page des sous-comptes → Cliquez sur "Accéder" du sous-compte
3. Dashboard du sous-compte → Cliquez sur "Transactions" (sidebar)
4. Page des transactions du sous-compte

### Scénario 2 : Gérer les clients d'un sous-compte

1. Accueil → Cliquez sur "Mes sous-comptes" (sidebar)
2. Page des sous-comptes → Cliquez sur "Accéder" du sous-compte
3. Dashboard du sous-compte → Cliquez sur "Clients" (sidebar)
4. Page des clients du sous-compte

### Scénario 3 : Retourner au compte principal

1. N'importe quelle page du sous-compte → Cliquez sur "Retour aux sous-comptes" (sidebar)
2. Page des sous-comptes
3. Cliquez sur "Mes transactions" pour voir les transactions du compte principal

## 🔗 URLs et Routes

### Compte Principal
- `/` - Dashboard / Sous-comptes
- `/transactions` - Transactions
- `/users` - Utilisateurs
- `/rewards` - Récompenses

### Sous-compte
- Toutes les pages du sous-compte sont rendues côté client
- Navigation via contextes React (pas de changement d'URL)
- Le layout change dynamiquement selon `activeAccountType`

## 💡 Conseils d'utilisation

1. **Utilisez les icônes** - Les icônes dans les onglets et boutons facilitent la navigation
2. **Explorez les filtres** - Utilisez les filtres pour trouver rapidement les données
3. **Actions en masse** - Sélectionnez plusieurs lignes pour appliquer des actions
4. **Téléchargement** - Exportez les données pour les analyser hors ligne
5. **Clés API** - Générez des clés API pour l'intégration développeur

## ❓ FAQ

**Q: Comment créer un nouveau sous-compte?**
A: Cliquez sur "Créer un sous-compte" dans la page "Mes sous-comptes"

**Q: Comment changer de sous-compte?**
A: Cliquez sur "Retour aux sous-comptes", puis "Accéder" sur le sous-compte souhaité

**Q: Où trouver les clés API?**
A: Dans le sous-compte, cliquez sur "Développeurs" dans la sidebar

**Q: Comment exporter les données?**
A: Cliquez sur "Télécharger" dans les pages avec DataTable

**Q: Puis-je modifier les filtres?**
A: Oui, les filtres sont dynamiques et peuvent être personnalisés par page
