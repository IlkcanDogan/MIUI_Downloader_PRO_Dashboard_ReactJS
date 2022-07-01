import React from 'react';

export default function SuccessMessage({ message }) {
    return (
        message ? <p style={{ color: 'green', fontWeight: 'bold', fontSize: 13 }}>{message}</p> : null
    )
}