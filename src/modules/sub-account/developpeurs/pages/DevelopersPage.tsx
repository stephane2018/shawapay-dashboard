'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Badge } from '@/shared/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import {
    Copy,
    Eye,
    EyeOff,
    AlertCircle,
    Terminal,
    Key,
    CheckCircle,
    RefreshCw,
    Book,
    Code
} from 'lucide-react'
import { TickCircle, RefreshCircle } from 'iconsax-react'

export const DevelopersPage = () => {
    const [showLiveKey, setShowLiveKey] = React.useState(false)
    const [showTestKey, setShowTestKey] = React.useState(false)

    const liveApiKey = 'pk_live_XXXXXXXXXXXXXXXXXXXX'
    const testApiKey = 'pk_test_XXXXXXXXXXXXXXXXXXXX'
    const webhookUrl = 'https://api.example.com/webhooks/shawapay'

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Développeurs</h2>
                <p className="text-muted-foreground">
                    Intégrez Shawapay à votre application avec notre API
                </p>
            </div>

            <Tabs defaultValue="api-keys" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="api-keys">Clés API</TabsTrigger>
                    <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                    <TabsTrigger value="documentation">Documentation</TabsTrigger>
                </TabsList>

                {/* API Keys Tab */}
                <TabsContent value="api-keys" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Live API Key */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Key className="h-5 w-5 text-green-600" />
                                        <CardTitle>Clé API Live</CardTitle>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        Production
                                    </Badge>
                                </div>
                                <CardDescription>Utilisez cette clé pour les transactions réelles</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Clé secrète</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type={showLiveKey ? "text" : "password"}
                                            value={liveApiKey}
                                            readOnly
                                            className="font-mono text-sm"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setShowLiveKey(!showLiveKey)}
                                        >
                                            {showLiveKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => copyToClipboard(liveApiKey)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>Ne partagez jamais votre clé secrète</span>
                                </div>
                                <Button variant="outline" className="w-full gap-2">
                                    <RefreshCw className="h-4 w-4" />
                                    Régénérer la clé
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Test API Key */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Key className="h-5 w-5 text-blue-600" />
                                        <CardTitle>Clé API Test</CardTitle>
                                    </div>
                                    <Badge variant="secondary">
                                        Sandbox
                                    </Badge>
                                </div>
                                <CardDescription>Utilisez cette clé pour les tests et le développement</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Clé secrète</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type={showTestKey ? "text" : "password"}
                                            value={testApiKey}
                                            readOnly
                                            className="font-mono text-sm"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setShowTestKey(!showTestKey)}
                                        >
                                            {showTestKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => copyToClipboard(testApiKey)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Aucune transaction réelle ne sera effectuée</span>
                                </div>
                                <Button variant="outline" className="w-full gap-2">
                                    <RefreshCw className="h-4 w-4" />
                                    Régénérer la clé
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Start */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Terminal className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Démarrage rapide</CardTitle>
                            </div>
                            <CardDescription>Exemple d'intégration de l'API</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="rounded-lg bg-slate-950 p-4 overflow-x-auto">
                                    <pre className="text-sm text-slate-50">
                                        <code>{`// Installation
npm install @shawapay/sdk

// Initialisation
import Shawapay from '@shawapay/sdk';

const shawapay = new Shawapay({
  apiKey: '${testApiKey}',
  environment: 'sandbox' // ou 'live'
});

// Créer un paiement
const payment = await shawapay.payments.create({
  amount: 10000,
  currency: 'XOF',
  description: 'Achat de produit',
  customer: {
    email: 'client@example.com',
    phone: '+225 07 00 00 00'
  }
});

console.log(payment.id);`}</code>
                                    </pre>
                                </div>
                                <Button variant="outline" className="gap-2">
                                    <Copy className="h-4 w-4" />
                                    Copier le code
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Webhooks Tab */}
                <TabsContent value="webhooks" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration des Webhooks</CardTitle>
                            <CardDescription>Recevez des notifications en temps réel pour les événements de paiement</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="webhookUrl">URL du Webhook</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="webhookUrl"
                                        type="url"
                                        placeholder="https://api.example.com/webhooks/shawapay"
                                        defaultValue={webhookUrl}
                                    />
                                    <Button>Enregistrer</Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Les événements seront envoyés à cette URL via POST
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Événements à écouter</Label>
                                <div className="space-y-2">
                                    {[
                                        { id: 'payment.success', label: 'Paiement réussi' },
                                        { id: 'payment.failed', label: 'Paiement échoué' },
                                        { id: 'payment.pending', label: 'Paiement en attente' },
                                        { id: 'refund.created', label: 'Remboursement créé' },
                                    ].map((event) => (
                                        <div key={event.id} className="flex items-center gap-2">
                                            <input type="checkbox" id={event.id} defaultChecked className="rounded" />
                                            <Label htmlFor={event.id} className="font-normal cursor-pointer">
                                                {event.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="font-medium mb-2">Derniers événements</h4>
                                <div className="space-y-2">
                                    {[
                                        { event: 'payment.success', time: 'Il y a 2 minutes', status: 'success' },
                                        { event: 'payment.success', time: 'Il y a 15 minutes', status: 'success' },
                                        { event: 'payment.pending', time: 'Il y a 1 heure', status: 'pending' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className={`h-4 w-4 ${item.status === 'success' ? 'text-green-600' : 'text-amber-600'}`} />
                                                <div>
                                                    <p className="text-sm font-medium">{item.event}</p>
                                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                                </div>
                                            </div>
                                            <Badge variant="secondary">200 OK</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Documentation Tab */}
                <TabsContent value="documentation" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="cursor-pointer hover:border-blue-500 transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Book className="h-5 w-5 text-blue-600" />
                                    <CardTitle>Guide de démarrage</CardTitle>
                                </div>
                                <CardDescription>Apprenez les bases de l'intégration Shawapay</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    Consulter le guide
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:border-blue-500 transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Code className="h-5 w-5 text-violet-600" />
                                    <CardTitle>Référence API</CardTitle>
                                </div>
                                <CardDescription>Documentation complète de tous les endpoints</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    Voir la référence
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:border-blue-500 transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Terminal className="h-5 w-5 text-green-600" />
                                    <CardTitle>Exemples de code</CardTitle>
                                </div>
                                <CardDescription>Exemples dans différents langages de programmation</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    Voir les exemples
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="cursor-pointer hover:border-blue-500 transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-amber-600" />
                                    <CardTitle>Gestion des erreurs</CardTitle>
                                </div>
                                <CardDescription>Comprendre et gérer les codes d'erreur</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    En savoir plus
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
