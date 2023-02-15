import React from 'react';
import styled from 'styled-components';

const PopUp = (props) => {
    console.log(props.somepop);

    //const {title,children,openPopUp,setOpenPopUp}
    return (
        <div>
         
        </div>
    )
}

const Container = styled.div`
height:400px;
width:30%;
left:50%;
top:50%;
border-radius:10px;
box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px;
transform: translate(-50%,-50%);
background-color:#fff;
position:absolute;
display:flex;

`

export default PopUp;