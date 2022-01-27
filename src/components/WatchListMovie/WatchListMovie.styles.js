import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 2px solid grey;
    border-radius: 20px;
    margin: 20px 100px 20px 100px;
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
    grid-gap: 2rem;
    margin: 0 50px 0 0;
`;