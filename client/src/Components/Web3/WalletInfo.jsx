import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Chip, Divider, Box } from '@mui/material'
import { AccountBalanceWallet, Language, AccountBalance } from '@mui/icons-material'
import { useWeb3 } from '../../context/Web3Context'
import { ethers } from 'ethers'

const WalletInfo = () => {
  const { account, provider, chainId, formatAddress, isConnected } = useWeb3()
  const [balance, setBalance] = useState('0')
  const [networkName, setNetworkName] = useState('Unknown')

  useEffect(() => {
    if (isConnected && provider && account) {
      fetchBalance()
      getNetworkName()
    }
  }, [isConnected, provider, account, chainId])

  const fetchBalance = async () => {
    try {
      const balance = await provider.getBalance(account)
      const balanceInEth = ethers.formatEther(balance)
      setBalance(parseFloat(balanceInEth).toFixed(4))
    } catch (error) {
      console.error('Error fetching balance:', error)
      setBalance('0')
    }
  }

  const getNetworkName = () => {
    const networks = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Polygon Mumbai',
      56: 'BSC Mainnet',
      97: 'BSC Testnet',
    }
    setNetworkName(networks[chainId] || `Chain ID: ${chainId}`)
  }

  if (!isConnected) {
    return null
  }

  return (
    <Card className='mt-4 shadow-lg'>
      <CardContent>
        <Box className='flex items-center gap-2 mb-3'>
          <AccountBalanceWallet className='text-blue-600' />
          <Typography variant='h6' className='text-gray-800 font-medium'>
            Wallet Information
          </Typography>
        </Box>

        <Divider className='mb-3' />

        <Box className='space-y-3'>
          <Box className='flex justify-between items-center'>
            <Typography variant='body2' className='text-gray-600'>
              Address:
            </Typography>
            <Chip label={formatAddress(account)} size='small' variant='outlined' className='font-mono' />
          </Box>

          <Box className='flex justify-between items-center'>
            <Typography variant='body2' className='text-gray-600 flex items-center gap-1'>
              <AccountBalance fontSize='small' />
              Balance:
            </Typography>
            <Typography variant='body2' className='font-semibold'>
              {balance} ETH
            </Typography>
          </Box>

          <Box className='flex justify-between items-center'>
            <Typography variant='body2' className='text-gray-600 flex items-center gap-1'>
              <Language fontSize='small' />
              Network:
            </Typography>
            <Chip label={networkName} size='small' color='primary' variant='outlined' />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default WalletInfo
