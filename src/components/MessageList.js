import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {Message} from './Message';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';



export const MessageList = props => {

    const dispatch = useDispatch();
    const {dedupedMessages} = props;
    
    //can delete from state
  
    
    const [pagedMessages,setPagedMessages] = useState(null);

  
    useEffect(() => {

         //on mount paginates deduped messages
         const paginateMessages = (messageList,delimeter=5) => {
            //takes iterable and assigns prev and next values
            //delimeter caps values per linkNode

            let count = delimeter;
            let head = new ListNode();
            let current = head;

            for(let i = 0; i < messageList.length; i ++){
                let pageItem = messageList[i];
                if(count === 0){
                   
                    let newPageNode = new ListNode();
                    current.next = newPageNode;
                    newPageNode.prev = current;
                    current = newPageNode;
                    count = delimeter;
                   

                }
                current.addValue(pageItem);
                count --;

            }
         
            setPagedMessages(head);
        
        }
        class ListNode{
            constructor(){
                this.pages = [];
                this.next = null;
                this.prev = null;
            }
    
            addValue(pageItem){
                this.pages.push(pageItem)
            }
        }
       
        paginateMessages(dedupedMessages);
        
    }
    ,[dedupedMessages]);

    //begin paging

    function pageNext(){
        if(pagedMessages.next){
            setPagedMessages(pagedMessages.next);
        }
        else{
            alert('last page reached')
        }
       
    }
    function pagePrevious(){
        if(pagedMessages.prev){
            setPagedMessages(pagedMessages.prev);
        }
        else{
            alert('you are on the first page')
        }
    }

    
    

    //begin sorting

    function sortMessagesAsc(){
        dispatch({type:'SORTASC'});

    }

    function sortMessagesDes(){
        dispatch({type:'SORTDSC'});

    }

    return (

        <StyledMessageList>
            <button onClick={sortMessagesAsc}>Sort Asc</button> 
            <button onClick={sortMessagesDes}>Sort Des</button> 
            <div className='message-container'>
                {
            
                pagedMessages ? 
                pagedMessages.pages.map(m => {
                return (
                    <div key={m.uuid}>
                        <ul>
                            <Message  {...m}/>
                        </ul>
                    </div>
                )})
                :<div>...Loading</div>

            }
            </div>
            <button onClick={pagePrevious}>Previous</button>
            <button onClick={pageNext}>Next</button>
            
        </StyledMessageList>


    )





}

MessageList.propTypes = {
    dedupedMessages:PropTypes.arrayOf(
        
        PropTypes.exact({
            sentAt: PropTypes.string,
            uuid: PropTypes.string,
            content:PropTypes.string,
            senderUuid:PropTypes.string
        })
    )
}


const StyledMessageList = styled.section `
    border-radius:.3rem;
    padding:3rem;
    height:60rem;
    width:37rem;
    border:.1rem solid black;
    margin:10rem auto;
    .message-container{
        height:50rem;
        margin-bottom:1rem;
    }
    ul{
        list-style:none;
        margin:0rem;
        padding:0rem;
    }

    button{
        &:hover{
           cursor:pointer;
       }
    }

 

`