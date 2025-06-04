'use client';

import { useStacks } from '../contexts/StacksContext';

export function WalletConnect() {
  const { authenticate, signOut, isAuthenticated, userData } = useStacks();

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {userData?.profile?.stxAddress?.testnet}
          </span>
          <button
            onClick={signOut}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={authenticate}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
