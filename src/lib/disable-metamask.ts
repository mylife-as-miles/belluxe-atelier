// Prevent MetaMask from automatically injecting
if (typeof window !== 'undefined' && (window as any).ethereum) {
  // Disable automatic connection attempts
  (window as any).ethereum.autoRefreshOnNetworkChange = false;
}

export {};
