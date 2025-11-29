'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { Switch } from '@/shared/ui/switch'
import { Badge } from '@/shared/ui/badge'
import {
    Store,
    Globe,
    Palette,
    CreditCard,
    Settings,
    Eye,
    Save,
    Upload
} from 'lucide-react'

export const StorePage = () => {
    const [isStoreActive, setIsStoreActive] = React.useState(true)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Ma Boutique</h2>
                    <p className="text-muted-foreground">
                        Configurez et gérez votre boutique en ligne
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Prévisualiser
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white gap-2">
                        <Save className="h-4 w-4" />
                        Enregistrer
                    </Button>
                </div>
            </div>

            {/* Store Status */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30">
                                <Store className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <CardTitle>Statut de la boutique</CardTitle>
                                <CardDescription>Activez ou désactivez votre boutique en ligne</CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant={isStoreActive ? "default" : "secondary"} className={isStoreActive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}>
                                {isStoreActive ? 'Active' : 'Inactive'}
                            </Badge>
                            <Switch checked={isStoreActive} onCheckedChange={setIsStoreActive} />
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Store Information */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Informations de la boutique</CardTitle>
                        </div>
                        <CardDescription>Détails publics de votre boutique</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="storeName">Nom de la boutique</Label>
                            <Input id="storeName" placeholder="Ma Super Boutique" defaultValue="Boutique Shawapay" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="storeUrl">URL de la boutique</Label>
                            <Input id="storeUrl" placeholder="ma-boutique" defaultValue="shawapay-store" />
                            <p className="text-xs text-muted-foreground">https://shawapay.com/store/shawapay-store</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="storeDescription">Description</Label>
                            <Textarea
                                id="storeDescription"
                                placeholder="Décrivez votre boutique..."
                                defaultValue="Découvrez nos produits de qualité avec paiement sécurisé"
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="storeEmail">Email de contact</Label>
                            <Input id="storeEmail" type="email" placeholder="contact@boutique.com" defaultValue="contact@shawapay-store.com" />
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Palette className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Apparence</CardTitle>
                        </div>
                        <CardDescription>Personnalisez l'apparence de votre boutique</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Logo de la boutique</Label>
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                                    <Store className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Upload className="h-4 w-4" />
                                    Télécharger
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="primaryColor">Couleur principale</Label>
                            <div className="flex gap-2">
                                <Input id="primaryColor" type="color" defaultValue="#3b82f6" className="w-20 h-10" />
                                <Input defaultValue="#3b82f6" className="flex-1" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="secondaryColor">Couleur secondaire</Label>
                            <div className="flex gap-2">
                                <Input id="secondaryColor" type="color" defaultValue="#8b5cf6" className="w-20 h-10" />
                                <Input defaultValue="#8b5cf6" className="flex-1" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Bannière de la boutique</Label>
                            <div className="h-32 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Upload className="h-4 w-4" />
                                    Télécharger une bannière
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Paramètres de paiement</CardTitle>
                        </div>
                        <CardDescription>Configurez vos méthodes de paiement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Mobile Money</Label>
                                <p className="text-sm text-muted-foreground">Accepter les paiements Mobile Money</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Carte bancaire</Label>
                                <p className="text-sm text-muted-foreground">Accepter les paiements par carte</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Virement bancaire</Label>
                                <p className="text-sm text-muted-foreground">Accepter les virements bancaires</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="pt-4 border-t">
                            <div className="space-y-2">
                                <Label htmlFor="minOrder">Montant minimum de commande</Label>
                                <Input id="minOrder" type="number" placeholder="1000" defaultValue="1000" />
                                <p className="text-xs text-muted-foreground">Montant minimum en XOF</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Advanced Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Paramètres avancés</CardTitle>
                        </div>
                        <CardDescription>Options supplémentaires de configuration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Activer les avis clients</Label>
                                <p className="text-sm text-muted-foreground">Permettre aux clients de laisser des avis</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Notifications par email</Label>
                                <p className="text-sm text-muted-foreground">Recevoir les notifications de commande</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Mode maintenance</Label>
                                <p className="text-sm text-muted-foreground">Désactiver temporairement la boutique</p>
                            </div>
                            <Switch />
                        </div>
                        <div className="pt-4 border-t">
                            <div className="space-y-2">
                                <Label htmlFor="currency">Devise</Label>
                                <Input id="currency" defaultValue="XOF - Franc CFA" disabled />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
