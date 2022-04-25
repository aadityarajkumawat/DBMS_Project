import dayjs from "dayjs";
import { Button, Flex, HStack, Text } from "native-base";
import { Fragment, useEffect, useState } from "react";
import React, { TouchableOpacity } from "react-native";
import { gql, useMutation, useQuery } from "urql";

const markMealSkipped = gql`
  mutation MarkSkippedMeal($meal_type: String, $skip_date: String) {
    markSkippedMeal(meal_type: $meal_type, skip_date: $skip_date) {
      status
      error
    }
  }
`;

const getSkippedMeals = gql`
  query GetSkippedMeals {
    getSkippedMeals {
      mealsSkipped {
        meal_skipped_id
        c_id
        meal_type
        skip_date
      }
      error
    }
  }
`;

const getMenu = gql`
  query GetMenu {
    getMenu {
      menu {
        menu_id
        breakfast
        lunch
        snacks
        dinner
        date
      }
    }
  }
`;

export const Success = (props: any) => {
  const [{ data: skippedMealsI, fetching: fetchingSkippedMealsI }] = useQuery({
    query: getSkippedMeals,
  });

  const [, markSkipped] = useMutation(markMealSkipped);

  const [{ data, fetching }] = useQuery({ query: getMenu });

  const skippedMealsListData = [
    { id: 1, type: "BRE", menu: "some item", status: "Y" },
    { id: 2, type: "LUN", menu: "some item", status: "Y" },
    { id: 3, type: "SNA", menu: "some item", status: "Y" },
    { id: 4, type: "DIN", menu: "some item", status: "Y" },
  ];

  const [skippedMeals, setSkippedMeals] = useState(skippedMealsListData);

  function getMealType(meal: any) {
    switch (meal.type) {
      case "BRE":
        return "Breakfast";
      case "LUN":
        return "Lunch";
      case "SNA":
        return "Snacks";
      case "DIN":
        return "Dinner";
      default:
        return "Undefined";
    }
  }

  const date = new Date();
  const day = dayjs(date);

  useEffect(() => {
    if (!fetching && data && data.getMenu && data.getMenu.menu) {
      const menu = data.getMenu.menu[0];

      setSkippedMeals(function (sms) {
        const smsCopy = [...sms];
        smsCopy[0].menu = menu.breakfast;
        smsCopy[1].menu = menu.lunch;
        smsCopy[2].menu = menu.snacks;
        smsCopy[3].menu = menu.dinner;

        return smsCopy;
      });
    }
  }, [fetching]);

  useEffect(() => {
    if (
      !fetchingSkippedMealsI &&
      skippedMealsI &&
      !skippedMealsI.getSkippedMeals.error
    ) {
      for (const entry of skippedMealsI.getSkippedMeals.mealsSkipped) {
        setSkippedMeals(function (sms) {
          const smsCopy = [...sms];
          for (const sm of smsCopy) {
            if (sm.type === entry.meal_type) {
              sm.status = "N";
            }
          }

          return smsCopy;
        });
      }
    }
  }, [fetchingSkippedMealsI]);

  return (
    <Fragment>
      <Flex bg={"white"} shadow="3" py={4} px={4}>
        <Text fontSize={18} fontWeight="bold">
          Today's Meals
        </Text>
      </Flex>
      <Flex px={4} py={4}>
        <Text fontSize={17}>Today: {new Date().toLocaleDateString()}</Text>
      </Flex>
      <Flex>
        <Flex>
          {skippedMeals.map((meal) => (
            <Flex
              px={4}
              py={4}
              key={meal.id}
              borderTopWidth="1"
              borderColor="coolGray.400"
            >
              <Text fontSize={17}>Type: {getMealType(meal)}</Text>
              <Text fontSize={17}>Menu: {meal.menu}</Text>

              <Button
                w={40}
                onPress={async () => {
                  await markSkipped(
                    {
                      meal_type: meal.type,
                      skip_date: day.format("MM/DD/YYYY"),
                    },
                    { additionalTypenames: ["GetSkippedMealsResponse"] }
                  );

                  setSkippedMeals(function (sms) {
                    const smsCopy = [...sms];
                    for (const sm of smsCopy) {
                      if (sm.id === meal.id) {
                        sm.status = sm.status === "N" ? "Y" : "N";
                      }
                    }
                    return smsCopy;
                  });
                }}
                bg={meal.status === "N" ? "red.400" : "green.600"}
              >
                <Text fontSize={17} color={"white"}>
                  {meal.status === "N" ? "No" : "Yes"}
                </Text>
              </Button>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <HStack
        borderTopWidth={1}
        py={4}
        w="100%"
        justifyContent={"space-around"}
        position={"absolute"}
        bottom={0}
      >
        <TouchableOpacity onPress={props.routeToSuccess}>
          <Text fontSize={17}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={props.routeToProfile}>
          <Text fontSize={17}>Profile</Text>
        </TouchableOpacity>
      </HStack>
    </Fragment>
  );
};
