'use client'

import { RegisterForm } from '@/components/register-form'

export const RegisterPage = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="w-full max-w-6xl">
                <RegisterForm />
            </div>
        </div>
    )
}
