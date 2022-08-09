import * as React from 'react';
import { Alert } from 'react-native';
import { useState, useEffect } from 'react';

export default function AlertBox(method, text, alertType) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(method)
    });

    if(show) {
        return(
            <Alert variant ={alertType}>
                {text}
            </Alert>
        );
    } else {
        return(null);
    }
}