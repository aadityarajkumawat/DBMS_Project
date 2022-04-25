import React, { TouchableOpacity } from "react-native";
import {
  Box,
  Button,
  CheckIcon,
  Flex,
  HStack,
  Input,
  Select,
  Text,
} from "native-base";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "urql";

const registerQuery = gql`
  mutation ConsumerRegister(
    $f_name: String
    $m_name: String
    $l_name: String
    $mail_id: String
    $password: String
    $c_type: String
  ) {
    consumerRegister(
      f_name: $f_name
      m_name: $m_name
      l_name: $l_name
      mail_id: $mail_id
      password: $password
      c_type: $c_type
    ) {
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

export const Register = (props: any) => {
  const [consumerType, setConsumerType] = useState<"STU" | "FAC" | "VIS">(
    "STU"
  );

  const [form, setForm] = useState({
    f_name: "",
    m_name: "",
    l_name: "",
    mail_id: "",
    password: "",
    c_type: "STU",
  });

  const [, register] = useMutation(registerQuery);

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
          Register
        </Text>
        <Box></Box>
        <Flex>
          <Input
            w={300}
            placeholder="First Name"
            my={3}
            onChangeText={(input) => {
              setForm((fd) => ({ ...fd, f_name: input }));
            }}
          />
          <Input
            w={300}
            placeholder="Middle Name"
            my={3}
            onChangeText={(input) => {
              setForm((fd) => ({ ...fd, m_name: input }));
            }}
          />
          <Input
            w={300}
            placeholder="Last Name"
            my={3}
            onChangeText={(input) => {
              setForm((fd) => ({ ...fd, l_name: input }));
            }}
          />
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

          <Select
            selectedValue={consumerType}
            minWidth="200"
            accessibilityLabel="Select consumer type"
            placeholder="Select consumer type"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setForm((fd) => ({ ...fd, c_type: itemValue }));
            }}
          >
            <Select.Item label="Student" value="STU" />
            <Select.Item label="Faculty" value="FAC" />
            <Select.Item label="Visitor" value="VIS" />
          </Select>
          <Button
            mt={3}
            onPress={async () => {
              const s = await register(
                { ...form },
                { additionalTypenames: ["ConsumerResponse"] }
              );

              if (s.data.consumerRegister.user) {
                props.routeToSuccess();
              }
            }}
          >
            Register
          </Button>
          <HStack space={1} my={2} textAlign={"center"} justifyContent="center">
            <Text fontSize={"md"}>Already a user?</Text>
            <TouchableOpacity onPress={props.routeToLogin}>
              <Text fontSize={"md"} color={"blue.600"}>
                Login
              </Text>
            </TouchableOpacity>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};
