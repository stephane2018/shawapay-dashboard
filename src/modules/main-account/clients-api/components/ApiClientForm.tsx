import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import type { ApiClient } from '@/core/types/api-client.types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Checkbox } from '@/shared/ui/checkbox'
import { Badge } from '@/shared/ui/badge'
import { Copy, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

// API Client schema
const apiClientSchema = z.object({
  owner: z.string().min(2, 'Le nom du propriétaire doit contenir au moins 2 caractères'),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1, 'Sélectionnez au moins une permission'),
  active: z.boolean(),
})

type ApiClientFormData = z.infer<typeof apiClientSchema>

interface ApiClientFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: ApiClient | null
  onSubmit: (data: ApiClientFormData) => void
  isLoading?: boolean
  generatedApiKey?: string
}

const availablePermissions = [
  { value: 'READ_TRANSACTIONS', label: 'Lire les transactions' },
  { value: 'WRITE_TRANSACTIONS', label: 'Créer des transactions' },
  { value: 'READ_CLIENTS', label: 'Lire les clients' },
  { value: 'WRITE_CLIENTS', label: 'Gérer les clients' },
  { value: 'READ_ACCOUNT', label: 'Lire le compte' },
  { value: 'WEBHOOKS', label: 'Gérer les webhooks' },
]

export const ApiClientForm = ({ open, onOpenChange, client, onSubmit, isLoading = false, generatedApiKey }: ApiClientFormProps) => {
  const form = useForm<ApiClientFormData>({
    resolver: zodResolver(apiClientSchema),
    defaultValues: client ? {
      owner: client.owner,
      description: client.description || '',
      permissions: client.permissions || [],
      active: client.active,
    } : {
      owner: '',
      description: '',
      permissions: [],
      active: true,
    },
  })

  const handleSubmit = (data: ApiClientFormData) => {
    try {
      onSubmit(data)
      if (!client) {
        toast.success('Client API créé avec succès')
      } else {
        toast.success('Client API modifié avec succès')
      }
      if (!generatedApiKey) {
        onOpenChange(false)
        form.reset()
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  const copyApiKey = () => {
    if (generatedApiKey) {
      navigator.clipboard.writeText(generatedApiKey)
      toast.success('Clé API copiée dans le presse-papiers')
    }
  }

  const generateNewApiKey = () => {
    // Simuler la génération d'une nouvelle clé API
    const newKey = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    toast.success('Nouvelle clé API générée')
    return newKey
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{client ? 'Modifier un client API' : 'Générer une clé API'}</DialogTitle>
          <DialogDescription>
            {client ? 'Modifiez les informations du client API ci-dessous.' : 'Créez une nouvelle clé API pour un client.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du propriétaire</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Société ABC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Application mobile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permissions"
              render={() => (
                <FormItem>
                  <FormLabel>Permissions</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {availablePermissions.map((permission) => (
                      <FormField
                        key={permission.value}
                        control={form.control}
                        name="permissions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(permission.value) || false}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || []
                                  return checked
                                    ? field.onChange([...currentValue, permission.value])
                                    : field.onChange(
                                        currentValue.filter(
                                          (value) => value !== permission.value
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {permission.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Clé active</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      La clé API peut être utilisée pour accéder à l'API
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {generatedApiKey && (
              <div className="space-y-2">
                <FormLabel>Clé API générée</FormLabel>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <code className="text-sm font-mono flex-1">{generatedApiKey}</code>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyApiKey}
                  >
                    <Copy size={14} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  ⚠️ Copiez cette clé maintenant. Elle ne sera plus affichée pour des raisons de sécurité.
                </p>
              </div>
            )}

            <DialogFooter className="flex gap-2">
              {generatedApiKey ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Terminer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newKey = generateNewApiKey()
                      // Mettre à jour l'état avec la nouvelle clé
                    }}
                  >
                    <RefreshCw size={14} className="mr-2" />
                    Regénérer
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                  >
                    {isLoading ? 'Génération...' : client ? 'Modifier' : 'Générer la clé'}
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
