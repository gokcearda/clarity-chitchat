'use client';

import { useState, useEffect, useCallback } from 'react';
import { useStacks } from '../contexts/StacksContext';

interface Message {
  sender: string;
  content: string;
  timestamp: number;
  replies_to?: number;
}

interface StacksTransaction {
  sender_address: string;
  block_height: number;
  contract_call?: {
    function_name: string;
    function_args: Array<{
      repr: string;
    }>;
  };
}

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { userSession } = useStacks();

  const fetchMessages = useCallback(async () => {
    try {
      const address = userSession.loadUserData().profile.stxAddress.testnet;
      const response = await fetch(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${address}/transactions`);
      const data = await response.json();
      
      const messages = data.results
        .filter((tx: StacksTransaction) => tx.contract_call?.function_name === 'send-message')
        .map((tx: StacksTransaction) => ({
          sender: tx.sender_address,
          content: tx.contract_call?.function_args[0].repr.slice(1, -1) || '',
          timestamp: tx.block_height,
          replies_to: tx.contract_call?.function_args[1]?.repr === 'none' 
            ? undefined 
            : parseInt(tx.contract_call?.function_args[1]?.repr || '0'),
        }));

      setMessages(messages);
    } catch (e) {
      console.error('Error fetching messages:', e);
    }
  }, [userSession]);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      fetchMessages();
      // Fetch messages every 30 seconds
      const interval = setInterval(fetchMessages, 30000);
      return () => clearInterval(interval);
    }
  }, [userSession, fetchMessages]);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">{message.sender}</span>
            <span className="text-xs text-gray-500">
              Block #{message.timestamp}
            </span>
          </div>
          <p className="mt-2 text-gray-600">{message.content}</p>
          {message.replies_to && (
            <div className="mt-2 text-xs text-gray-500">
              Replying to message #{message.replies_to}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
