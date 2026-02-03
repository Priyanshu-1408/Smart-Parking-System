import React, { useState } from 'react';

const RemoveVehicleForm = ({ onRemove }) => {
    const [slotNo, setSlotNo] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(null);

        if (!slotNo) {
            setMessage({ type: 'error', text: 'Please enter a slot number.' });
            return;
        }

        const slotNumberInt = parseInt(slotNo, 10);
        const result = onRemove(slotNumberInt);

        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setSlotNo('');
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    };

    return (
        <div className="glass-panel">
            <h2>Remove Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="removeSlotNo">Slot Number</label>
                    <input
                        id="removeSlotNo"
                        type="number"
                        className="form-input"
                        value={slotNo}
                        onChange={(e) => setSlotNo(e.target.value)}
                        placeholder="e.g. 101"
                        required
                    />
                </div>

                {message && (
                    <p className={`error-msg ${message.type === 'success' ? 'text-success' : 'text-danger'}`} style={{ color: message.type === 'success' ? 'var(--success)' : 'var(--danger)' }}>
                        {message.type === 'success' ? '✓ ' : '⚠ '}{message.text}
                    </p>
                )}

                <button type="submit" className="btn" style={{ width: '100%', backgroundColor: 'var(--danger)' }}>Remove Vehicle</button>
            </form>
        </div>
    );
};

export default RemoveVehicleForm;
