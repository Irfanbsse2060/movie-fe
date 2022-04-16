import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import Button, {ButtonType} from '../index'

describe('Button', () => {

    test('should render primary type', () => {
        const {container} = render(<Button text='text'  handleClick={jest.fn()}/>);
        expect(container).toMatchSnapshot()
    })

    test('should render secondary type', () => {
        const {container} = render(<Button text='text' type={ButtonType.secondary} handleClick={jest.fn()}/>);
        expect(container).toMatchSnapshot()
    })

    test('should call handle click method on click', () => {
        const mockHandleChange = jest.fn()
        const {getByTestId} = render(<Button text='text' handleClick={mockHandleChange}/>);
        fireEvent.click(getByTestId('custom-button'))
        expect(mockHandleChange).toHaveBeenCalledTimes(1)
    });

})
