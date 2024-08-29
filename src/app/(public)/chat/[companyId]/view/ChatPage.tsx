import { Flex } from '@radix-ui/themes'
import React from 'react'
import Footer from './sections/Footer'
import Header from './sections/Header'
import MessagesList from './sections/MessagesList'
import { IPublicCompany } from '@/@types/IPublicCompany'

export default async function PageChat({ params: { companyId } }: {
  params: { companyId: string }
}) {

  const res = await fetch('http://localhost:6060/public-company/' + companyId, { cache: 'force-cache' })

  const company: IPublicCompany = (await res.json()).data

  return (
    <Flex direction="column" className='h-screen'>
      <Header company={company}/>
      <MessagesList />
      <Footer />
    </Flex>
  )
}
