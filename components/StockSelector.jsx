'use client'
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import stock_CodeName from '@/constants/stock_code_name';
import { usePathname } from 'next/navigation';
const stock_Codes = Object.keys(stock_CodeName);
const selectOptions = stock_Codes.map(c=>({
    value: c,
    label: `${stock_CodeName[c]} [${c}]`
}))
const StockSelector = ({ onSelect,currentStock }) => {
    //Selector 에서 하나 골랐을 때 실행하는 함수
    const [Loaded,setLoaded] = useState(false)
    useEffect(()=>setLoaded(true),[])
    const handleChange = (e) => {
        onSelect(e?.value)
    };
    //주소로 부터 stock code 추출 및 반영
    const [stock,setStock] = useState(currentStock)
    const pathname = usePathname();
    useEffect(()=>{
        setStock(pathname.substring(12))
    },[pathname])
    //Render
    if (!Loaded) return <></>
    return (
        <Select
            options={selectOptions}
            onChange={handleChange}
            placeholder="Choose a stock"
            styles={customStyles}
            isClearable
            value = {stock? {value:stock, label:`${stock_CodeName[stock]} [${stock}]`}:null}
        />
    );
};
//바 스타일
const customStyles = {
    control: (base) => ({
        ...base,
        width:'100%',
        backgroundColor: 'white',
        borderColor: 'black',
        '&:hover': { borderColor: 'lightblue' },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? 'lightblue' : 'white',
        color: 'black',
    }),
};
export default StockSelector;