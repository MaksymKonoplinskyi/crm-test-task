# Web3 Integration Documentation

## Overview

This project now includes Web3 integration allowing users to connect their cryptocurrency wallets (MetaMask) and authenticate using blockchain technology.

## Features Implemented

### 1. Web3 Context Provider

- **File**: `client/src/context/Web3Context.jsx`
- **Purpose**: Manages wallet connection state and provides Web3 functionality throughout the app
- **Features**:
  - Connect/disconnect wallet
  - Monitor account and network changes
  - Get wallet balance
  - Format wallet addresses
  - Switch networks

### 2. Wallet Connect Button

- **File**: `client/src/components/Web3/WalletConnectButton.jsx`
- **Purpose**: Beautiful, reusable button component for wallet connection
- **Features**:
  - Purple gradient design
  - Loading states
  - Connected/disconnected states
  - Disconnect functionality

### 3. Wallet Information Display

- **File**: `client/src/components/Web3/WalletInfo.jsx`
- **Purpose**: Shows detailed wallet information
- **Features**:
  - Wallet address (formatted)
  - ETH balance (real-time)
  - Network information
  - Clean Material-UI design

### 4. Enhanced Login Page

- **File**: `client/src/Pages/Auth/Login.jsx`
- **Purpose**: Added Web3 login option alongside traditional login
- **Features**:
  - Traditional username/password login
  - OR divider
  - Wallet connect button
  - Web3 login button (appears after wallet connection)
  - Mock Web3 authentication

### 5. Web3 Dashboard

- **File**: `client/src/Pages/Web3/Web3Dashboard.jsx`
- **Purpose**: Dedicated page to showcase Web3 features
- **Features**:
  - Wallet connection status
  - Live wallet information
  - Feature showcase
  - Network details
  - Responsive design

## How to Use

### Prerequisites

1. Install MetaMask browser extension
2. Have some ETH in your wallet (for testing on mainnet) or test ETH (for testnets)

### Connecting a Wallet

1. Go to the login page (`/auth/login`)
2. Click "Connect Wallet" button
3. Approve the connection in MetaMask
4. Once connected, click "Login with Wallet"

### Viewing Web3 Dashboard

1. Navigate to `/web3` route
2. Connect your wallet if not already connected
3. View real-time wallet information
4. Explore Web3 features

### Supported Networks

- Ethereum Mainnet (Chain ID: 1)
- Goerli Testnet (Chain ID: 5)
- Sepolia Testnet (Chain ID: 11155111)
- Polygon Mainnet (Chain ID: 137)
- Polygon Mumbai (Chain ID: 80001)
- BSC Mainnet (Chain ID: 56)
- BSC Testnet (Chain ID: 97)

## Technical Details

### Dependencies Added

- `ethers@^6.8.0` - Ethereum JavaScript library

### Key Hooks

```jsx
import { useWeb3 } from '../context/Web3Context'

const {
  account, // Connected wallet address
  provider, // Ethers provider instance
  isConnecting, // Loading state
  chainId, // Current network chain ID
  isConnected, // Boolean connection status
  connectWallet, // Function to connect wallet
  disconnectWallet, // Function to disconnect wallet
  formatAddress, // Function to format addresses (0x1234...5678)
} = useWeb3()
```

### Error Handling

- MetaMask not installed detection
- User rejection handling
- Network switching errors
- Connection timeout handling

## Security Considerations

### Current Implementation

- **Demo/Testing Only**: Current Web3 login is for demonstration purposes
- **No Backend Integration**: Wallet authentication is not integrated with the backend
- **Mock Authentication**: Web3 login creates a mock user object

### Production Recommendations

1. **Signature Verification**: Implement message signing and verification
2. **Backend Integration**: Create API endpoints for Web3 authentication
3. **Nonce Management**: Use nonces to prevent replay attacks
4. **Session Management**: Proper session handling for Web3 users
5. **Role-Based Access**: Map wallet addresses to user roles in database

### Example Production Flow

```javascript
// 1. Request signature from user
const message = `Sign this message to authenticate: ${nonce}`
const signature = await signer.signMessage(message)

// 2. Send to backend for verification
const response = await api.post('/auth/web3-login', {
  address: account,
  signature,
  message,
  nonce,
})

// 3. Backend verifies signature and returns JWT
const { token, user } = response.data
```

## File Structure

```
client/src/
├── context/
│   └── Web3Context.jsx          # Web3 state management
├── components/
│   └── Web3/
│       ├── WalletConnectButton.jsx  # Connect button component
│       └── WalletInfo.jsx          # Wallet info display
├── Pages/
│   ├── Auth/
│   │   └── Login.jsx              # Enhanced with Web3 login
│   └── Web3/
│       └── Web3Dashboard.jsx      # Web3 features page
└── App.jsx                        # Web3Provider wrapper
```

## Usage Examples

### Basic Wallet Connection

```jsx
import { useWeb3 } from './context/Web3Context'
import WalletConnectButton from './components/Web3/WalletConnectButton'

function MyComponent() {
  const { isConnected, account } = useWeb3()

  return (
    <div>
      <WalletConnectButton />
      {isConnected && <p>Connected: {account}</p>}
    </div>
  )
}
```

### Getting Wallet Balance

```jsx
import { useWeb3 } from './context/Web3Context'
import { ethers } from 'ethers'

function BalanceDisplay() {
  const { provider, account, isConnected } = useWeb3()
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    if (isConnected && provider && account) {
      provider.getBalance(account).then(balance => {
        setBalance(ethers.formatEther(balance))
      })
    }
  }, [isConnected, provider, account])

  return <div>Balance: {balance} ETH</div>
}
```

## Testing

### Local Testing

1. Install MetaMask
2. Connect to a testnet (Goerli, Sepolia)
3. Get test ETH from faucets
4. Test wallet connection and login flow

### Faucets for Testing

- Goerli: https://goerlifaucet.com/
- Sepolia: https://sepoliafaucet.com/

## Future Enhancements

1. **Smart Contract Integration**: Add smart contract interactions
2. **Multi-Wallet Support**: Support for WalletConnect, Coinbase Wallet, etc.
3. **Transaction History**: Display user's transaction history
4. **DeFi Features**: Integrate with DeFi protocols
5. **NFT Support**: Display and manage NFTs
6. **Cross-Chain**: Support for multiple blockchain networks
7. **Gas Estimation**: Show gas fees for transactions
8. **ENS Integration**: Support for Ethereum Name Service

## Troubleshooting

### Common Issues

1. **MetaMask not detected**: Ensure MetaMask is installed and enabled
2. **Connection rejected**: User must approve connection in MetaMask
3. **Wrong network**: Use network switching functionality
4. **Refresh required**: Some state changes may require page refresh

### Browser Compatibility

- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Safari: ⚠️ Limited MetaMask support
- Edge: ✅ Full support

## Contributing

When adding new Web3 features:

1. Use the existing Web3Context
2. Follow the established patterns
3. Add proper error handling
4. Test on multiple networks
5. Update this documentation
