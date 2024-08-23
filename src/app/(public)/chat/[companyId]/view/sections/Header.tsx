import { Avatar, Flex, Text } from '@radix-ui/themes'
import React from 'react'

export default function Header() {
    return (
        <Flex className='h-12 border-2 border-yellow-400 px-2 items-center gap-x-2'>
            <Avatar fallback="S" radius='full'/>
            <Text>Sassipan</Text>
        </Flex>
    )
}