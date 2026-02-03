import React, { useState } from 'react';

const ParkVehicleForm = ({ onPark }) => {
    const [needsEV, setNeedsEV] = useState(false);
    const [needsCover, setNeedsCover] = useState(false);
    const [plateNumber, setPlateNumber] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(null);

        if (!plateNumber.trim()) {
            setMessage({ type: 'error', text: 'Please enter a vehicle plate number.' });
            return;
        }

        const result = onPark({
            plateNumber,
            needsEV,
            needsCover
        });

        if (result.success) {
            setMessage({ type: 'success', text: `Vehicle parked in Slot #${result.slotNo}` });
            setPlateNumber('');
            setNeedsEV(false);
            setNeedsCover(false);
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    };

    return (
        <div className="glass-panel">
            <h2>Park a Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="plateNumber">Plate Number</label>
                    <input
                        id="plateNumber"
                        type="text"
                        className="form-input"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        placeholder="e.g. ABC 123"
                    />
                </div>

                <div className="checkbox-group">
                    <input
                        id="needsEV"
                        type="checkbox"
                        className="checkbox-input"
                        checked={needsEV}
                        onChange={(e) => setNeedsEV(e.target.checked)}
                    />
                    <label htmlFor="needsEV" className="form-label" style={{ marginBottom: 0 }}>Needs EV Charging</label>
                </div>

                <div className="checkbox-group">
                    <input
                        id="needsCover"
                        type="checkbox"
                        className="checkbox-input"
                        checked={needsCover}
                        onChange={(e) => setNeedsCover(e.target.checked)}
                    />
                    <label htmlFor="needsCover" className="form-label" style={{ marginBottom: 0 }}>Needs Covered Spot</label>
                </div>

                {message && (
                    <p className={`error-msg ${message.type === 'success' ? 'text-success' : 'text-danger'}`} style={{ color: message.type === 'success' ? 'var(--success)' : 'var(--danger)' }}>
                        {message.type === 'success' ? '✓ ' : '⚠ '}{message.text}
                    </p>
                )}

                <button type="submit" className="btn" style={{ width: '100%' }}>Find & Park</button>
            </form>
        </div>
    );
};

export default ParkVehicleForm;
