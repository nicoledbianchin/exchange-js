import React from 'react';
import Header from '../../components/header/index';
import Calculator from '../../components/calculator/index';

export default class ExchangePage extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <Calculator/>
            </div>
        )
    }
}