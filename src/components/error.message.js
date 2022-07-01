import React from 'react';

export default function ErrorMessage({ message }) {
    return (
        message ? (<p style={{ color: 'red', fontWeight: 'bold', fontSize: 13 }}>{message}</p>) : null
    )
}