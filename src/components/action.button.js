import React from 'react';

export function EditButton(props) {
    return (
        <button {...props} className="btn btn-circle btn-success btn-sm" style={{ marginRight: 10 }} data-toggle="tooltip" data-placement="top" title="Düzenle">
            <i className="fa fa-pencil"></i>
        </button>
    )
}

export function DeleteButton(props) {
    return (
        <button {...props} className="btn btn-circle btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Sil">
            <i className="fa fa-trash"></i>
        </button>
    )
}