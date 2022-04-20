// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Typography, notification} from 'antd';
import {API_URL} from "../../config/constants";

import './ManagePage.scss'

const {Search} = Input

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
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
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
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

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({name: '', age: '', address: '', ...record});
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Booking Id',
            dataIndex: 'id',
            width: '5%',
            editable: false
        },
        {
            title: 'Movie Id',
            dataIndex: 'movieId',
            width: '5%',
            editable: false
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            width: '15%',
            editable: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            width: '15%',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
            editable: true,
        },
        {
            title: 'Number of seats',
            dataIndex: 'numberOfSeats',
            width: '10%',
            editable: true,
        },
        {
            title: 'Booking Date',
            dataIndex: 'bookedDate',
            width: '15%',
            editable: true,
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
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link onClick={() => save(record.key)} style={{marginRight: 8}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link> &nbsp; &nbsp;
                        <Typography.Link disabled={editingKey !== ''} onClick={() => deleteBooking(record.id)}>
                            delete
                        </Typography.Link>
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onSearch = (query) => {
        fetchData(query)

    }

    return (
        <div className='manage-page'>
            {error && <div>something went wrong.....</div>}
            {data && (<div>
                <SearchComponent onSearch={onSearch}/>
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        loading={isLoading}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            </div>)}
        </div>
    );
};

export default ManagePage;

