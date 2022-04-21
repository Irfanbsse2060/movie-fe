import React from 'react'
import {NavLink} from 'react-router-dom'
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

                            <NavLink
                                to={item.url}
                                className={({isActive}) =>
                                    (isActive ? "active" : "not-active")}
                            >
                                {item.label}
                            </NavLink>
                        </li>

                    )

                })
            }
        </ul>
    )

}
