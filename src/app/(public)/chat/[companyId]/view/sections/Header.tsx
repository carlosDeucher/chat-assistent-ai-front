import { IPublicCompany } from "@/@types/IPublicCompany";
import {
  Avatar,
  Flex,
  Text,
} from "@radix-ui/themes";
import React from "react";

type Props = {
  company: IPublicCompany;
};

export default function Header({
  company,
}: Props) {
  return (
    <Flex className="h-12 border-b-2 border-secondary-main px-2 items-center gap-x-2 bg-secondary-light">
      <Avatar
        size="2"
        variant="solid"
        color={"indigo"}
        fallback={company.companyName[0]}
        radius="full"
      />
      <Text className="font-medium">
        {company.companyName}
      </Text>
    </Flex>
  );
}
