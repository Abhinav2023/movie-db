import React from 'react';
import styled from 'styled-components';

const Button=styled.button`
    position: relative;
    left: ${props => (props.position === "left" ? '20px' : '380px')};
    background: white;
    color: black;
    border : 1px solid black;
    width: 100px;
    height: 50px;
`;

const LightSwitch=({callback,switchOn,position})=>(
    <Button position={position} onClick={callback}>
        {switchOn ? 'On' : 'Off'}
    </Button>
);

export default LightSwitch;