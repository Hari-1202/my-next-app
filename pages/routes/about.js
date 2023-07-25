import Header from '@/components/Header'
import React, { useEffect, useRef, useState } from 'react'

const About = () => {
  const [input, setInput] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0)
  const [messages, setMessages] = useState([{
    input: '',
    response: ''
  }])

  const scrollRef = useRef(null)
  const [count, setCount] = useState(0)

  const entities = [{
    input: ["hey", "hello"],
    response: "Hey , How can i help"
  }, {
    input: ["bye", "See you"],
    response: "See you , glad to have assisted you"
  }]

  const setInputFn = (value) => {
    setInput(value)
  }

  const onSend = () => {

    entities.map((entity) => {
      if (entity.input.includes(input)) {
        console.log(messages[0].input === '');
        if (messages[0].input === '') {
          setMessages([{ input, response: entity.response }])
        } else {
          const count_ = count + 30
          setCount(count + 30)
          setScrollPosition(scrollRef.current.scrollHeight > scrollRef.current.clientHeight ? count_ : 0)
          setMessages([...messages, { input, response: entity.response }])
        }
      }

    })
  }



  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <div className='mobileContainer flex flex-col relative w-30 bg-gray-300'>
        <div className='p-2 h-20 bg-yellow-300'>
          <h1 className='text-center'>Ask your questions</h1>
        </div>
        <div className='overflow-y-auto msgConatiner border-2 border-black-200' ref={scrollRef} >
          {messages[0].input != '' && messages.map((message) => {
            return (
              <div>
                <h1 className='h-7 bg-gray-300 input mx-2 my-2 text-end'>{message.input}</h1>
                <h1 className='h-7 bg-gray-300 mx-2 my-2 response'>{message.response}</h1>
              </div>
            )
          })}
        </div>
        <div className='absolute flex justify-evenly w-full bottom-0 bg-gray-600'>
          <input className='w-full h-20' value={input} onChange={(e) => setInputFn(e.target.value)} type='text' />

          <span className='p-3 ' onClick={onSend}>{"\u003E"} </span>
        </div>
      </div>
    </div>
  )
}

export default About