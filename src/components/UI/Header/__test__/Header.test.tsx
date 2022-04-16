import React from 'react';
import {render} from '@testing-library/react';
import Header from '../index'
import {BrowserRouter as Router} from "react-router-dom";
import {linkWithRoutes} from "../../../../config/routes";

describe('Header', () => {
    test('should be able to render', () => {
        const {container} = render(<Router>
            <Header linkList={linkWithRoutes}/>
        </Router>);
        expect(container).toMatchSnapshot()
    })


})
