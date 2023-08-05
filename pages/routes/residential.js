import Header from '@/components/Header'
import Nodes from '@/components/Nodes'
import React, { useEffect, useRef, useState } from 'react'

const Residential = () => {
  const [input, setInput] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0)
  const [messages, setMessages] = useState([{
    input: '',
    response: 'Hi, Im Hariharan working as front end developer  to know more click on the links below'
  }])
  const data = {
    user: {
      name: 'John Doe',
      age: 30,
    },
    address: {
      city: 'New York',
      country: 'USA',
    },
  };
  const [linkDetails, setLinkDetails] = useState({
    showLinks: true,
    links: ["My Skills", "My Contact", "Download my resume"]
  })
  const downloadRef = useRef(null)

  const scrollRef = useRef(null)
  const msgRef = useRef(null)
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

  const [skillInfo, setSkillInfo] = useState({
    showSkills: false,
    skills: ['Html', 'Css', 'Javascript', 'ReactJs', 'NextJS', 'NodeJS', 'Express'],
    skillNode: {
      frontend: {
        Html: {
          frameworks: []
        },
        Css: {
          frameworks: ["Tailwind", "AntD"]
        },
        Javascript: {
          frameworks: ["ReactJS", "NextJS", "Redux"]
        }
      },
      backend: {
        NodeJS: {
          frameworks: ["Express"]
        },
        Database: {
          frameworks: {
            Relational: ["SQL"],
            NonRelational: ["MongoDb"]
          }
        }
      }
    }
  })

  const onSend = () => {

    entities.map((entity) => {
      if (entity.input.includes(input)) {
        setMessages([...messages, { input, response: entity.response }])
      }
    })
  }



  const scrollToBottom = () => {
    // console.log(msgRef.current.clientHeight, msgRef.current.scrollHeight, scrollRef.current.clientHeight, scrollRef.current.scrollHeight)
    // scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    msgRef.current.scrollIntoView({ behavior: 'smooth' })
  }


  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const downloadPDf = () => {
    downloadRef.current.click()
  }

  const linkHandler = (actionIndex) => {
    // alert(actionIndex)
    switch (actionIndex) {
      case 0:
        setSkillInfo({ ...skillInfo, showSkills: !skillInfo.showSkills })
      case 1:
      case 2:
      // downloadPDf()
    }
  }

  return (
    <div>
      <div className='resumeWrapper flex flex-col relative w-30 bg-gray-300'>
        <div className='p-2 h-20 bg-yellow-300'>
          <h1 className='text-center'>Ask your questions</h1>
        </div>
        <div className='overflow-y-auto resumeContainer border-2 border-black-200' ref={scrollRef} >
          {messages.map((message, index) => {
            return (
              <div ref={msgRef} className='flex flex-col flex-wrap'>
                <div >
                  <h1 className='bg-gray-300 mx-2 response'>{message.response}</h1>
                  {index !== 0 && <h1 className=' bg-gray-300 input mx-2 my-2 text-end'>{message.input}</h1>}
                </div>
                {index === 0 && <div className='mx-2 border-2 response border-black bg-green-200 flex flex-col'>
                  {linkDetails.links.map((link, index) => {
                    return (
                      <p onClick={() => linkHandler(index)} className='block p-2  border-2 border-black'>{link}</p>
                    )
                  })}
                </div>}
                {skillInfo.showSkills && <div className='skills mx-2 my-2'>
                  <Nodes skillInfo={skillInfo} data={data} />
                </div>}
              </div>
            )
          })}

        </div>
        <div className='absolute flex justify-evenly w-full bottom-0 bg-gray-600'>
          <input className='w-full h-20' value={input} onChange={(e) => setInputFn(e.target.value)} type='text' />

          <span className='p-3 ' onClick={onSend}>{"\u003E"} </span>
        </div>
      </div>
      <a ref={downloadRef} href='/Resume.pdf' download="hariharan_resume" />
      {/* <button onClick={downloadPDf}> Download pdf </button> */}
    </div>
  )
}

export default Residential