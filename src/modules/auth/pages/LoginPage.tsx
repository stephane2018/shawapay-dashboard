'use client'

import { LoginForm } from '@/components/login-form'
import { ThemeToggle } from '@/core/components/ThemeToggle'

export const LoginPage = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
            <div className="absolute top-4 right-4 md:top-8 md:right-8">
                <ThemeToggle />
            </div>
            <div className="w-full max-w-6xl">
                <LoginForm />
            </div>
        </div>
    )
}
