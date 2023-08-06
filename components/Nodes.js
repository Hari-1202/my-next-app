import { useState } from "react"

const Nodes = ({ skillInfo }) => {

    const [skills, setSkills] = useState({
        frontend: {},
        backend: {},
    })

    const onShowSkills = ({ category, list, framework }) => {
        let object = {}
        console.log("hey", { category, list, framework }, skillInfo.skillNode[category][list]?.["frameworks"]?.[framework]?.["Direct"], !framework)
        Object.keys(skillInfo.skillNode[category]).map((skillSection) => {
            // console.log(skills.hasOwnProperty(category) , skills[category], skills, category)
            // console.log(skillInfo.skillNode[category][list], list, skillSection);
            if (skills.hasOwnProperty(category)) {
                object[category] = {
                    ...object[category],
                    [skillSection]: list === skillSection ? (framework !== undefined ? {
                        direct: skillInfo.skillNode[category][list]["frameworks"]["Direct"],
                        dependencies  : {
                            [framework]: skillInfo.skillNode[category][list]?.["frameworks"]?.[framework]?.["Direct"]
                        }
                    } : {
                        direct : skillInfo.skillNode[category][list]["frameworks"]["Direct"]
                    }) : {}
                    }
            } else {
                object[category] = {
                    ...object[category], [skillSection]: {}
                }
            }
        })
         // console.log("obj", object)
        setSkills({ ...skills, [category]: object[category] })
    }
    console.log(skills, "Skills")
    return (
        <div>
            <div>
                {Object.keys(skills).map((skill) => {
                    // console.log(skills, skills[skill])
                    return (
                        <>
                            <div onClick={() => onShowSkills({ category: skill })}>{skill}</div>
                            {Object.keys(skills[skill]) && Object.keys(skills[skill]).map((skillList) => {
                                console.log('css', skills[skill][skillList]["direct"], skills?.[skill]?.[skillList]?.["dependencies"])
                                return (
                                    <>
                                        <div onClick={() => onShowSkills({ category: skill, list: skillList })}>{skillList}</div>
                                        {skills[skill][skillList] && skills[skill][skillList]["direct"] && skills[skill][skillList]["direct"].map(framework => <div onClick={() => onShowSkills({ category: skill, list: skillList, framework: framework })}>{framework}</div>)}
                                        {skills[skill][skillList] && skills[skill][skillList]["dependencies"] && Object.values(skills[skill][skillList]["dependencies"]).map(library => <div onClick={() => onShowSkills({ category: skill, list: skillList, framework:  library[0] || library })}>{library[0] || library}</div>)}
                                    </>
                                )
                            }
                            )}
                        </>
                    )
                })}

            </div>
        </div>
    )
}

export default Nodes