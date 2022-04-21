import React from 'react'
import {Select} from 'antd';
import {API_URL} from "../../../config/constants";
import {useNavigate} from "react-router-dom";
import {routePaths} from "../../../config/routes";
import {Notfication, NOTIFICATION_TYPE} from "../../UI";

const {Option} = Select;

let timeout: any;
let currentValue: string;

function fetchData(value: string, callback: (data: any) => void) {
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
                const data: any = [];
                resData.forEach((r: any) => {
                    data.push({
                        value: r.id,
                        text: r.title,
                    });
                });
                callback(data);
            }
        } catch (e) {
            Notfication(NOTIFICATION_TYPE.ERROR, "Something went wrong");
        }
    }

    timeout = setTimeout(fetchQuery, 300);
}


const SearchMovie = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState([])
    const [value, setValue] = React.useState<null | string>(null)

    const handleSearch = (value: string) => {
        if (value) {
            fetchData(value, data => setData(data));
        } else {
            setData([]);
        }
    };

    const handleChange = (value: string) => {
        navigate(routePaths.discoverMovie(value))
        setValue(value)
    };
    const options = data.map((d: any) => <Option key={d.value}>{d.text}</Option>);

    const placeholder = 'type to search movie and select from list'
    const style = {width: 300}
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