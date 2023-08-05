import { useState } from "react"

const Nodes = ({ skillInfo }) => {
    const [sD1, setSD1] = useState({
        display: false,
        skills: {},
        clickedItem : ''
    })
    const [sD2, setSD2] = useState({
        display: false,
        skills: {},
        clickedItem: ''
    })

    const onShowSkills = (skillCategory , divisonLevel) => {
        if(divisonLevel === "sd1") {
            const subDivision = skillInfo.skillNode[skillCategory]
            sD1.clickedItem === skillCategory ? setSD1({ ...sD1, display: !sD1.display, skills: subDivision, clickedItem: skillCategory }) : setSD1({ ...sD1, display: true, skills: subDivision, clickedItem: skillCategory })
            sD2.display && setSD2({...sD2 , display: !sD2.display})
        } else if (divisonLevel === "sd2") {
            const subDivision = skillInfo.skillNode[skillCategory]
            if(Object.keys(sD1.skills).includes(skillCategory)){
                const subDivision =  sD1.skills[skillCategory]
                sD2.clickedItem === skillCategory ? setSD2({...sD2, display: !sD2.display, skills: subDivision, clickedItem: skillCategory }) : setSD2({...sD2, display: true, skills: subDivision, clickedItem: skillCategory })
            }
        }
       
        
    }
    

    return (
        <div>
            <div className="flex p-3 justify-center">
                {Object.keys(skillInfo.skillNode).map((skillCategory) => {
                    return (
                        <div className={`${Object.keys(skillInfo.skillNode[skillCategory]).length > 0 ? 'bg-green-400' : 'bg-white'} m-2 flex boder-1 border-black rounded-md p-2`} onClick={() => onShowSkills(skillCategory, "sd1")}>{skillCategory}</div>
                    )
                })}
            </div>
            {sD1.display && <div  className="flex p-3 justify-center">
                {Object.keys(sD1.skills).map((skills) => {
                    return (
                        <div  className={`${Object.keys(sD1.skills[skills]["frameworks"]).length > 0 ? 'bg-yellow-400' : 'bg-white'} m-2 flex boder-1 border-black rounded-md p-2 `} onClick={() => onShowSkills(skills, "sd2")}>{skills}</div>
                    )
                })}
            </div>}
            {sD2.display && <div  className="flex p-3 justify-center">
                {Object.values(sD2.skills["frameworks"]).map((skills,index) => {
                    return (
                        <div  className="m-2 flex boder-1 border-black rounded-md p-2 bg-white" >{skills}</div>
                    )
                })}
            </div>}
        </div>
    )
}

export default Nodes