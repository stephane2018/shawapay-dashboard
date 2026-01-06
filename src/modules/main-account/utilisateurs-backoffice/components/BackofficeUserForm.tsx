import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import { toast } from 'sonner'
import type { BackofficeUser } from '@/core/types/backoffice-user.types'

// Backoffice User schema
const backofficeUserSchema = z.object({
  username: z.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').optional(),
  role: z.string().min(1, 'Le rôle est requis'),
  active: z.boolean(),
})

type BackofficeUserFormData = z.infer<typeof backofficeUserSchema>

interface BackofficeUserFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: BackofficeUser | null
  onSubmit: (data: BackofficeUserFormData) => void
  isLoading?: boolean
}

const roles = [
  { value: 'ROLE_ADMIN', label: 'Administrateur' },
  { value: 'ROLE_MANAGER', label: 'Manager' },
  { value: 'ROLE_OPERATOR', label: 'Opérateur' },
  { value: 'ROLE_VIEWER', label: 'Lecteur' },
]

export const BackofficeUserForm = ({ open, onOpenChange, user, onSubmit, isLoading = false }: BackofficeUserFormProps) => {
  const form = useForm<BackofficeUserFormData>({
    resolver: zodResolver(backofficeUserSchema),
    defaultValues: user ? {
      username: user.username,
      email: user.email,
      role: user.role,
      active: user.active,
    } : {
      username: '',
      email: '',
      role: '',
      active: true,
    },
  })

  const handleSubmit = (data: BackofficeUserFormData) => {
    try {
      onSubmit(data)
      toast.success(user ? 'Utilisateur modifié avec succès' : 'Utilisateur créé avec succès')
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</DialogTitle>
          <DialogDescription>
            {user ? 'Modifiez les informations de l\'utilisateur ci-dessous.' : 'Remplissez les informations pour ajouter un nouvel utilisateur backoffice.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: j.doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Ex: john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!user && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un rôle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <FormLabel>Compte actif</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      L'utilisateur peut se connecter et accéder au système
                    </p>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                {isLoading ? 'Sauvegarde...' : user ? 'Modifier' : 'Créer'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
