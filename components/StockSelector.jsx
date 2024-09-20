'use client'
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import stock_CodeName from '@/constants/stock_code_name';
const stock_Codes = Object.keys(stock_CodeName);
const selectOptions = stock_Codes.map(c=>({
    value: c,
    label: `${stock_CodeName[c]} [${c}]`
}))
const StockSelector = ({ onSelect }) => {
    const [isMounted,setMounted] = useState(false)
    useEffect(()=>setMounted(true),[])
    const handleChange = (e) => {
        onSelect(e?.value); // 선택된 주식을 상위 컴포넌트로 전달
    };

    return (
        isMounted ?
        <Select
            options={selectOptions}
            onChange={handleChange}
            placeholder="Choose a stock"
            styles={customStyles}
            isClearable
        /> :
        <></>
    );
};
//바 스타일
const customStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: 'lightyellow',
        borderColor: 'orange',
        '&:hover': { borderColor: 'gold' },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? 'lightblue' : 'white',
        color: 'black',
    }),
};
export default StockSelector;