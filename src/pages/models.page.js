import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import app from '../core/firebase.config';

import DeleteModal from "../components/delete.modal";
import { EditButton, DeleteButton } from '../components/action.button';

function Models() {
    let history = useHistory();
    let db = app.database().ref();

    const [table, setTable] = useState({ list: [], _wait: true, _error: '', selectedItemId: -1 });
    useEffect(() => {
        db.child('deviceTypes').once('value', typesData => {
            let tmpTypesData = []; typesData.forEach((d) => { tmpTypesData = [ ...tmpTypesData, { id: d.key, name: d.val() } ] })
            
            db.child('deviceModels').on('value', modelsData => {
                let tmpModelsData = [];

                //#region Data Extract
                if (modelsData.exists()) {
                    modelsData.forEach((d) => { 
                        tmpModelsData = [ 
                            ...tmpModelsData, 
                            { 
                                id: d.key, 
                                ...d.val(), 
                                typeName: tmpTypesData.filter(t => t.id === d.val().typeId)[0].name } 
                        ] 
                    })
                    
                }
                //#endregion

                setTable({ ...table, list: tmpModelsData, _wait: false, })
            })
        })
    }, [])

    const handleDelete = () => {
        window.$('#delete-modal').modal('hide')
        setTable({ ...table, _wait: true });

        db.child('deviceModels/' + table.selectedItemId).remove().then(() => {

        })
    }

    return (
        <div className='container mt-4'>
            {table._wait ? (
                <center className="mt-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </center>
            ) : (
                <React.Fragment>
                    <div className='row'>
                        <div className='col-12 mb-2'>
                            <button className='btn btn-success btn-sm' onClick={() => history.push('/add-device-model')}>
                                <i className="fa fa-plus" aria-hidden="true"></i> Cihaz Modeli Ekle
                            </button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-lg-6'>
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead style={{ backgroundColor: '#212529', color: '#fff' }}>
                                        <tr>
                                            <th>#</th>
                                            <th>Model Adı</th>
                                            <th>Cihaz Türü</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table.list.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.typeName}</td>
                                                    <td>
                                                        <EditButton onClick={() => history.push('/device-models/edit/' + item.id)} />
                                                        <DeleteButton onClick={() => {
                                                            setTable({...table, selectedItemId: item.id})
                                                            window.$('#delete-modal').modal('show')
                                                        }} />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>

                                </table>
                                {!table.list.length ? (
                                    <center>
                                        <p>Kayıt bulunamadı!</p>
                                    </center>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <DeleteModal onClick={handleDelete} content='Cihaz modeli silinsin mi?' />
                </React.Fragment>
            )}
        </div>
    )
}

export default Models