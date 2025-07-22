import React, { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'

const Web3Context = createContext()

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState('')
  const [provider, setProvider] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [chainId, setChainId] = useState(null)

  // Check if wallet is already connected on page load
  useEffect(() => {
    checkConnection()
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setAccount(accounts[0].address)
          setProvider(provider)
          const network = await provider.getNetwork()
          setChainId(network.chainId.toString())
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask is not installed. Please install MetaMask to continue.')
      return
    }

    setIsConnecting(true)
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const network = await provider.getNetwork()

      setAccount(address)
      setProvider(provider)
      setChainId(network.chainId.toString())

      toast.success('Wallet connected successfully!')
    } catch (error) {
      console.error('Error connecting wallet:', error)
      if (error.code === 4001) {
        toast.error('Please connect to MetaMask.')
      } else {
        toast.error('Error connecting wallet. Please try again.')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount('')
    setProvider(null)
    setChainId(null)
    toast.success('Wallet disconnected')
  }

  const handleAccountsChanged = accounts => {
    if (accounts.length === 0) {
      disconnectWallet()
    } else {
      setAccount(accounts[0])
    }
  }

  const handleChainChanged = chainId => {
    setChainId(chainId)
    window.location.reload() // Reload to avoid any issues with chain changes
  }

  const switchToEthereum = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }], // Ethereum mainnet
      })
    } catch (error) {
      console.error('Error switching to Ethereum:', error)
      toast.error('Error switching to Ethereum network')
    }
  }

  const formatAddress = address => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const value = {
    account,
    provider,
    isConnecting,
    chainId,
    connectWallet,
    disconnectWallet,
    switchToEthereum,
    formatAddress,
    isConnected: !!account,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}
