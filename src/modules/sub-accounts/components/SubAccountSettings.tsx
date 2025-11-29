'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Badge } from '@/shared/ui/badge'
import { Settings, Lock, Bell, Shield } from 'lucide-react'

interface SubAccountSettingsProps {
  subAccountId: string
}

export const SubAccountSettings = ({ subAccountId }: SubAccountSettingsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Paramètres du sous-compte
        </h2>
        <p className="text-muted-foreground">
          Configurez les paramètres et les préférences
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Paramètres généraux
          </CardTitle>
          <CardDescription>Informations de base du sous-compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du sous-compte</Label>
              <Input id="name" placeholder="Ex: Intégration API" defaultValue="Intégration API" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input id="type" placeholder="Type" defaultValue="Intégration" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Description du sous-compte" defaultValue="Sous-compte pour l'intégration API" />
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
            Enregistrer les modifications
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Sécurité
          </CardTitle>
          <CardDescription>Gérez les paramètres de sécurité</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
            <div>
              <p className="font-medium">Authentification à deux facteurs</p>
              <p className="text-sm text-muted-foreground">Activez la 2FA pour plus de sécurité</p>
            </div>
            <Badge variant="secondary">Désactivée</Badge>
          </div>
          <Button variant="outline">
            Configurer la 2FA
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Gérez vos préférences de notification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { label: 'Transactions réussies', enabled: true },
              { label: 'Transactions échouées', enabled: true },
              { label: 'Alertes de sécurité', enabled: true },
              { label: 'Rapports hebdomadaires', enabled: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                <p className="text-sm font-medium">{item.label}</p>
                <input type="checkbox" defaultChecked={item.enabled} className="h-4 w-4 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Clés API
          </CardTitle>
          <CardDescription>Gérez vos clés d'accès API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { name: 'Clé publique', key: 'pk_live_51234567890' },
              { name: 'Clé secrète', key: 'sk_live_••••••••••••••••' },
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <Label>{item.name}</Label>
                <div className="flex items-center gap-2">
                  <Input value={item.key} readOnly className="font-mono text-xs" />
                  <Button variant="outline" size="sm">
                    Copier
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline">
            Régénérer les clés
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
