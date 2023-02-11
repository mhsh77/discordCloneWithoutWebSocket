import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { getchat, getchats } from '../redux/actions/channelactions'
import { channelList, selectchannelChats, selectChannelId } from '../redux/controllers/appSlice'
import Message from './Message'
import { seterror } from '../redux/controllers/errorAndLoadingSlice'
function ChatMasseges() {
  const dispatch = useDispatch()
  ///there is some problems with setting channel chats
  const id = useSelector(selectChannelId)
  const chats = useSelector(selectchannelChats)
  
  
  return (
    <div className='flex-1'>
        {chats.map(chat=>(
          <Message chat={chat}/>
        ))}
        
    </div>
  )
}

export default ChatMasseges