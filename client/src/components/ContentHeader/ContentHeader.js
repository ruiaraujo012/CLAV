import React, { Component } from 'react';
import './ContentHeader.css'

const ContentHeader = (props) => {
    return (
        <div>

            <p className="contentheader-header">
                {props.header}
            </p>

            <p className="contentheader-description">
                {props.description}
            </p>
        </div>
    );
}

ContentHeader.defaultProps = {
    header: 'Mensagem de teste'
}

export default ContentHeader;