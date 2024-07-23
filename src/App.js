import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponents from "./components/DefaultComponents/DefaultComponents";
import { isJsonString } from "./utils";
//import axios from 'axios'
//import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slice/UserSlide";
import Loading from "./components/LoadingComponents/Loading";
import FooterComponents from "./components/FooterComponents/FooterComponents";

function App() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const user = useSelector((state) => state.user);

  // Lưu access_token
  useEffect(() => {
    setIsPending(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData);
    }
    setIsPending(false);
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let refresh_token = localStorage.getItem("refresh_token");
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refresh_token);
        console.log("data?", data);
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const addChatScript = async () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1`;
    script.async = true;

    document.body.appendChild(script);
  };

  useEffect(() => {
    addChatScript();
  }, []);
  return (
    <div>
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? DefaultComponents : Fragment;
              return (
                <Route
                  key={route.path}
                  path={isCheckAuth ? route.path : undefined}
                  element={
                    <Layout>
                      <Page />
                      <df-messenger
                        intent="WELCOME"
                        chat-title="BotClothes"
                        agent-id="b85e4acd-643a-48bc-877d-f12afae9d3a7"
                        language-code="en"
                      ></df-messenger>
                      <FooterComponents />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
      {/* <ChatBotComponent /> */}
    </div>
  );
}
export default App;
