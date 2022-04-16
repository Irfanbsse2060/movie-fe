import React, {MouseEvent} from 'react'
import './Button.scss'

export enum ButtonType { primary, secondary}

interface TextFieldProps {
    text: string
    type?: ButtonType
    handleClick: (event: MouseEvent<HTMLButtonElement>) => void
    testId?: string,
    style?: string
}

export default function Button(props: TextFieldProps) {
    const {type = ButtonType.primary, testId = 'custom-button', style = {}, text, handleClick} = props
    const buttonType = type === ButtonType.primary ? 'primary' : 'secondary'


    return (
        <button style={style} data-testid={testId}
                className={`custom-button custom-button--${buttonType}`}
                onClick={handleClick}>
            {text}
        </button>
    )

}
