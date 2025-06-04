'use client';

import { useState } from 'react';
import { useStacks } from '../contexts/StacksContext';
import { openContractCall } from '@stacks/connect';
import { stringUtf8CV, uintCV, someCV, noneCV } from '@stacks/transactions';

export function MessageForm() {
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const { userSession } = useStacks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      const functionArgs = [
        stringUtf8CV(content),
        replyTo ? someCV(uintCV(parseInt(replyTo))) : noneCV(),
      ];

      await openContractCall({
        anchorMode: 1,
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'chitchat',
        functionName: 'send-message',
        functionArgs,
        postConditionMode: 1,
        onFinish: () => {
          setContent('');
          setReplyTo('');
        },
        onCancel: () => {
          console.log('Transaction cancelled');
        },
      });
    } catch (e) {
      console.error('Error sending message:', e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          maxLength={280}
          placeholder="What's on your mind?"
        />
      </div>
      <div>
        <label htmlFor="replyTo" className="block text-sm font-medium text-gray-700">
          Reply to (optional)
        </label>
        <input
          type="number"
          id="replyTo"
          value={replyTo}
          onChange={(e) => setReplyTo(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Message ID"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Send Message
      </button>
    </form>
  );
}
