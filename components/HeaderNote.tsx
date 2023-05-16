import styled from "@emotion/styled";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {BiUserCircle} from "react-icons/bi"

interface Props {
    activeIndex: number;
}

const Base = styled.header`
    width: 100%;
    height: 62px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 0 30px;
`;

const NavList = styled.div`
    display: flex;
`;

const Nav = styled.li<{ active?: boolean }>`
    position: relative;
    margin-right: 30px;
    color: #012030;

    a.active {
        border-bottom: 2px solid salmon;
    }

    a:hover {
        color: salmon;
    }
`;

const UserIcon = styled.div`
    position: relative;
    width: 2rem;
    height: 2rem;

    svg {
        width: 100%;
        height: 100%;
        fill: #012030;
    }
`;


const HeaderNote: React.FC<Props> = ({activeIndex}) => {
    const [activeNav, setActiveNav] = useState<number>(0);
    const [fixNav, setFixNav] = useState<boolean>(false);

    function navHandler(index: number): void {
        setActiveNav(index);
    }

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);

        return() => {
            document.addEventListener("scroll", handleScroll);
        }
    }, []);

    function handleScroll(): void {
        if (window.scrollY > 50) {
            setFixNav(true);
        } else {
            setFixNav(false);
        }
    }

    return (
        <Base>
            <NavList>  
                <Nav>
                    <Link 
                        className={
                            activeIndex === 0 ? "active" : ""
                        } 
                        href="/" onClick={() => navHandler(activeIndex)}>Search
                    </Link>
                </Nav>
                <Nav>
                    <Link  
                        className={
                            activeIndex === 1 ? "active" : ""
                        } 
                        href="/notes" onClick={() => navHandler(activeIndex)}>Note
                    </Link>
                </Nav>
            </NavList>
            <UserIcon>
                <BiUserCircle />
            </UserIcon>
        </Base>
    )
};

export default HeaderNote;