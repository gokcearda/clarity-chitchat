'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

interface UserData {
  profile: {
    stxAddress: {
      mainnet?: string;
      testnet?: string;
    };
  };
}

interface StacksContextType {
  userSession: UserSession;
  userData: UserData | null;
  authenticate: () => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

const StacksContext = createContext<StacksContextType | undefined>(undefined);

const appConfig = new AppConfig(['store_write']);
const userSession = new UserSession({ appConfig });

export function StacksProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setIsAuthenticated(true);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
      setIsAuthenticated(true);
    }
  }, []);

  const authenticate = () => {
    showConnect({
      appDetails: {
        name: 'ChitChat',
        icon: window.location.origin + '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        setUserData(userSession.loadUserData());
        setIsAuthenticated(true);
      },
      userSession,
    });
  };

  const signOut = () => {
    userSession.signUserOut('/');
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <StacksContext.Provider
      value={{
        userSession,
        userData,
        authenticate,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </StacksContext.Provider>
  );
}

export function useStacks() {
  const context = useContext(StacksContext);
  if (context === undefined) {
    throw new Error('useStacks must be used within a StacksProvider');
  }
  return context;
}
