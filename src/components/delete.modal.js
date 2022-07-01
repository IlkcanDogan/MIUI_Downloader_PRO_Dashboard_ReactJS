import React from "react"

export default function DeleteModal({onClick, content}) {
    return (
        <div className="modal fade" id="delete-modal" tabindex="-1" role="dialog" aria-hidden="true" data-keyboard="false" data-backdrop="static">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Uyarı</h5>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">İptal</button>
                        <button className="btn btn-danger" type="button" onClick={onClick}>Evet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}