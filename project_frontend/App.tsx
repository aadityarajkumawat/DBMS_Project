import React from "react-native";
import { View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { Login } from "./screens/Login";
import { Fragment, useState } from "react";
import { Register } from "./screens/Register";
import { createClient, Provider } from "urql";
import { Success } from "./screens/Success";
import { Profile } from "./screens/Profile";

const client = createClient({
  url: "http://localhost:4000",
  fetchOptions: {
    credentials: "include",
  },
});

export default function App() {
  const [page, setPage] = useState<string>("login");

  function routeToRegister() {
    setPage("register");
  }

  function routeToLogin() {
    setPage("login");
  }

  return (
    <Provider value={client}>
      <NativeBaseProvider>
        {page === "login" ? (
          <View>
            <Login
              routeToRegister={routeToRegister}
              routeToSuccess={() => {
                setPage("success");
              }}
            />
          </View>
        ) : (
          <Fragment>
            {page === "register" ? (
              <View>
                <Register
                  routeToLogin={routeToLogin}
                  routeToSuccess={() => {
                    setPage("success");
                  }}
                />
              </View>
            ) : (
              <Fragment>
                {page === "profile" ? (
                  <Profile
                    routeToSuccess={() => {
                      setPage("success");
                    }}
                  />
                ) : (
                  <Success
                    routeToSuccess={() => {
                      setPage("success");
                    }}
                    routeToProfile={() => {
                      setPage("profile");
                    }}
                  />
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </NativeBaseProvider>
    </Provider>
  );
}
