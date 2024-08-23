import { Box, Flex, Text } from '@radix-ui/themes'
import React from 'react'

const mockMessages = [{ id: "1", content: "Olá tudo bem?", role: "user" }, { id: "2", content: "Eu estou bem, mas me questiono frequentemente sobre as incoerencias da vida", role: "user" }, { id: "3", content: "Eu tambem", role: "model" }]

export default function MessagesList() {
    return (
        <Box className='flex-1 p-1'>
            {mockMessages.map((message) => <Message key={message.id} {...message} />)}
        </Box>
    )
}

interface Message {
    role: string
    id: string
    content: string
}

function Message({ role, id, content }: Message) {
    let dynamicRowStyle;
    let dynamicBoxStyle;

    if (role === "user") {
        dynamicRowStyle = "justify-end"
        dynamicBoxStyle = "bg-blue-500"
    } else {
        dynamicRowStyle = "justify-start"
        dynamicBoxStyle = "bg-blue-100"
    }

    return <Flex key={id} className={'py-1 w-full ' + dynamicRowStyle}>
        <Flex style={{ maxWidth: "85%" }} className={'p-1 rounded-md ' + dynamicBoxStyle}>
            <Text>{content}</Text>
        </Flex>
    </Flex>
}
