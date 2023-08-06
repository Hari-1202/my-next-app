import React, { useEffect, useState } from 'react'

const Nodes = ({ skillInfo: { skillNode: skillSet } }) => {
    const [skills, setSkills] = useState(skillSet)
    useEffect(() => {
        console.log(skills)
    }, [])
    const [showingSkills, setShowingSkills] = useState({})
    const [showingLang, setShowingLang] = useState({})
    const [showingfw, setShowingfw] = useState({})

    const onClick = ({ category, lang = '', framework = '' }) => {
        if (lang !== '') {
            setShowingLang(showingSkills[lang]);
        } else if (framework !== '') {
            console.log(showingLang, framework);
            if (showingLang.hasOwnProperty(framework)) {
                if (showingLang[framework].hasOwnProperty("frameworks")) {
                    setShowingfw({ ...showingfw, [framework]: showingLang[framework]["frameworks"] })
                } else {
                    setShowingfw({ ...showingfw, [framework]: showingLang[framework] })
                }
            }
        }
        else {
            let showingSkills = skills[category]
            setShowingSkills(showingSkills)
        }
    }
    console.log(showingfw)
    return (
        <div>
            {Object.keys(skills).map((category) => {
                return (
                    <div onClick={() => onClick({ category })}> {category}</div>
                )
            })}
            {Object.keys(showingSkills).length > 0 && Object.keys(showingSkills).map((lang) => {
                return (
                    <div onClick={() => onClick({ lang })}> {lang}</div>
                )
            })}
            {Object.keys(showingLang).length > 0 && Object.values(showingLang["frameworks"]).map((framework) => {
                return (
                    <div onClick={() => onClick({ framework })}> {framework}</div>
                )
            })}
            {Object.keys(showingfw).length > 0 && Object.values(showingfw).map((frameworks) => {
                return (
                    frameworks.map((framework) => {
                        return (
                            <div onClick={() => onClick({ framework })}> {framework}</div>
                        )
                    })
                )
            })}
        </div>
    )
}

export default Nodes