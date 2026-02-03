import React from 'react';

const SlotCard = ({ slot }) => {
    return (
        <div className={`glass-panel ${slot.isOccupied ? 'border-danger' : 'border-success'}`} style={{
            padding: '1.5rem',
            position: 'relative',
            borderLeft: `4px solid ${slot.isOccupied ? 'var(--danger)' : 'var(--success)'}`,
            textAlign: 'left'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>#{slot.slotNo}</h3>
                <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    backgroundColor: slot.isOccupied ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: slot.isOccupied ? 'var(--danger)' : 'var(--success)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {slot.isOccupied ? 'Occupied' : 'Available'}
                </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {slot.isCovered && (
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '0.25rem',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        ☂️ Covered
                    </span>
                )}
                {slot.isEVCharging && (
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '0.25rem',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: '#fbbf24'
                    }}>
                        ⚡ EV
                    </span>
                )}
                {!slot.isCovered && !slot.isEVCharging && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Standard Slot</span>
                )}
            </div>

            {slot.vehicle && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Vehicle</p>
                            <p style={{ margin: 0, fontWeight: 'bold' }}>{slot.vehicle.plateNumber}</p>
                        </div>
                        <button
                            onClick={() => onRemove(slot.slotNo)}
                            className="btn"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: 'var(--danger)' }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const SlotList = ({ slots, onRemove }) => {
    if (slots.length === 0) {
        return (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No slots available. Add a slot to get started.</p>
            </div>
        );
    }

    return (
        <div className="grid">
            {slots.map(slot => (
                <SlotCard key={slot.slotNo} slot={slot} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default SlotList;
