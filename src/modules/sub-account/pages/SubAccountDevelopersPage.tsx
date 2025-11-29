'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Code, Copy, Eye, EyeOff, Trash2, Plus } from 'lucide-react'
import { Input } from '@/shared/ui/input'

// Developer API Key type
interface DeveloperKey {
  id: string
  name: string
  key: string
  secret: string
  createdAt: string
  lastUsed?: string
  status: 'active' | 'inactive'
}

// Mock data for developer keys
const mockDeveloperKeys: DeveloperKey[] = [
  {
    id: 'KEY001',
    name: 'Production API Key',
    key: 'pk_live_51234567890abcdef',
    secret: 'sk_live_••••••••••••••••',
    createdAt: '2024-10-15',
    lastUsed: '2024-11-28',
    status: 'active',
  },
  {
    id: 'KEY002',
    name: 'Development API Key',
    key: 'pk_test_0987654321fedcba',
    secret: 'sk_test_••••••••••••••••',
    createdAt: '2024-11-01',
    lastUsed: '2024-11-27',
    status: 'active',
  },
  {
    id: 'KEY003',
    name: 'Testing API Key',
    key: 'pk_test_abcdefghijklmnop',
    secret: 'sk_test_••••••••••••••••',
    createdAt: '2024-09-20',
    lastUsed: undefined,
    status: 'inactive',
  },
]

export const SubAccountDevelopersPage = () => {
  const [visibleSecrets, setVisibleSecrets] = React.useState<Set<string>>(new Set())
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null)

  const toggleSecretVisibility = (keyId: string) => {
    const newVisible = new Set(visibleSecrets)
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId)
    } else {
      newVisible.add(keyId)
    }
    setVisibleSecrets(newVisible)
  }

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(keyId)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Clés API Développeurs
          </h2>
          <p className="text-muted-foreground">
            Gérez les clés API pour l'intégration et l'accès aux services
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white gap-2">
          <Plus className="h-4 w-4" />
          Générer une clé
        </Button>
      </div>

      {/* API Keys Grid */}
      <div className="grid gap-4">
        {mockDeveloperKeys.map((apiKey) => (
          <Card key={apiKey.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{apiKey.name}</CardTitle>
                    <CardDescription className="text-xs">
                      Créée le {new Date(apiKey.createdAt).toLocaleDateString('fr-FR')}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                  {apiKey.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Public Key */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Clé publique</label>
                <div className="flex items-center gap-2">
                  <Input
                    value={apiKey.key}
                    readOnly
                    className="font-mono text-xs bg-muted"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(apiKey.key, `${apiKey.id}-key`)}
                    className="shrink-0"
                  >
                    <Copy className={`h-4 w-4 ${copiedKey === `${apiKey.id}-key` ? 'text-green-600' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Secret Key */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Clé secrète</label>
                <div className="flex items-center gap-2">
                  <Input
                    value={visibleSecrets.has(apiKey.id) ? apiKey.secret.replace(/•/g, 'x') : apiKey.secret}
                    readOnly
                    className="font-mono text-xs bg-muted"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleSecretVisibility(apiKey.id)}
                    className="shrink-0"
                  >
                    {visibleSecrets.has(apiKey.id) ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(apiKey.secret, `${apiKey.id}-secret`)}
                    className="shrink-0"
                  >
                    <Copy className={`h-4 w-4 ${copiedKey === `${apiKey.id}-secret` ? 'text-green-600' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Last Used */}
              {apiKey.lastUsed && (
                <div className="text-xs text-muted-foreground">
                  Dernière utilisation : {new Date(apiKey.lastUsed).toLocaleDateString('fr-FR')}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="outline" size="sm">
                  Régénérer
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Documentation Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-base">Documentation API</CardTitle>
          <CardDescription>Consultez notre documentation pour intégrer l'API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button variant="outline">
              <Code className="h-4 w-4 mr-2" />
              Voir la documentation
            </Button>
            <Button variant="outline">
              Exemples de code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
