import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import app from '../core/firebase.config';

import ErrorMessage from '../components/error.message';
import SuccessMessage from '../components/success.message';

function EditFile() {
    let history = useHistory();
    let { id } = useParams();
    let db = app.database().ref();

    const [select, setSelect] = useState({ modelTypes: [], romTypes: [], uploadTypes: [], _wait: true });
    let initForm = {
        modelTypeId: 0,
        romTypeId: 0,
        uploadTypeId: 0,
        versionCode: '',
        muiVersionCode: '',
        android: '',
        fileSize: '',
        md5Hash: '',
        updatedDate: '',
        downloadUrl: '',
        _wait: false,
        _error: '',
        _success: ''
    }

    const [form, setForm] = useState(initForm);

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
                    db.child('files/' + id).once('value', (data) => {
                        data.forEach((d) => {
                            setForm({ ...form, ...data.val(), _wait: false })
                        })
                    })
                    //#endregion

                })
            })
        })
    }, [])



    const handleUpdate = () => {
        if (form.downloadUrl) {
            setForm({ ...form, _wait: true });

            db.child('/files/' + id).update({
                ...form,
                modelTypeId: form.modelTypeId || select.modelTypes[0].id,
                romTypeId: form.romTypeId || select.romTypes[0].id,
                uploadTypeId: form.uploadTypeId || select.uploadTypes[0].id,
            }).then(() => {
                setForm({ ...form, _wait: false, _success: 'Başarı ile güncellendi!' })
            }).catch(() => {
                setForm({ ...form, _wait: false, _error: '* Bir hata oluştu, lütfen tekrar deneyin!.' })
            })
        }
        else {
            setForm({ ...form, _error: '* Lütfen dosya indirme linkini boş bırakmayın!' })
        }
    }

    return (
        <div className="container mt-4 mb-4">
            {select._wait ? (
                <center className="mt-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </center>
            ) : (
                <React.Fragment>
                    <div className="row">

                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Model Adı</label>
                                <select className='form-select' onChange={(e) => setForm({ ...form, modelTypeId: e.target.value, _error: '', _success: '' })}>
                                    {select.modelTypes.map((item) => {
                                        return (
                                            <option value={item.id} selected={item.id === form.modelTypeId}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">ROM Tipi</label>
                                <select className='form-select' onChange={(e) => setForm({ ...form, romTypeId: e.target.value, _error: '', _success: '' })}>
                                    {select.romTypes.map((item) => {
                                        return (
                                            <option value={item.id} selected={item.id === form.romTypeId}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Yükleme Tipi</label>
                                <select className='form-select' onChange={(e) => setForm({ ...form, uploadTypeId: e.target.value, _error: '', _success: '' })}>
                                    {select.uploadTypes.map((item) => {
                                        return (
                                            <option value={item.id} selected={item.id === form.uploadTypeId}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Sürüm Kodu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.versionCode}
                                    onChange={(e) => setForm({ ...form, versionCode: e.target.value, _error: '', _success: '' })}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="row">

                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">MUI Sürüm Kodu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.muiVersionCode}
                                    onChange={(e) => setForm({ ...form, muiVersionCode: e.target.value, _error: '', _success: '' })}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Android</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.android}
                                    onChange={(e) => setForm({ ...form, android: e.target.value, _error: '', _success: '' })}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Dosya Boyutu</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.fileSize}
                                    onChange={(e) => setForm({ ...form, fileSize: e.target.value, _error: '', _success: '' })}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">MD5 Hash</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.md5Hash}
                                    onChange={(e) => setForm({ ...form, md5Hash: e.target.value, _error: '', _success: '' })}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Dosya Güncelleme Tarihi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.updatedDate}
                                    onChange={(e) => setForm({ ...form, updatedDate: e.target.value, _error: '', _success: '' })}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label">İndirme Linki</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.downloadUrl}
                                    onChange={(e) => setForm({ ...form, downloadUrl: e.target.value, _error: '', _success: '' })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <ErrorMessage message={form._error} />
                        <SuccessMessage message={form._success} />
                    </div>

                    <button className="btn btn-success" style={{ minWidth: 80, marginRight: 10 }} disabled={form._wait} onClick={handleUpdate}>
                        {form._wait ? 'Lütfen bekleyin...' : 'Güncelle'}
                    </button>
                    <button className="btn btn-primary" onClick={() => history.push('/home')}>
                        Geri Dön
                    </button>
                </React.Fragment>
            )}
        </div>
    )
}

export default EditFile;