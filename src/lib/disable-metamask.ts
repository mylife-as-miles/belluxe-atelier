// Prevent MetaMask from automatically injecting
if (typeof window !== 'undefined' && window.ethereum) {
  // Disable automatic connection attempts
  window.ethereum.autoRefreshOnNetworkChange = false;
}
