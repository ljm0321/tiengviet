import Header from '@/components/Header';
import styled from '@emotion/styled';

const Base = styled.div<{imageUrl: string}>`
    width: 100%;
    height:100vh;
    padding-top: 70px;
    background: url(${({imageUrl}) => imageUrl}) center center / cover no-repeat;
    display: flex;
    justify-content: center;
`;

const AboutBox = styled.div`
    width: 70vw;
    height: 200px;
    border-radius: 10px;
    max-width: 400px;
    background: #ffffff59;
    text-align: center;
    color: #f2f2f2;
    margin-top: 5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5vw;
`;

const PageTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    padding-bottom: 5px;
`;

const AboutList = styled.li`
    font-size: 1.1rem;
    font-weight: 500;
`;

const About: React.FC = () => {

    return (
        <>
            <Header activeIndex={2} />
            <Base imageUrl={'/assets/tiengviet_main.jpg'}>
                <AboutBox>
                    <PageTitle>About</PageTitle>
                    <AboutList>
                        베트남어 스터디 노트
                    </AboutList>
                    <AboutList>
                        - Nextjs / typescript / emotion
                    </AboutList>
                </AboutBox>
            </Base>
        </>
    )
}

export default About;