'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Select from 'react-select';
function StockSelector({ symbols, symbolsData, market }){
    let base_url;
    if (market == 'kospi'){base_url = `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.NEXT_PUBLIC_KOSPI_URL}/`}
    else if (market == 'snp500'){base_url = `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.NEXT_PUBLIC_SNP500_URL}/`}
    const router = useRouter()
    const [Loaded,setLoaded] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    useEffect(()=>setLoaded(true),[])
    const selectOptions = symbols.map((symbol)=>({
        value: symbol,
        label: `${symbolsData[symbol].stock_name} [${symbol}]`
    }))
    const handleChange = (e) => {
        if (!e?.value) return
        const value = e.value
        const stock_url = base_url + encodeURIComponent(value)
        setSelectedOption(null)
        router.push(stock_url)
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
            escapeClearsValue
            value={selectedOption}
            menuPortalTarget={document.body}
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
    menuPortal: provided => ({ ...provided, zIndex: 5 }),
};
export default StockSelector;