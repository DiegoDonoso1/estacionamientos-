import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function Calendario({ handleCalendario, fechaI }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const onChange = (dates) => {
        console.log(dates);
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleReview1 = () => {
        const difference = endDate.getTime() - startDate.getTime();
        const days = difference / (1000 * 3600 * 24) + 1;
        console.log(days);
    };

    return (
        <>
            <DatePicker
                dateFormat='dd/MM/yyyy'
                selected={fechaI}
                onChange={(date) => handleCalendario(date)}
            />
            {/* <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setStartDate(date)}
                placeholderText={`${endDate}`}
                readOnly
            />
            <button onClick={handleReview1}>click</button> */}
        </>
    );
}
