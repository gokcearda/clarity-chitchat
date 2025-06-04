# 💬 ChitChat - Decentralized Messaging on Stacks

<div align="center">
  <h3>Connect, Chat, and Build Communities On-Chain</h3>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Stacks](https://img.shields.io/badge/Powered%20by-Stacks-purple)](https://www.stacks.co/)
  [![Clarity](https://img.shields.io/badge/Smart%20Contracts-Clarity-blue)](https://clarity-lang.org/)
</div>

## 🚀 About The Project

ChitChat is a decentralized messaging application built on the Stacks blockchain. It enables users to connect their Stacks wallet, send messages, reply to conversations, and build communities - all secured by blockchain technology.

### 🌟 Key Features

- **Decentralized Messaging**: Send and receive messages stored on the Stacks blockchain
- **Wallet Integration**: Seamless authentication with Stacks wallets (Hiro Wallet, Xverse)
- **Message Threading**: Reply to messages and create conversation threads
- **Real-time Updates**: Automatic message updates without page refresh
- **Blockchain Security**: All messages are immutably stored on-chain

## 🛠 Technology Stack

- **Blockchain**: [Stacks](https://www.stacks.co/)
- **Smart Contracts**: [Clarity](https://clarity-lang.org/)
- **Frontend**: 
  - [Next.js 13](https://nextjs.org/) (App Router)
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **Blockchain Integration**: 
  - [@stacks/connect](https://www.hiro.so/stacks-js)
  - [@stacks/transactions](https://www.hiro.so/stacks-js)

## 📋 Prerequisites

- Node.js 18.x or later
- Clarinet (for Clarity smart contract development)
- A Stacks wallet (Hiro Wallet or Xverse)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gokcearda/clarity-chitchat.git
   cd clarity-chitchat
   ```

2. Install dependencies:
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. Configure environment variables:
   ```bash
   # In frontend directory
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   # In frontend directory
   npm run dev
   ```

## 🔍 Smart Contract Documentation

### chitchat.clar

The main smart contract that handles messaging functionality.

#### Functions

##### send-message
```clarity
(define-public (send-message (content (string-utf8 280)) (replies-to (optional uint)))
```
Sends a new message to the chat.
- `content`: Message text (max 280 characters)
- `replies-to`: Optional message ID to reply to

##### get-message
```clarity
(define-read-only (get-message (message-id uint))
```
Retrieves a specific message by ID.
- `message-id`: The ID of the message to fetch

##### get-user-messages
```clarity
(define-read-only (get-user-messages (user principal))
```
Gets all messages sent by a specific user.
- `user`: The principal (address) of the user

## 🚀 Deployment

### Frontend Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to your preferred hosting service (Vercel recommended):
   ```bash
   vercel
   ```

### Smart Contract Deployment

1. Deploy to testnet:
   ```bash
   clarinet deploy --testnet
   ```

2. Deploy to mainnet:
   ```bash
   clarinet deploy --mainnet
   ```

## 🧪 Testing

Run smart contract tests:
```bash
clarinet test
```

Run frontend tests:
```bash
cd frontend
npm test
```

## 👥 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Arda - [@sadearda_g](https://twitter.com/sadearda_g) - ardagokceg@gmail.com

Project Link: [https://github.com/gokcearda/clarity-chitchat](https://github.com/gokcearda/clarity-chitchat)

## 🙏 Acknowledgments

- [Stacks Foundation](https://stacks.org/)
- [Hiro Systems](https://www.hiro.so/)
- [Clarity Language](https://clarity-lang.org/)
- [Next.js](https://nextjs.org/)
