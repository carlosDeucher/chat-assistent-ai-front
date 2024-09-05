import { Flex, Text } from "@radix-ui/themes";
import React from "react";

export default function NotFound() {
  return (
    <Flex className="w-screen h-screen items-center">
      <Flex
        direction={"column"}
        className="gap-y-2 items-center w-full"
      >
        <Text className="font-bold text-5xl">
          404
        </Text>
        <Text className="text-2xl">
          Company not found
        </Text>
      </Flex>
    </Flex>
  );
}
