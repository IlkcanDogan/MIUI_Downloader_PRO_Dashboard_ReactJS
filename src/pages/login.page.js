import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/error.message';

import app from '../core/firebase.config';

function Login() {
    useEffect(() => {
        document.body.style.backgroundColor = '#3383FD';
    }, [])

    const [form, setForm] = useState({ email: '', password: '', _wait: false, _error: '' });

    const handleLogin = useCallback(
        async event => {
            if(form.email && form.password) {
                setForm({...form, _wait: true, _error: ''})
                try {
                    await app.auth().signInWithEmailAndPassword(form.email, form.password).then((user) => {
                        
                    })
                }
                catch (error) {
                    setForm({ ...form, _error: '* E-posta adresi veya şifre yanlış.', _wait: false})
                }
            }
            else {
                setForm({...form, _error: '* Lütfen boş bırakmayın.'})
            }
        }
    )

    return (
        <div className='container'>
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-4 mx-auto" style={{ marginTop: 15 }}>
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h2 className="text-center mb-5" style={{ fontSize: 22, color: '#1a1b4b', marginBottom: 15 }}>MIUI Downloader Pro</h2>

                            <div className="form-group mb-2">
                                <label className="form-label">E-posta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setForm({ ...form, email: e.target.value, _error: '' })}
                                />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Şifre</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={(e) => setForm({ ...form, password: e.target.value, _error: '' })}
                                />
                            </div>
                            <ErrorMessage message={form._error} />

                            <button className="btn btn-primary w-100" onClick={handleLogin} disabled={form._wait}>
                                {form._wait ? 'Lütfen bekleyin...' : 'Giriş Yap'}
                            </button>

                            <hr className="my-4" />
                            <p style={{ textAlign: 'center', fontSize: 16 }}>
                                <Link to="/password/reset" style={{ color: '#000', textDecoration: 'underline' }}>Şifremi Unuttum</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login