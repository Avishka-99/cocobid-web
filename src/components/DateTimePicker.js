import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
export default function Picker(props) {
    return (
        <div style={{ width: '100%',marginTop:'1%' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker label="Close Date and Time" onChange={(value) => props.onChange(value)} />
                </DemoContainer>
            </LocalizationProvider>
        </div>

    )
}
