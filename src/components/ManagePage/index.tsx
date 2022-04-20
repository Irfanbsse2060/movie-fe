// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {Table, Input, Typography, notification} from 'antd';
import {API_URL} from "../../config/constants";

import './manage-page.scss'

const {Search} = Input

const openNotificationWithIcon = (type, title, description) => {
    notification[type]({
        message: title,
        description
    });
};


const SearchComponent = ({onSearch}) => {
    return (<div>
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
    </div>)
}


const ManagePage = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async (query = '') => {
        setIsLoading(true)
        try {
            const response = await fetch(`${API_URL}/movies/booking?query=${query}`)
            const data = await response.json()
            setData(data)
        } catch (e) {
            setError('something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const deleteBooking = async (bookingId) => {
        try {
            await fetch(`${API_URL}/movies/booking/${bookingId}`, {method: 'DELETE'})
            openNotificationWithIcon('success', 'Movie Booking Cancellation', `you have successfully deleted  booking`)
            fetchData()
        } catch (e) {
            openNotificationWithIcon('error', 'Movie Booking Cancellation', `something went wrong.`)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    const columns = [
        {
            title: 'Booking Id',
            dataIndex: 'id',
            width: '5%',
        },
        {
            title: 'Movie Id',
            dataIndex: 'movieId',
            width: '5%',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            width: '15%',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
        },
        {
            title: 'Number of seats',
            dataIndex: 'numberOfSeats',
            width: '10%',
        },
        {
            title: 'Booking Date',
            dataIndex: 'bookedDate',
            width: '15%',
            render: (bookedDate) => {
                return (<span> {new Date(bookedDate).toLocaleDateString('en', {
                    localeMatcher: "best fit",
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                })}</span>)
            }
        },

        {
            title: 'operation',
            dataIndex: 'operation',
            width: '15%',
            render: (_: any, record: Item) => {
                return <Typography.Link onClick={() => deleteBooking(record.id)}>
                    delete
                </Typography.Link>
            },
        },
    ];


    const onSearch = (query) => fetchData(query)

    return (
        <div className='manage-page'>
            {error && <div>something went wrong.....</div>}
            {data && (<div>
                <SearchComponent onSearch={onSearch}/>
                <Table
                    loading={isLoading}
                    bordered
                    dataSource={data}
                    columns={columns}
                    pagination={{
                        onChange: () => {
                        },
                    }}
                />
            </div>)}
        </div>
    );
};

export default ManagePage;

