import { Box, Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import Footer from './sections/Footer'
import Header from './sections/Header'
import MessagesList from './sections/MessagesList'

export default function PageChat() {
  return (
    <Flex direction="column" className='h-screen'>
      <Header/>
      <MessagesList/>
      <Footer />
    </Flex>
  )
}
