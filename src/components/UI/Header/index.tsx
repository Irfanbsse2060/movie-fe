import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

interface HeaderLinks {
    label: string
    url: string
}

interface HeaderProps {
    linkList: HeaderLinks[]
}


export default function Header(props: HeaderProps) {
    const {linkList} = props
    return (
        <ul data-testid={'header'} className='header'>
            {
                linkList.map((item) => {
                    return (
                        <li key={item.url} className='header__item'>
                            <Link to={item.url}>{item.label}</Link>
                        </li>

                    )

                })
            }
        </ul>
    )

}
