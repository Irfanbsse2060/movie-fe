// @ts-nocheck
import React from 'react'
import {Select} from 'antd';
import {API_URL} from "../../../config/constants";
import {useNavigate} from "react-router-dom";
import {routePaths} from "../../../config/routes";

const {Option} = Select;

let timeout;
let currentValue;

function fetchData(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    async function fetchQuery() {
        try {
            const response = await fetch(`${API_URL}/movies/search?query=${value}`)
            const resData = await response.json()
            if (currentValue === value) {
                const data = [];
                resData.forEach(r => {
                    data.push({
                        value: r.id,
                        text: r.title,
                    });
                });
                callback(data);
            }
        } catch (e) {
            console.log('something went wrong =', e)
        }

    }
    timeout = setTimeout(fetchQuery, 300);
}


const SearchMovie = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState([])
    const [value, setValue] = React.useState(undefined)

    const handleSearch = value => {
        if (value) {
            fetchData(value, data => setData(data));
        } else {
            setData([]);
        }
    };

    const handleChange = value => {
        navigate(routePaths.discoverMovie(value))
        setValue(value)
    };
    const options = data.map(d => <Option key={d.value}>{d.text}</Option>);

    const placeholder = 'type to search movie and select from list'
    const style ={width: 300}
    return (
        <Select
            showSearch
            value={value}
            placeholder={placeholder}
            style={style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
        >
            {options}
        </Select>
    );
}

export default SearchMovie;