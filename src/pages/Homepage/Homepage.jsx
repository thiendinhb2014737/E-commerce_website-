import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WapperTypeProduct, WrapperButtonMore, WrapperProducts } from "./style";
import SliderComponents from "../../components/SliderComponents/SliderComponents";
import slider1 from "../../assets/Images/slider1.png"
import slider2 from "../../assets/Images/slider2.png"
import slider3 from "../../assets/Images/slider3.png"
import CardComponents from "../../components/CardComponents/CardComponents";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService"
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponents/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useNavigate } from "react-router-dom";
import backgroundBody from "../../assets/Images/Body_Sale.png"

const Homepage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const [pending, setPending] = useState(false)
    const searchDebounce = useDebounce(searchProduct, 100)
    const [limit, setLimit] = useState(12)
    const [typeProduct, setTypeProduct] = useState([])

    const fetchProductAll = async (context) => {

        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProduct(res?.data)
        }
    }
    // bỏ isPending
    const { isLoading: isPending, data: products, isPlaceholderData } = useQuery({
        queryKey: ['products', limit, searchDebounce],
        queryFn: fetchProductAll, retry: 3, retryDeplay: 1000, placeholderData: true
    })

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (

        < Loading isPending={pending}>
            <div className="body" style={{ width: '100%', backgroundColor: "#f5f5fa" }}>
                <div style={{ width: '1270px', margin: '0 auto', backgroundColor: "#fff" }}>
                    <WapperTypeProduct>
                        {typeProduct.map((item) => {
                            return (
                                <TypeProduct name={item} key={item} />
                            )
                        })}
                    </WapperTypeProduct>
                </div>
            </div>
            <div className="body" style={{ width: '100%', backgroundColor: "#f5f5fa" }}>
                <div id="container" style={{ margin: '0 auto', height: "1000px", width: '1270px', backgroundColor: "#fff", padding: '5px' }}>
                    <SliderComponents arrImages={[slider1, slider2, slider3]} />

                    <WrapperProducts>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponents
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    selled={product.selled}
                                    discount={product.discount}
                                    id={product._id}
                                />
                            )
                        })}

                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore
                            textbutton={isPlaceholderData ? 'Load more' : ' Xem thêm'} type='outline'
                            styleButton={{
                                border: '1px solid rgb(10, 104, 255)',
                                color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(10, 104, 255)'}`,
                                width: '240px',
                                height: '38px',
                                borderRadius: '4px'
                            }}
                            disabled={products?.total === products?.data?.length || products.totalPage === 1}
                            styletextbutton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
                            onClick={() => setLimit((prev) => prev + 6)}
                        />
                    </div>
                </div>
            </div>
            <FooterComponents />
        </Loading>

    )
}
export default Homepage