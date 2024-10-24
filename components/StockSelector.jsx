'use client'
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { stock_code_name,stock_code_codes } from '@/constants/stock_code_name';
const selectOptions = stock_code_codes.map(c=>({
    value: c.stock_code,
    label: `${c.stock_name} [${c.stock_code}]`
}))
const StockSelector = ({ onSelect,currentStock }) => {

    //Selector 에서 하나 골랐을 때 실행하는 함수
    const [Loaded,setLoaded] = useState(false)
    useEffect(()=>setLoaded(true),[])
    const handleChange = (e) => {
        onSelect(e?.value)
    };
       //Render
    if (!Loaded) return <></>
    return (
        <Select
            options={selectOptions}
            onChange={handleChange}
            placeholder="Choose a stock"
            styles={customStyles}
            isClearable
            value = {currentStock? {value:currentStock, label:`${stock_code_name[currentStock]} [${currentStock}]`}:null}
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