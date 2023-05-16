import styled from '@emotion/styled';

const Base = styled.div<{imageUrl: string}>`
    width: 100%;
    height:100vh;
    padding-top: 70px;
    background: url(${({imageUrl}) => imageUrl}) center center / cover no-repeat;
`;

const Search: React.FC = () => {
    return (
        <Base imageUrl={'/assets/tiengviet_main.jpg'}>
            <h4>Search</h4>
        </Base>
    )
}

export default Search;