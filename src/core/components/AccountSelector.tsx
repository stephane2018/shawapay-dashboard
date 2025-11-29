import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { ArrowSwapHorizontal, Home, ArrowDown2 } from 'iconsax-react';
import { useAccount } from '@/core/contexts/AccountContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/shared/ui/dropdown-menu";
import { Badge } from '@/shared/ui/badge';

export const AccountSelector = () => {
  const { currentAccount, activeAccountType, mainAccount, switchToMainAccount, switchToSubAccount } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentAccountName = () => {
    if (activeAccountType === 'main') {
      return mainAccount.name;
    }
    return currentAccount.name;
  };

  const getAccountTypeLabel = () => {
    if (activeAccountType === 'main') {
      return 'Compte Principal';
    }
    return 'Sous-compte';
  };

  return (
    <div className="p-4 border-t bg-muted/30">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-card hover:bg-muted/50 h-auto py-3"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                activeAccountType === 'main'
                  ? "bg-gradient-to-br from-blue-600 to-violet-600"
                  : "bg-muted"
              )}>
                {activeAccountType === 'main' ? (
                  <Home size={18} variant="Bulk" color="white" />
                ) : (
                  <ArrowSwapHorizontal size={18} variant="Bulk" color="currentColor" className="text-muted-foreground" />
                )}
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">{getAccountTypeLabel()}</p>
                <p className="text-sm font-semibold">{getCurrentAccountName()}</p>
              </div>
            </div>
            <ArrowDown2 size={16} variant="Bulk" color="currentColor" className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Changer de compte</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              switchToMainAccount();
              setIsOpen(false);
            }}
            className={cn(
              "cursor-pointer",
              activeAccountType === 'main' && "bg-muted"
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
                <Home size={16} variant="Bulk" color="white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{mainAccount.name}</p>
                <p className="text-xs text-muted-foreground">Compte principal</p>
              </div>
              {activeAccountType === 'main' && (
                <Badge variant="secondary" className="text-[10px]">Actif</Badge>
              )}
            </div>
          </DropdownMenuItem>

          {mainAccount.subAccounts.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs">Sous-comptes</DropdownMenuLabel>
              {mainAccount.subAccounts.map((subAccount) => (
                <DropdownMenuItem
                  key={subAccount.id}
                  onClick={() => {
                    switchToSubAccount(subAccount.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "cursor-pointer",
                    activeAccountType === 'sub' && currentAccount.id === subAccount.id && "bg-muted"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="p-2 rounded-lg bg-muted">
                      <ArrowSwapHorizontal size={16} variant="Bulk" color="currentColor" className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{subAccount.name}</p>
                        {subAccount.environment === 'sandbox' && (
                          <Badge variant="secondary" className="text-[9px] bg-amber-100 text-amber-700">
                            Sandbox
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{subAccount.type}</p>
                    </div>
                    {activeAccountType === 'sub' && currentAccount.id === subAccount.id && (
                      <Badge variant="secondary" className="text-[10px]">Actif</Badge>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
