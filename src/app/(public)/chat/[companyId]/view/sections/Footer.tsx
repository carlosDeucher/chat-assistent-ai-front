import { Box, Flex, TextField } from '@radix-ui/themes'
import React from 'react'

export default function Footer() {
    return (
        <Flex className='h-12 border-2 border-yellow-400 px-2 items-center'>
            <TextField.Root className='w-full' placeholder='Escreva uma mensagem' >
            </TextField.Root>
        </Flex>
    )
}
