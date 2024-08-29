import { IPublicCompany } from '@/@types/IPublicCompany'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import React from 'react'

type Props = {
    company: IPublicCompany
}

export default function Header({ company }: Props) {
    return (
        <Flex className='h-12 border-2 border-yellow-400 px-2 items-center gap-x-2'>
            <Avatar fallback={company.companyName[0]} radius='full' />
            <Text>{company.companyName}</Text>
        </Flex>
    )
}