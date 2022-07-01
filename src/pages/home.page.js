import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import app from '../core/firebase.config';

import DeleteModal from "../components/delete.modal";
import { EditButton, DeleteButton } from '../components/action.button';

function Home() {
    let history = useHistory();
    let db = app.database().ref();

    const [select, setSelect] = useState({ modelTypes: [], romTypes: [], uploadTypes: [], _wait: true });
    const [table, setTable] = useState({ list: [], _wait: true, _error: '', selectedItemId: 0 });

    useEffect(() => {
        //Device Models
        db.child('deviceModels').once('value', data => {
            let tmpDeviceModels = [];
            data.forEach((d) => { tmpDeviceModels = [...tmpDeviceModels, { id: d.key, name: d.val().name }] })

            //Rom Types
            db.child('romType').once('value', data => {
                let tmpRomTypes = [];
                data.forEach((d) => { tmpRomTypes = [...tmpRomTypes, { id: d.key, name: d.val() }] })

                //Upload Types
                db.child('uploadType').once('value', data => {
                    let tmpUploadTypes = [];
                    data.forEach((d) => { tmpUploadTypes = [...tmpUploadTypes, { id: d.key, name: d.val() }] })

                    setSelect({ modelTypes: tmpDeviceModels, romTypes: tmpRomTypes, uploadTypes: tmpUploadTypes, _wait: false });

                    //#region Get Table
                    db.child('files').on('value', (data) => {
                        let tmpFiles = [];
                        data.forEach((d) => {
                            tmpFiles = [
                                ...tmpFiles, {
                                    id: d.key,
                                    ...d.val(),
                                    modelTypeName: tmpDeviceModels.filter(t => t.id === d.val().modelTypeId)[0].name,
                                    romTypeName: tmpRomTypes.filter(t => t.id === d.val().romTypeId)[0].name,
                                    uploadTypeName: tmpUploadTypes.filter(t => t.id === d.val().uploadTypeId)[0].name,
                                }
                            ]
                        })

                        setTable({ ...table, list: tmpFiles, _wait: false })
                    })
                    //#endregion
                })
            })
        })
    }, [])

    const handleDelete = () => {
        window.$('#delete-modal').modal('hide')
        setTable({ ...table, _wait: true });

        db.child('files/' + table.selectedItemId).remove().then(() => {

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
                            <button className='btn btn-success btn-sm' onClick={() => history.push('/add-file')}>
                                <i className="fa fa-plus" aria-hidden="true"></i> Dosya Ekle
                            </button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead style={{ backgroundColor: '#212529', color: '#fff' }}>
                                    <tr>
                                        <th>#</th>
                                        <th>Model Adı</th>
                                        <th>ROM Tipi</th>
                                        <th>Yükleme Tipi</th>
                                        <th>Dosya Güncelleme Tarihi</th>
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.list.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.modelTypeName}</td>
                                                <td>{item.romTypeName}</td>
                                                <td>{item.uploadTypeName}</td>
                                                <td>{item.updatedDate || '-'}</td>
                                                <td>
                                                    <EditButton onClick={() => history.push('/files/edit/' + item.id)} />
                                                    <DeleteButton onClick={() => {
                                                        setTable({ ...table, selectedItemId: item.id })
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
                    <DeleteModal onClick={handleDelete} content='Dosya silinsin mi?' />
                </React.Fragment>
            )}
        </div>
    )
}

export default Home