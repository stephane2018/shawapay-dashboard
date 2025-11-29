'use client'

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Copy, Download, MapPin, User, Phone, Mail, Globe } from 'lucide-react'
import { RotateLeft } from 'iconsax-react'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Separator } from '@/shared/ui/separator'
import { cn } from '@/lib/utils'

// Extended transaction type with all details
interface TransactionDetail {
    id: string
    type: 'debit' | 'credit'
    status: 'success' | 'failed' | 'pending' | 'refunded'
    reference: string
    amount: number
    fees: number
    netAmount: number
    date: string
    time: string
    paymentMethod: {
        type: string
        provider: string
        icon: string
    }
    motif: string
    paymentUrl: string
    platform: string
    device: string
    partnerId: string
    orderId: string
    additionalInfo: Record<string, string>
    initiator: {
        name: string
        phone: string
        email: string
        country: string
        countryFlag: string
    }
    location: {
        lat: number
        lng: number
        city: string
    }
}

// Mock transaction detail data
const mockTransactionDetail: TransactionDetail = {
    id: '1',
    type: 'debit',
    status: 'success',
    reference: 'JiubjKt7',
    amount: 2012,
    fees: 48,
    netAmount: 2060,
    date: '28 Novembre 2025',
    time: '16:17',
    paymentMethod: {
        type: 'Mobile Money',
        provider: 'MTN CI',
        icon: '📱',
    },
    motif: '',
    paymentUrl: 'https://direct.kkiapay.me',
    platform: 'rest',
    device: 'Windows - Firefox',
    partnerId: '',
    orderId: '1f4a81bb-c745-4c63-b0df-13d85c644b75',
    additionalInfo: {},
    initiator: {
        name: 'KOUADIO Jean',
        phone: '2250577100000',
        email: 'k_ahole@yahoo.fr',
        country: "Côte d'Ivoire",
        countryFlag: '🇨🇮',
    },
    location: {
        lat: 5.3599517,
        lng: -4.0082563,
        city: 'Abidjan',
    },
}

// Status badge component
const StatusBadge = ({ status }: { status: TransactionDetail['status'] }) => {
    const config = {
        success: { label: 'Succès', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
        failed: { label: 'Échec', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
        pending: { label: 'En attente', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
        refunded: { label: 'Remboursé', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    }
    const { label, className } = config[status]
    return <Badge className={className}>{label}</Badge>
}

// Info row component
const InfoRow = ({ label, value, copyable = false }: { label: string; value: string | React.ReactNode; copyable?: boolean }) => {
    const handleCopy = () => {
        if (typeof value === 'string') {
            navigator.clipboard.writeText(value)
        }
    }

    return (
        <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
            <span className="text-sm text-muted-foreground">{label}</span>
            <div className="flex items-center gap-2">
                {typeof value === 'string' ? (
                    <span className="text-sm font-medium">{value}</span>
                ) : (
                    value
                )}
                {copyable && typeof value === 'string' && (
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                        <Copy className="h-3 w-3" />
                    </Button>
                )}
            </div>
        </div>
    )
}

export const TransactionDetailPage = () => {
    const navigate = useNavigate()
    const { transactionId } = useParams()
    const [showMoreInfo, setShowMoreInfo] = React.useState(false)

    // In real app, fetch transaction by ID
    const transaction = mockTransactionDetail

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' XOF'
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="rounded-full"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-semibold">Détails de la transaction</h1>
                        <StatusBadge status={transaction.status} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/20">
                        <RotateLeft className="h-4 w-4" />
                        Rembourser
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Télécharger
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 border-blue-100 dark:border-blue-900/50">
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Montant</p>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(transaction.amount)}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Initiateur</p>
                        <p className="text-sm font-semibold">{transaction.initiator.name}</p>
                        <p className="text-xs text-muted-foreground">{transaction.initiator.phone}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Référence</p>
                        <p className="text-sm font-mono font-semibold">{transaction.reference}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Date</p>
                        <p className="text-sm font-semibold">{transaction.date}, {transaction.time}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Information */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold">Informations sur le paiement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0">
                        <InfoRow label="Référence" value={transaction.reference} copyable />
                        <InfoRow label="Type de transaction" value={transaction.type === 'debit' ? 'Débit' : 'Crédit'} />
                        <InfoRow label="Montant" value={formatCurrency(transaction.amount)} />
                        <InfoRow label="Frais de transaction" value={formatCurrency(transaction.fees)} />
                        <InfoRow label="Net" value={formatCurrency(transaction.netAmount)} />
                        <InfoRow label="Date du paiement" value={`${transaction.date}, ${transaction.time}`} />
                        <InfoRow
                            label="Mode de paiement"
                            value={
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{transaction.paymentMethod.icon}</span>
                                    <span className="text-sm font-medium">
                                        {transaction.paymentMethod.type} ({transaction.paymentMethod.provider})
                                    </span>
                                </div>
                            }
                        />
                        <InfoRow label="Motif de la transaction" value={transaction.motif || '-'} />
                        <InfoRow
                            label="Url de payment"
                            value={
                                <a
                                    href={transaction.paymentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    {transaction.paymentUrl}
                                </a>
                            }
                        />
                        <InfoRow label="Plateforme" value={transaction.platform} />
                        <InfoRow label="Dispositif" value={transaction.device} />
                        <InfoRow label="Partner ID" value={transaction.partnerId || '-'} />

                        <div className="pt-4">
                            <p className="text-sm text-muted-foreground mb-2">Infos complémentaires</p>
                            <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-xs font-mono text-muted-foreground">
                                    orderId : <span className="text-foreground">{transaction.orderId}</span>
                                </p>
                            </div>
                            <Button
                                variant="default"
                                size="sm"
                                className="mt-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                                onClick={() => setShowMoreInfo(!showMoreInfo)}
                            >
                                {showMoreInfo ? 'Voir moins' : 'Voir plus'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Initiator Information */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold">Informations sur l'initiateur de paiement</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-0">
                            <InfoRow
                                label="Nom et prénom(s)"
                                value={
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">{transaction.initiator.name}</span>
                                    </div>
                                }
                            />
                            <InfoRow
                                label="Téléphone"
                                value={
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">{transaction.initiator.phone}</span>
                                    </div>
                                }
                            />
                            <InfoRow
                                label="Email"
                                value={
                                    <a
                                        href={`mailto:${transaction.initiator.email}`}
                                        className="flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        <Mail className="h-4 w-4" />
                                        <span className="text-sm">{transaction.initiator.email}</span>
                                    </a>
                                }
                            />
                            <InfoRow
                                label="Pays de provenance"
                                value={
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{transaction.initiator.countryFlag}</span>
                                        <span className="text-sm font-medium">{transaction.initiator.country}</span>
                                    </div>
                                }
                            />
                        </CardContent>
                    </Card>

                    {/* Map */}
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative h-[300px] bg-muted">
                                {/* Placeholder for map - in real app use Leaflet or Google Maps */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                            <p className="text-sm font-medium">{transaction.location.city}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {transaction.location.lat.toFixed(4)}, {transaction.location.lng.toFixed(4)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Map attribution */}
                                <div className="absolute bottom-2 right-2 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded text-xs text-muted-foreground">
                                    🗺️ Leaflet | © OpenStreetMap contributors
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
