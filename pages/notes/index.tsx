import Header from "@/components/Header";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { getNoteList } from '../../lib/importNote';
import {AiOutlineArrowRight} from 'react-icons/ai';
import { NoteData } from "@/types/note";


export const getStaticProps = async () => {
    const noteData = await getNoteList();

    return {
        props: {
            noteData
        }
    }
}

const Base = styled.div<{imageUrl: string}>`
    width: 100%;
    min-height:100vh;
    padding-top: 70px;
    background: url(${({imageUrl}) => imageUrl}) center center;
    background-size: 100% auto;
    color: white;
`;

const NoteList = styled.div`
    padding: 3vw 5vw;  
`;

const PageTitle = styled.div`
    font-size: 2rem;
    text-align: center;
    font-weight: bold;  
`;

const NoteItem = styled.div`
    width: 100%;
    height: 200px;
    overflow: hidden;
    padding: 0 8vw 0 5vw;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    align-items: center;

    &:last-child {
        border: none;
    }
`;

const Title = styled.li`
    font-size: 1.7rem;
    font-weight: 600;
    height: 2.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    margin: 1vw 0;
`;
const Date = styled.li`
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.2;
    color: #a3a3a3;
`;
const Subtitle = styled.li`
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.2;
    color: #a3a3a3;
    height: 2.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
`;
const More = styled.div`
    margin-top: 1vw;
    display: flex;
    align-items: center;
    
    svg {
        margin-left: 1vw;
        padding-top: 0.2rem;
    }
`;

const Notes = ({noteData} : {noteData: NoteData[]}) => {
    const reversedNoteData = noteData.slice(0).reverse();
    
    return (
        <>  
            <Header activeIndex={1} />
            <Base imageUrl={'/assets/tiengviet_main.jpg'}>
            <PageTitle>Note</PageTitle>
            <NoteList>
                {reversedNoteData.map(({ id, title, date, subtitle }) => (
                    <NoteItem key={id}>
                        <Link href={{pathname: `/notes/${id}`, query: {
                            noteLength: noteData.length
                        }}}>
                                <Date>{date}</Date>
                                <Title>{title}</Title>
                                <Subtitle>{subtitle}</Subtitle>
                                <More>More<AiOutlineArrowRight /></More>
                        </Link>
                    </NoteItem>
                ))}
            </NoteList>
            </Base>
        </>
    )
}

export default Notes;