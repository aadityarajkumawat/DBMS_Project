import React, { Fragment } from "react";
import { Box, Flex, HStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { gql, useQuery } from "urql";

const meQuery = gql`
  query Me {
    me {
      user {
        f_name
        m_name
        l_name
        mail_id
        password
        c_type
      }
      error
    }
  }
`;

export function Profile(props: any) {
  const [{ data, fetching }] = useQuery({
    query: meQuery,
  });

  function getConsumerType(type: "STU" | "FAC" | "VIS") {
    switch (type) {
      case "FAC":
        return "Faculty";
      case "STU":
        return "Student";
      case "VIS":
        return "Visitor";
    }
  }

  return (
    <Fragment>
      <Flex bg={"white"} shadow="3" py={4} px={4}>
        <Text fontSize={18} fontWeight="bold">
          Profile
        </Text>
      </Flex>

      <Flex justifyContent={"center"} alignItems={"center"} mt={10}>
        <Box w={120} h={120} bg={"gray.200"} borderRadius={"100%"}></Box>
        {!fetching && data.me && (
          <Flex mt={4}>
            <Text fontSize={17}>
              Name:{" "}
              {`${data.me.user.f_name} ${data.me.user.m_name} ${data.me.user.l_name}`}
            </Text>
            <Text fontSize={17}>Email: {data.me.user.mail_id}</Text>
            <Text fontSize={17}>
              Consumer Type: {getConsumerType(data.me.user.c_type)}
            </Text>
          </Flex>
        )}
      </Flex>

      <HStack
        borderTopWidth={1}
        py={4}
        w="100%"
        justifyContent={"space-around"}
        position={"absolute"}
        bottom={0}
      >
        <TouchableOpacity>
          <Text fontSize={17} onPress={props.routeToSuccess}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={props.routeToProfile}>
          <Text fontSize={17}>Profile</Text>
        </TouchableOpacity>
      </HStack>
    </Fragment>
  );
}
