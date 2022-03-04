import React, { useState } from 'react';
// import { MouseEventHandler } from 'react';
import ToggleButton from './ToggleButton';

export default function ToggleButtonGroup() {

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [other, setOther] = useState(false);

    const triggerMale = () => {
        setMale(true)
        setFemale(false)
        setOther(false)
    }
    const triggerFemale = () => {
        setMale(false)
        setFemale(true)
        setOther(false)
    }
    const triggerOther = () => {
        setMale(false)
        setFemale(false)
        setOther(true)
    }

    return (
        <>
            <ToggleButton buttonText='Male' isToggled={male} setToggle={triggerMale} />
            <ToggleButton buttonText='Female' isToggled={female} setToggle={triggerFemale} />
            <ToggleButton buttonText='N/A' isToggled={other} setToggle={triggerOther} />
        </>
    )
}