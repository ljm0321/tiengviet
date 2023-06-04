import { useRouter } from 'next/router';
import { getAllNoteIds, getNoteData } from '../../lib/importNote';
import HeaderNote from '@/components/HeaderNote';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { NoteData, Params } from '@/types/note';
import Utterances from './Comment';

export const getStaticPaths = async () => {
    const paths = getAllNoteIds();
    return {
        paths,
        fallback: true, 
    };
}

export const getStaticProps = async ({params}: {params: Params}) => {
    const noteData = await getNoteData(params.id);
    return {
        props: {
            noteData,
        }
    }
}

const NoteWrap = styled.div`
    width: 100%;
    min-height:100vh;
    padding: 70px 5vw;
`;

const NoteTop = styled.div`
    padding: 5vw;
    border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.li`
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 1vw;
`;

const Date = styled.li`
    font-size: 0.8rem;
    font-weight: 400;
`;

const NoteContent = styled.div`
    padding: 5vw;
`;
const Subtitle = styled.div`
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 5vw;
`;

const CotentHtml = styled.div`
    font-size: 1rem;
    font-weight: 400;

    ul {
        padding: 3vw 3vw 3vw 5vw;
    }

    li {
        list-style: unset;
        font-size: 0.9rem;
    }

    p {
        margin-bottom: 3vw;
    }
`;

const NoteNav = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 5vw;
`;
const Prev = styled.div``;
const Next = styled.div``;

const Content = function({noteData} : {noteData: NoteData}) {
    const router = useRouter();

    const [noteLength, setNoteLength] = useState<number>(Number(router.query.noteLength));

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <>
            <HeaderNote activeIndex={1} />
            <NoteWrap>
                <NoteTop>
                    <Title>{noteData.title}</Title>
                    <Date>{noteData.date}</Date>    
                </NoteTop>
                <NoteContent>
                    <Subtitle>{noteData.subtitle}</Subtitle>
                    <CotentHtml dangerouslySetInnerHTML={{ __html: noteData.contentHtml }} />
                </NoteContent>
                <NoteNav>
                    <Next>
                        {Number(noteData.fileIndex) < noteLength ? (
                            <Link href={`/notes/note${Number(noteData.fileIndex)+1}`}>다음글</Link>
                        ) : (
                            ''
                        )}
                    </Next>
                    <Prev>
                        {Number(noteData.fileIndex) > 1 ? (
                            <Link href={`/notes/note${Number(noteData.fileIndex)-1}`}>이전글</Link>
                        ) : (
                            ''
                        )}
                    </Prev>
                </NoteNav>
            </NoteWrap>
            <Utterances />
        </>
    )
}

export default Content;