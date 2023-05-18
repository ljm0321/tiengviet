import React, { useState } from "react";
import styled from '@emotion/styled';
import axios from 'axios';
import {IoIosArrowDown} from 'react-icons/io';

const Base = styled.div<{imageUrl: string}>`
    width: 100%;
    height:100vh;
    padding-top: 70px;
    background: url(${({imageUrl}) => imageUrl}) center center / cover no-repeat;
`;

const PageTitle = styled.div`
    font-size: 2rem;
    text-align: center;
    font-weight: bold;  
    color: #f2f2f2;
`;

const SearchWrap = styled.div`
    padding-top: 20px;
    max-width: 800px;
    min-width: 270px;
    width: 70vw;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;

    @media (min-width: 420px) {
        justify-content: space-between;
    }
`;

const SearchInput = styled.input`
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 0.9rem;
    border: 0;
    color: rgb(1, 27, 75);
    background: #f2f2f2;
    width: 100%;
    margin-bottom: 2vw;
    outline: none;
    height: 44px;

    @media (min-width: 420px) {
        width: 32%;
    }
`;

const SearchButton = styled.button`
    margin-bottom: 2vw;
    padding: 10px 8px;
    box-sizing: border-box;
    letter-spacing: 2px;
    font-size: 18px;
    color: #f2f2f2;
    font-weight: 700;
    text-align: center;
    width: 100%;
    border: 0;
    background: linear-gradient( 20deg, rgb(0, 195, 255), rgb(162, 0, 255) );
    border-radius: 10px;
    cursor: pointer;
    height: 44px;

    @media (min-width: 420px) {
        width: 32%;
    }
`;

const ResultInput = styled.div`
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 0.9rem;
    border: 0;
    color: rgb(1, 27, 75);
    background: #f2f2f2;
    width: 100%;
    height: 44px;

    @media (min-width: 420px) {
        width: 32%;
    }
`;

const SelectWrap = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 30px;
`;

const Select = styled.select`
    outline: none;
    border: none;
    padding: 5px 5px 5px 10px;
    border-radius: 10px;
    appearance: none;
    width: 70px;
    background-image: url('/assets/arrow.png');
    background-position: center right 6px;
    background-size: 0.6rem;
    background-repeat: no-repeat;
`;

const SelectOption = styled.option`
`;


const Search: React.FC = () => {
    const [papago, setPapago] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [selected, setSelected] = useState<string>('type1');

    const apiGet = async (query: string) => {
        let url = "";
        
        if (selected === "type1") {
            url = "http://localhost:3000/api/converter";
        } else {
            url = "http://localhost:3000/api/converter2";
        }
        
        const resp = await axios.get(url, {
            params: {
                query: query,
            },
            }
        );
        
        setPapago(resp.data.message.result.translatedText);
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>):void => {
        setSelected(e.target.value);
    }

    const hadleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    }

    const handleButton = (): void => {
        if (inputValue === '') {
            setPapago('');
        } else {
            apiGet(inputValue);
        }
    }

    return (
        <Base imageUrl={'/assets/tiengviet_main.jpg'}>
            <PageTitle>Search</PageTitle>
            <SelectWrap>
                <Select onChange={handleSelect}>
                    <SelectOption value="type1">ko - vi</SelectOption>
                    <SelectOption value="type2">vi - ko</SelectOption>
                </Select>
            </SelectWrap>
            <SearchWrap>
                <SearchInput 
                    placeholder="검색어를 입력하세요."
                    onChange={hadleInputChange}
                    value={inputValue}
                >
                </SearchInput>
                <SearchButton onClick={handleButton}>
                    Search
                </SearchButton>
                <ResultInput>{papago}</ResultInput>
            </SearchWrap>
        </Base>
    )
}

export default Search;