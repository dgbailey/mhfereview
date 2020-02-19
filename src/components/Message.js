import React from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';


export const Message = ({uuid,senderUuid,content,sentAt}) => {

    
    const toMilliseconds = Date.parse(sentAt);
    const newDateFormat = new Date(toMilliseconds).toString();
    const dispatch = useDispatch();

    function deleteItemFromStore(){
        let action = {type:'DELETE',content,uuid};
        dispatch(action);
    }


    return (
        <StyledMessage>
            <button className='delete-btn' onClick={deleteItemFromStore}>Delete</button>
            
            <div className='message-meta-info'>
                <span className='timestamp'>{newDateFormat}</span>
             
            </div>
            <div className='message-content'>
                <span>From: {senderUuid}</span>
                <span>Content:{content}</span>
            </div>
        </StyledMessage>
    )



}

Message.propTypes = {

    sentAt: PropTypes.string,
    uuid: PropTypes.string,
    content:PropTypes.string,
    senderUuid:PropTypes.string

}

const StyledMessage = styled.li `

    height:10rem;
  
    border-bottom:.1rem solid lightgray;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-evenly;

    &:hover{
        cursor:pointer;
        background:lightgray;
        .delete-btn{
            visibility:visible;
        }
    }

   .delete-btn{
       visibility:hidden;
       width:5rem;
       &:hover{
           cursor:pointer;
       }
   }

   .message-content{
       width:100%;
       display:flex;
       justify-content:space-evenly;
   }

   .timestamp{
       font-size:.5rem;
       color:gray;
   }
`