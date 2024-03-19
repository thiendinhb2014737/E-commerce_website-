import React from 'react'
import { Tooltip, ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line } from 'recharts';
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux';

const DashedLineYears = (value) => {
    const user = useSelector((state) => state?.user)
    const Year = value.value
    const month = `January ss ${Year}`
    console.log(month)
    // Tiền tháng 1
    const getPriceJan = async () => {
        const month = `January ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceJan = useQuery({ queryKey: ['priceJan'], queryFn: getPriceJan })
    const { data: priceJan } = queryGetPriceJan

    // Tiền tháng 2
    const getPriceFeb = async () => {
        const month = `February ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceFeb = useQuery({ queryKey: ['priceFeb'], queryFn: getPriceFeb })
    const { data: priceFeb } = queryGetPriceFeb

    // Tiền tháng 3
    const getPriceMar = async () => {
        const month = `March ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceMar = useQuery({ queryKey: ['priceMar'], queryFn: getPriceMar })
    const { data: priceMar } = queryGetPriceMar

    // Tiền tháng 4
    const getPriceApr = async () => {
        const month = `April ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceApr = useQuery({ queryKey: ['priceApr'], queryFn: getPriceApr })
    const { data: priceApr } = queryGetPriceApr
    // Tiền tháng 5
    const getPriceMay = async () => {
        const month = `May ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceMay = useQuery({ queryKey: ['priceMay'], queryFn: getPriceMay })
    const { data: priceMay } = queryGetPriceMay

    // Tiền tháng 6
    const getPriceJun = async () => {
        const month = `June ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceJun = useQuery({ queryKey: ['priceJun'], queryFn: getPriceJun })
    const { data: priceJun } = queryGetPriceJun

    // Tiền tháng 7
    const getPriceJul = async () => {
        const month = `July ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceJul = useQuery({ queryKey: ['priceJul'], queryFn: getPriceJul })
    const { data: priceJul } = queryGetPriceJul

    // Tiền tháng 8
    const getPriceAug = async () => {
        const month = `August ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceAug = useQuery({ queryKey: ['priceAug'], queryFn: getPriceAug })
    const { data: priceAug } = queryGetPriceAug

    // Tiền tháng 9
    const getPriceSep = async () => {
        const month = `September ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceSep = useQuery({ queryKey: ['priceSep'], queryFn: getPriceSep })
    const { data: priceSep } = queryGetPriceSep

    // Tiền tháng 10
    const getPriceOct = async () => {
        const month = `October ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceOct = useQuery({ queryKey: ['priceOct'], queryFn: getPriceOct })
    const { data: priceOct } = queryGetPriceOct

    // Tiền tháng 11
    const getPriceNov = async () => {
        const month = `November ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceNov = useQuery({ queryKey: ['priceNov'], queryFn: getPriceNov })
    const { data: priceNov } = queryGetPriceNov
    // Tiền tháng 12
    const getPriceDec = async () => {
        const month = `December ${Year}`
        const res = await OrderService.getPrice(user?.access_token, month)
        return res
    }
    const queryGetPriceDec = useQuery({ queryKey: ['priceDec'], queryFn: getPriceDec })
    const { data: priceDec } = queryGetPriceDec

    // dùng reduce tính tổng tiền tháng
    const totalPriceJan = priceJan?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceFeb = priceFeb?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceMar = priceMar?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceApr = priceApr?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceMay = priceMay?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceJun = priceJun?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceJul = priceJul?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceAug = priceAug?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceSep = priceSep?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceOct = priceOct?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceNov = priceNov?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);
    const totalPriceDec = priceDec?.data.reduce(
        (accumulator, data) => {
            accumulator = accumulator + data?.totalPrice;
            return (accumulator);
        },
        0);

    const data = [
        {
            name: 'Tháng 1',
            doanhthu: totalPriceJan,
        },
        {
            name: 'Tháng 2',
            doanhthu: totalPriceFeb,
        },
        {
            name: 'Tháng 3',
            doanhthu: totalPriceMar,
        },
        {
            name: 'Tháng 4',
            doanhthu: totalPriceApr,
        },
        {
            name: 'Tháng 5',
            doanhthu: totalPriceMay,
        },
        {
            name: 'Tháng 6',
            doanhthu: totalPriceJun,
        },
        {
            name: 'Tháng 7',
            doanhthu: totalPriceJul,
        },
        {
            name: 'Tháng 8',
            doanhthu: totalPriceAug,
        },
        {
            name: 'Tháng 9',
            doanhthu: totalPriceSep,
        },
        {
            name: 'Tháng 10',
            doanhthu: totalPriceOct,
        },
        {
            name: 'Tháng 11',
            doanhthu: totalPriceNov,
        },
        {
            name: 'Tháng 12',
            doanhthu: totalPriceDec,
        }
    ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={1000}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="doanhthu" stroke="#8884d8" strokeDasharray="5 5" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default DashedLineYears