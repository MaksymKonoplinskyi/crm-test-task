import React from 'react'
import { Button, CircularProgress, Tooltip } from '@mui/material'
import { AccountBalanceWallet, Power, Check } from '@mui/icons-material'
import { useWeb3 } from '../../context/Web3Context'

const WalletConnectButton = ({ variant = 'contained', size = 'large', fullWidth = true }) => {
  const { account, isConnecting, connectWallet, disconnectWallet, formatAddress, isConnected } = useWeb3()

  if (isConnected) {
    return (
      <div className='flex gap-2'>
        <Button
          variant='outlined'
          size={size}
          fullWidth={fullWidth}
          className='border-green-500 text-green-600 hover:bg-green-50'
          startIcon={<Check />}
          sx={{
            borderColor: '#10b981',
            color: '#059669',
            '&:hover': {
              borderColor: '#10b981',
              backgroundColor: '#f0fdf4',
            },
          }}
        >
          {formatAddress(account)}
        </Button>
        <Tooltip title='Disconnect Wallet' arrow>
          <Button
            variant='outlined'
            size={size}
            onClick={disconnectWallet}
            className='border-red-500 text-red-600 hover:bg-red-50'
            sx={{
              minWidth: '48px',
              borderColor: '#ef4444',
              color: '#dc2626',
              '&:hover': {
                borderColor: '#ef4444',
                backgroundColor: '#fef2f2',
              },
            }}
          >
            <Power />
          </Button>
        </Tooltip>
      </div>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={connectWallet}
      disabled={isConnecting}
      startIcon={isConnecting ? <CircularProgress size={20} color='inherit' /> : <AccountBalanceWallet />}
      className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium'
      sx={{
        background: 'linear-gradient(45deg, #9333ea 30%, #2563eb 90%)',
        '&:hover': {
          background: 'linear-gradient(45deg, #7c3aed 30%, #1d4ed8 90%)',
        },
        '&:disabled': {
          background: 'linear-gradient(45deg, #9ca3af 30%, #6b7280 90%)',
        },
      }}
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  )
}

export default WalletConnectButton
