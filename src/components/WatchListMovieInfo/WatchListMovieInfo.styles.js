import styled from "styled-components";

export const Wrapper = styled.div``;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: 700;

    button {
        background: green;
        color: white;
        border:none;
        font-size: 20px;
        padding: 5px 10px 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    }

`;

export const Text = styled.div`
    font-size: 40px;
    font-weight: bold;
`;