import React from 'react'
import {Button, DatePicker, Form, Input, InputNumber} from 'antd';
import {API_URL} from "../../../config/constants";
import {useParams} from "react-router";
import {Notfication, NOTIFICATION_TYPE} from "../../UI";

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

const BookingForm = ({onSubmit} : {onSubmit: ()=> void}) => {
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
            const response = await fetch(`${API_URL}/movies/${params.movieId}/booking`, requestOptions)
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data?.message);
            }
            Notfication(NOTIFICATION_TYPE.SUCCESS, 'Movie Booking', `you have successfully booked ${bookingData.numberOfSeats} seats`)
            form.resetFields();
            onSubmit()
        } catch (e: any) {
            Notfication(NOTIFICATION_TYPE.ERROR, 'Movie Booking', e.message)
        } finally {
            setIsFormSubmitting(false)
        }
    };

    const disabledDate = (current: any) => {
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
            <Form.Item name={['bookedDate']} label="Booking Date" rules={[{required: true}]}>
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