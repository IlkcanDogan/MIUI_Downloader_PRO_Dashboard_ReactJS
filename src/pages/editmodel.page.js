import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import app from '../core/firebase.config';

import ErrorMessage from '../components/error.message';
import SuccessMessage from '../components/success.message';

function EditModel() {
    let history = useHistory();
    let { id } = useParams();
    let db = app.database().ref();

    const [deviceTypes, setDeviceTypes] = useState({ list: [], _wait: true });
    const [form, setForm] = useState({ selectedId: 0, name: '', _wait: false, _error: '', _success: '' });

    useEffect(() => {
        db.child('deviceTypes').on('value', (typesData) => {
            let tmpTypesData = []; typesData.forEach((d) => { tmpTypesData = [ ...tmpTypesData, { id: d.key, name: d.val() } ] })

            db.child('deviceModels/' + id).once('value', (data) => {

                setForm({ ...form, selectedId: data.val().typeId, name: data.val().name });
            })

            setDeviceTypes({ list: tmpTypesData, _wait: false })
        })
    }, [])

    const handleUpdateModel = () => {
        if (form.name) {
            setForm({ ...form, _wait: true, _error: '', _success: '' });

            db.child('deviceModels/' + id).update({ typeId: form.selectedId, name: form.name }).then(() => {
                setForm({ ...form, _wait: false, _error: '', _success: 'Başarı ile güncellendi!' });
            })
        }
        else {
            setForm({ ...form, _success: '', _error: '* Lütfen boş bırakmayın!' })
        }
    }

    return (
        <div className="container mt-4 mb-4">
            {deviceTypes._wait ? (
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
                                <label className="form-label">Cihaz Türü</label>
                                <select className='form-select' onChange={(e) => setForm({ ...form, selectedId: e.target.value, _error: '', _success: '', })}>
                                    {deviceTypes.list.map((item, index) => {
                                        return (
                                            <option value={item.id} selected={item.id === form.selectedId}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                        </div>

                        <div className="col-12 col-md-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Model Adı</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value, _success: '', _error: '' })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <ErrorMessage message={form._error} />
                        <SuccessMessage message={form._success} />
                    </div>

                    <button className="btn btn-success" style={{ minWidth: 80, marginRight: 10 }} onClick={handleUpdateModel} disabled={form._wait}>
                        {form._wait ? 'Lütfen bekleyin...' : 'Güncelle'}
                    </button>
                    <button className="btn btn-primary" onClick={() => history.push('/device-models')}>
                        Geri Dön
                    </button>

                </React.Fragment>
            )}
        </div>
    )
}

export default EditModel;