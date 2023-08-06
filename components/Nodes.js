import React, { useState } from 'react'

const Nodes = ({ skillInfo: { skillNode: skillSet } }) => {
    const [skills, setSkills] = useState(skillSet)
    const [showingSkills, setShowingSkills] = useState({})
    const [showingLang, setShowingLang] = useState({})
    const [showingfw, setShowingfw] = useState({})
    const [currentLanguage, setCurrentLanguage] = useState('')
    const [currentCategory, setCurrentCategory] = useState('')
    const onClick = ({ category, lang = '', framework = '' }) => {
        if (lang !== '') {
            if (Object.keys(showingLang).length > 0 && currentLanguage === lang) {
                setCurrentLanguage(lang)
                setShowingLang({})
                setShowingfw({})
            } else {
                setCurrentLanguage(lang)
                setShowingLang(showingSkills[lang]);
            }
        } else if (framework !== '') {
            if (showingfw.hasOwnProperty(framework)) {
                const filteredObj = { ...showingfw }
                const findFramework = (frameworkVal) => frameworkVal === framework
                let index = Object.keys(filteredObj).findIndex(findFramework)
                Object.entries(filteredObj).slice(index, Object.keys(filteredObj).length).map((items) => delete filteredObj[items[0]])
                setShowingfw(filteredObj)
            } else {
                if (showingLang.hasOwnProperty(framework)) {
                    if (showingLang[framework].hasOwnProperty("frameworks")) {
                        setShowingfw({ ...showingfw, [framework]: showingLang[framework]["frameworks"] })
                    } else {
                        setShowingfw({ ...showingfw, [framework]: showingLang[framework] })
                    }
                }
            }
        }
        else {
            if (Object.keys(showingSkills).length > 0 && category === currentCategory) {
                setCurrentCategory(category)
                setShowingSkills({})
                setShowingLang({})
                setShowingfw({})
            } else {
                let showingSkills = skills[category]
                setCurrentCategory(category)
                setShowingSkills(showingSkills)
                setShowingLang({})
                setShowingfw({})
            }
        }
    }
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