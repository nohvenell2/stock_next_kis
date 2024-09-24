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
    //클라이언트 컴포넌트 로딩처리
    const [isMounted,setMounted] = useState(false)
    useEffect(()=>setMounted(true),[])
    //Selector 에서 하나 골랐을 때 실행하는 함수
    const handleChange = (e) => {
        onSelect(e?.value)
    };
    //Render
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