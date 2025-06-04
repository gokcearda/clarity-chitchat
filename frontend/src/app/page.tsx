'use client';

import { WalletConnect } from '../components/WalletConnect';
import { MessageList } from '../components/MessageList';
import { MessageForm } from '../components/MessageForm';
import { useStacks } from '../contexts/StacksContext';

export default function Home() {
  const { isAuthenticated } = useStacks();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ChitChat</h1>
          <WalletConnect />
        </div>

        {isAuthenticated ? (
          <div className="space-y-8">
            <MessageForm />
            <MessageList />
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-900">
              Connect your wallet to start chatting
            </h2>
            <p className="mt-2 text-gray-600">
              Use your Stacks wallet to authenticate and join the conversation
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
