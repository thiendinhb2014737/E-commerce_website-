import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import {
  WapperHeader,
  WapperTextHeader,
  WapperHeaderAccount,
  WapperTextHeaderSmall,
  WrapperContentPopup,
  WapperTextHeaderAD,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  SolutionOutlined,
  ShoppingOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slice/UserSlide";
import Loading from "../LoadingComponents/Loading";
import { searchProduct } from "../../redux/slice/productSlide";
import logo from "../../assets/Images/Logo.png";

const HeaderComponents = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [pending, setPending] = useState(false);
  const order = useSelector((state) => state.order);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    setPending(true);
    await UserService.logoutUser();
    //****************/
    localStorage.removeItem("access_token");
    //localStorage.clear('access_token');
    //****************/
    navigate("/sign-in");
    dispatch(resetUser());
    setPending(false);
  };

  useEffect(() => {
    setPending(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setPending(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        <UserOutlined /> Tài khoản
      </WrapperContentPopup>
      {user?.isAdmin ? (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          <AppstoreAddOutlined /> Quản lý hệ thống
        </WrapperContentPopup>
      ) : (
        <div>
          <WrapperContentPopup
            onClick={() => handleClickNavigate("my-lovePro")}
          >
            <HeartOutlined /> Yêu thích của tôi
          </WrapperContentPopup>
          <WrapperContentPopup onClick={() => handleClickNavigate("my-order")}>
            <ShoppingOutlined /> Đơn hàng của tôi
          </WrapperContentPopup>
          <WrapperContentPopup onClick={() => handleClickNavigate("contact")}>
            <SolutionOutlined /> Liên hệ chúng tôi
          </WrapperContentPopup>
        </div>
      )}

      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "contact") {
      navigate("/contact");
    } else if (type === "my-lovePro") {
      navigate("/my-lovePro");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#5774F8",
        display: "flex",
        justifyContent: "center",
        height: "80px",
      }}
    >
      <WapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col span={6}>
          <WapperTextHeader to="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            THỜI TRANG DINGVOG
          </WapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={12}>
            <ButtonInputSearch
              size="large"
              bordered={false}
              placeholder="Nhập nội dung cần tìm...."
              textbutton="Tìm kiếm"
              onChange={onSearch}
            />
          </Col>
        )}
        {isHiddenSearch && (
          <Col span={13}>
            <WapperTextHeaderAD>QUẢN TRỊ HỆ THỐNG</WapperTextHeaderAD>
          </Col>
        )}

        <Col
          span={6}
          style={{ display: "flex", gap: "30px", alignItems: "center" }}
        >
          <Loading isPending={pending}>
            <WapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="uerAvatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}

              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsOpenPopup((prev) => !prev)}
                    >
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WapperTextHeaderSmall>
                    Đăng nhập/Đăng ký
                  </WapperTextHeaderSmall>
                  <div>
                    <WapperTextHeaderSmall>Tài khoản</WapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div
              onClick={() => navigate("/order")}
              style={{ cursor: "pointer" }}
            >
              {/* /// */}
              {order?.userIds === user?.id ? (
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined
                    style={{ fontSize: "30px", color: "#fff" }}
                  />
                </Badge>
              ) : (
                <Badge size="small">
                  <ShoppingCartOutlined
                    style={{ fontSize: "30px", color: "#fff" }}
                  />
                </Badge>
              )}

              <WapperTextHeaderSmall> Giỏ hàng</WapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WapperHeader>
    </div>
  );
};
export default HeaderComponents;
