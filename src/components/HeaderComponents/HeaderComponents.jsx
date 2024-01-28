import React, { useEffect, useState } from "react"
import { Badge, Col, Popover } from 'antd'
import { WapperHeader, WapperTextHeader, WapperHeaderAccount, WapperTextHeaderSmall, WrapperContentPopup } from "./style"
import {
    UserOutlined, CaretDownOutlined, ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slice/UserSlide'
import Loading from "../LoadingComponents/Loading";
import { searchProduct } from "../../redux/slice/productSlide";

const HeaderComponents = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [pending, setPending] = useState(false)
    const order = useSelector((state) => state.order)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        //****************/
        localStorage.clear();
        //****************/
        dispatch(resetUser())
        setPending(false)
    }

    useEffect(() => {
        setPending(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setPending(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>

            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Tài khoản</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    );
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    return (
        <div style={{ width: '100%', background: '#ffd4d4', display: 'flex', justifyContent: 'center' }}>
            <WapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WapperTextHeader>DINGVOG</WapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size='large'
                            bordered={false}
                            placeholder='Nhập nội dung cần tìm....'
                            textButton='Tìm kiếm'
                            onChange={onSearch}
                        />
                    </Col>
                )}


                <Col span={6} style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <Loading isPending={pending}>
                        < WapperHeaderAccount>
                            {userAvatar ? (
                                <img src={userAvatar} alt="uerAvatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}

                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: "pointer" }}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                                    <WapperTextHeaderSmall>Đăng nhập/Đăng ký</WapperTextHeaderSmall>
                                    <div>
                                        <WapperTextHeaderSmall>Tài khoản</WapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>

                                </div>
                            )}
                        </WapperHeaderAccount>
                    </Loading>
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#444' }} />
                            </Badge>
                            <WapperTextHeaderSmall>Giỏ hàng</WapperTextHeaderSmall>

                        </div>
                    )}

                </Col>
            </WapperHeader>
        </div>
    )
}
export default HeaderComponents