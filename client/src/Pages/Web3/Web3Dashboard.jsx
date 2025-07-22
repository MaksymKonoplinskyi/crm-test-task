import React from 'react'
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material'
import { AccountBalanceWallet, TrendingUp, Security, Explore } from '@mui/icons-material'
import WalletConnectButton from '../../components/Web3/WalletConnectButton'
import WalletInfo from '../../components/Web3/WalletInfo'
import { useWeb3 } from '../../context/Web3Context'

const Web3Dashboard = () => {
  const { isConnected, account, chainId } = useWeb3()

  const features = [
    {
      icon: <AccountBalanceWallet className='text-blue-500' />,
      title: 'Wallet Integration',
      description: 'Connect your MetaMask wallet securely and manage your digital assets.',
    },
    {
      icon: <Security className='text-green-500' />,
      title: 'Secure Authentication',
      description: 'Login using blockchain technology for enhanced security.',
    },
    {
      icon: <TrendingUp className='text-purple-500' />,
      title: 'Real-time Data',
      description: 'Get live blockchain data and wallet balance information.',
    },
    {
      icon: <Explore className='text-orange-500' />,
      title: 'Multi-Network',
      description: 'Support for multiple blockchain networks including Ethereum.',
    },
  ]

  return (
    <Container maxWidth='lg' className='py-8'>
      <Box className='mb-8'>
        <Typography variant='h3' className='text-center mb-4 font-bold text-gray-800'>
          Web3 Dashboard
        </Typography>
        <Typography variant='h6' className='text-center text-gray-600 mb-8'>
          Connect your wallet and explore the decentralized web
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Connection Status */}
        <Grid item xs={12} md={6}>
          <Paper className='p-6 h-full'>
            <Typography variant='h5' className='mb-4 flex items-center gap-2'>
              <AccountBalanceWallet />
              Wallet Connection
            </Typography>

            {!isConnected ? (
              <Box>
                <Typography variant='body1' className='mb-4 text-gray-600'>
                  Connect your wallet to get started with Web3 features
                </Typography>
                <WalletConnectButton />
              </Box>
            ) : (
              <Box>
                <Typography variant='body1' className='mb-4 text-green-600 font-semibold'>
                  ✅ Wallet Connected Successfully!
                </Typography>
                <WalletConnectButton />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Wallet Information */}
        <Grid item xs={12} md={6}>
          <Paper className='p-6 h-full'>
            {isConnected ? (
              <WalletInfo />
            ) : (
              <Box className='flex items-center justify-center h-full'>
                <Typography variant='body1' className='text-gray-500 text-center'>
                  Connect your wallet to view detailed information
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Features Grid */}
        <Grid item xs={12}>
          <Typography variant='h4' className='text-center mb-6 font-semibold'>
            Web3 Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper className='p-4 h-full text-center hover:shadow-lg transition-all'>
                  <Box className='mb-3 flex justify-center'>{feature.icon}</Box>
                  <Typography variant='h6' className='mb-2 font-semibold'>
                    {feature.title}
                  </Typography>
                  <Typography variant='body2' className='text-gray-600'>
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Network Information */}
        {isConnected && (
          <Grid item xs={12}>
            <Paper className='p-6'>
              <Typography variant='h5' className='mb-4'>
                Network Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className='text-center'>
                    <Typography variant='h6' className='text-blue-600'>
                      Chain ID
                    </Typography>
                    <Typography variant='body1' className='font-mono'>
                      {chainId || 'Unknown'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className='text-center'>
                    <Typography variant='h6' className='text-green-600'>
                      Status
                    </Typography>
                    <Typography variant='body1'>Connected</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className='text-center'>
                    <Typography variant='h6' className='text-purple-600'>
                      Provider
                    </Typography>
                    <Typography variant='body1'>MetaMask</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box className='text-center'>
                    <Typography variant='h6' className='text-orange-600'>
                      Connection
                    </Typography>
                    <Typography variant='body1'>Secure</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default Web3Dashboard
