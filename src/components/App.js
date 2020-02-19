import React,{useEffect,useState} from 'react';
import '../App.css';
import {useSelector} from 'react-redux';
import {MessageList} from './MessageList';


function App() {
  //consumes raw message state from redux store;
  let messageState = useSelector(state => state.messages);

  let [dedupedMessages,setDedupedMessages] = useState(null);

  useEffect(() => {
    //on mount dedupes data
    function deDupeData(rawMessageData){
    
      let hashMap = {};
      let dedupedArray =[];
      
      rawMessageData.forEach( m => {
        let uuid = m.uuid;
        let content = m.content;
        let uuidExists = hashMap[uuid];
     
        if(uuidExists){
       
          if(uuidExists[content]){
            
            //deduping mechanism
           
          }
        }
  
        else if (uuidExists){
          if(!uuidExists[content]){
            uuidExists[content] = content;
          }
          dedupedArray.push(m);
        }
  
        else if(!uuidExists){
          //no uuid on first layer, add uuid and content
          hashMap[uuid] = {[m.content]:content};
          dedupedArray.push(m);
        }
  
      })
     
      setDedupedMessages(dedupedArray);
    }
    
    deDupeData(messageState.messages);
  },[messageState])


  

  return (
    <div className="App">
    { 
      dedupedMessages ? <MessageList dedupedMessages={dedupedMessages}></MessageList>:<div>...Deduping</div>

    }
      
    </div>
  );
}

export default App;
