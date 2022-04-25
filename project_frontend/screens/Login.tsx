import React, { TouchableOpacity } from "react-native";
import { Box, Button, Flex, HStack, Input, Text } from "native-base";
import { gql, useMutation, useQuery } from "urql";
import { useEffect, useState } from "react";

const loginQuery = gql`
  mutation ConsumerLogin($mail_id: String, $password: String) {
    consumerLogin(mail_id: $mail_id, password: $password) {
      user
      error
    }
  }
`;

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

export const Login = (props: any) => {
  const [, login] = useMutation(loginQuery);

  const [form, setForm] = useState({
    mail_id: "",
    password: "",
  });

  const [{ data, fetching }] = useQuery({
    query: meQuery,
  });

  useEffect(() => {
    if (!fetching) {
      if (data && data.me && data.me.user && data.me.user.mail_id) {
        props.routeToSuccess();
      }
    }
  }, [fetching]);

  return (
    <Flex alignItems={"center"} justifyContent={"center"} flex={"1"}>
      <Flex mt={180} h={300} justifyContent={"center"}>
        <Text fontSize={"2xl"} fontWeight="bold" textAlign={"center"}>
          Mess Manager
        </Text>
        <Text fontSize={"xl"} my={2} textAlign={"center"}>
          Login
        </Text>
        <Box></Box>
        <Flex>
          <Input
            w={300}
            placeholder="Email"
            my={3}
            onChangeText={(input) => {
              setForm((fd) => ({ ...fd, mail_id: input }));
            }}
          />
          <Input
            w={300}
            placeholder="Password"
            my={3}
            onChangeText={(input) => {
              setForm((fd) => ({ ...fd, password: input }));
            }}
          />
          <Button
            onPress={async (e) => {
              const loginResult = await login(
                { ...form },
                { additionalTypenames: ["ConsumerResponse"] }
              );

              if (
                loginResult &&
                loginResult.data &&
                loginResult.data.consumerLogin &&
                loginResult.data.consumerLogin.user
              ) {
                props.routeToSuccess();
              }
            }}
          >
            Login
          </Button>
        </Flex>
        <HStack space={1} my={2} textAlign={"center"} justifyContent="center">
          <Text fontSize={"md"}>New to Mess Manager?</Text>
          <TouchableOpacity onPress={props.routeToRegister}>
            <Text fontSize={"md"} color={"blue.600"}>
              Register
            </Text>
          </TouchableOpacity>
        </HStack>
      </Flex>
    </Flex>
  );
};
