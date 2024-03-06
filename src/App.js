import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BASE_URL } from "./global";
import { postData, postDataWhitoutToken } from "./services/api";
import UserPage from "./pages/UserPage";
import { Layout, theme } from "antd";
import Sider from "./components/Sider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthorPage from "./pages/AuthorPage";
import BookPage from "./pages/BookPage";
import UserHasBookPage from "./pages/UserHasBookPage";
import LoanPage from "./pages/LoanPage";
import items from "./utils/items";
import itemsUser from "./utils/itemsUser";
import ReturnPage from "./pages/ReturnPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const aux = {
        email: window.localStorage.getItem("user"),
        token: window.localStorage.getItem("token"),
      };
      try {
        const trueToken = await postDataWhitoutToken(
          `${BASE_URL}/api/v1/auth/isvalidtoken`,
          aux
        );
        setIsLogin(trueToken);
        const userEmail = {};
        userEmail.emailUser = window.localStorage.getItem("user");
        const getUser = await postData(
          `${BASE_URL}/users/byemail`,
          userEmail,
          window.localStorage.getItem("token")
        );
        if (getUser.roleUser === "ADMIN") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error verificando el token:", error);
      }
    };
    checkTokenValidity();
  }, [this]);

  return (
    <BrowserRouter>
      {isLogin && isAdmin ? (
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider items={items} />
          <Layout>
            <Header />
            <Layout.Content
              style={{
                margin: "0 0px",
              }}
            >
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                <Routes>
                  <>
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/author" element={<AuthorPage />} />
                    <Route path="/book" element={<BookPage />} />
                    <Route path="/userhasbook" element={<UserHasBookPage />} />
                  </>
                </Routes>
              </div>
            </Layout.Content>
            <Footer />
          </Layout>
        </Layout>
      ) : isLogin && isAdmin === false ? (
            <Layout
              style={{
                minHeight: "100vh",
              }}
            >
              <Sider items={itemsUser}/>
              <Layout>
                <Header />
                <Layout.Content
                  style={{
                    margin: "0 0px",
                  }}
                >
                  <div
                    style={{
                      padding: 24,
                      minHeight: 360,
                      background: colorBgContainer,
                    }}
                  >
                    <Routes>
                    <Route path="/loanabook" element={<LoanPage />} />
                    <Route path="/returnabook" element={<ReturnPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    </Routes>
                  </div>
                </Layout.Content>
                <Footer />
              </Layout>
            </Layout>
      ) : (
        <Routes>
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
