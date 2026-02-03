import React, { useEffect, useRef } from 'react';

const OutputPanel = ({ logs }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                System Activity
            </h3>

            <div
                ref={scrollRef}
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    maxHeight: '300px',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    textAlign: 'left'
                }}
            >
                {logs.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No activity yet...</p>
                ) : (
                    logs.map((log, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '0.5rem',
                                borderRadius: '0.25rem',
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                borderLeft: `3px solid ${log.type === 'success' ? 'var(--success)' :
                                        log.type === 'error' ? 'var(--danger)' : 'var(--accent-color)'
                                    }`,
                                animation: 'fadeIn 0.3s ease'
                            }}
                        >
                            <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem', fontSize: '0.75rem' }}>
                                {log.time}
                            </span>
                            <span>{log.message}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OutputPanel;
