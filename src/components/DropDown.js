import React, { useState } from 'react'
import Select from 'react-select'
export default function DropDown(props) {
    const sriLankaDistricts = [
        { label: "Colombo", value: "Colombo" },
        { label: "Gampaha", value: "Gampaha" },
        { label: "Kalutara", value: "Kalutara" },
        { label: "Kandy", value: "Kandy" },
        { label: "Matale", value: "Matale" },
        { label: "Nuwara Eliya", value: "Nuwara Eliya" },
        { label: "Galle", value: "Galle" },
        { label: "Matara", value: "Matara" },
        { label: "Hambantota", value: "Hambantota" },
        { label: "Jaffna", value: "Jaffna" },
        { label: "Kilinochchi", value: "Kilinochchi" },
        { label: "Mannar", value: "Mannar" },
        { label: "Mullaitivu", value: "Mullaitivu" },
        { label: "Vavuniya", value: "Vavuniya" },
        { label: "Batticaloa", value: "Batticaloa" },
        { label: "Ampara", value: "Ampara" },
        { label: "Trincomalee", value: "Trincomalee" },
        { label: "Kurunegala", value: "Kurunegala" },
        { label: "Puttalam", value: "Puttalam" },
        { label: "Anuradhapura", value: "Anuradhapura" },
        { label: "Polonnaruwa", value: "Polonnaruwa" },
        { label: "Badulla", value: "Badulla" },
        { label: "Monaragala", value: "Monaragala" },
        { label: "Ratnapura", value: "Ratnapura" },
        { label: "Kegalle", value: "Kegalle" }
    ];

    console.log(sriLankaDistricts);

    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <Select options={sriLankaDistricts} onChange={(choice) => props.function(choice)} />
    )
}
