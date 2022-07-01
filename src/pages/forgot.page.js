import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/error.message';
import SuccessMessage from '../components/success.message';

import app from '../core/firebase.config';

function Forgot() {
    useEffect(() => {
        document.body.style.backgroundColor = '#3383FD';
    }, [])

    const [form, setForm] = useState({ email: '', _wait: false, _error: '', _success: '' });

    const handleSend = useCallback(
        async event => {
            if (form.email) {
                setForm({ ...form, _wait: true, _error: '', _success: ''})
                try {
                    await app.auth().sendPasswordResetEmail(form.email).then((user) => {
                        setForm({...form, email: '', _wait: false, _error: '', _success: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.'})
                    })
                }
                catch (error) {
                    setForm({ ...form, _error: '* E-posta adresi yanlış.', _wait: false })
                }
            }
            else {
                setForm({ ...form, _error: '* Lütfen boş bırakmayın.' })
            }
        }
    )

    return (
        <div className='container'>
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-4 mx-auto" style={{ marginTop: 15 }}>
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h2 className="text-center" style={{ fontSize: 22, color: '#1a1b4b', marginBottom: 15 }}>MIUI Downloader Pro</h2>
                            <p className="text-center mb-4" style={{ color: 'gray', marginBottom: 15 }}>
                                E-posta adresinize şifrenizi sıfırlamak için bir bağlantı göndereceğiz
                            </p>

                            <div className="form-group mb-2">
                                <label className="form-label">E-posta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value, _error: '', _success: ''})}
                                />
                            </div>
                            <ErrorMessage message={form._error} />
                            <SuccessMessage message={form._success} />
                            <button className="btn btn-primary w-100" onClick={handleSend} disabled={form._wait}>
                                {form._wait ? 'Lütfen bekleyin...' : 'Gönder'}
                            </button>

                            <hr className="my-4" />
                            <p style={{ textAlign: 'center', fontSize: 16 }}>
                                <Link to="/" style={{ color: '#000', textDecoration: 'underline'  }}>Giriş Yap</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot