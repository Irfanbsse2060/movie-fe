// @ts-nocheck
import React from 'react'
import {Form, Input, InputNumber, Button, notification, DatePicker} from 'antd';
import {API_URL} from "../../../config/constants";
import {useParams} from "react-router";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const openNotificationWithIcon = (type, title, description) => {
    notification[type]({
        message: title,
        description
    });
};

const BookingForm = ({onSubmit}) => {
    const params = useParams();
    const [form] = Form.useForm();
    const [isFormSubmitting, setIsFormSubmitting] = React.useState(false)
    const onFinish = async (bookingData: any) => {
        try {
            setIsFormSubmitting(true)
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...bookingData, movieId: params.movieId})
            };
            await fetch(`${API_URL}/movies/${params.movieId}/booking`, requestOptions)
            // const data = await response.json()
            openNotificationWithIcon('success', 'Movie Booking', `you have successfully booked ${bookingData.numberOfSeats} seats`)
            form.resetFields();
            onSubmit()
        } catch (e) {
            openNotificationWithIcon('error', 'Movie Booking', `something went wrong.`)
        } finally {
            setIsFormSubmitting(false)
        }
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        const date = new Date()
        date.setDate(date.getDate())
        return current && current < date;
    }
    return (
        <Form {...layout} name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['firstName']} label="First Name" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['lastName']} label="Last Name" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['email']} label="Email" rules={[{type: 'email', required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['numberOfSeats']} label="Seats"
                       rules={[{type: 'number', min: 1, max: 10, required: true}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item name={['bookedDate']} label="DatePicker" rules={[{required: true}]}>
                <DatePicker showTime disabledDate={disabledDate}/>
            </Form.Item>
            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit" disabled={isFormSubmitting}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BookingForm