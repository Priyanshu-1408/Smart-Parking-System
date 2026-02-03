import React, { useState } from 'react';

const AddSlotForm = ({ onAddSlot, existingSlots, onLog }) => {
  const [slotNo, setSlotNo] = useState('');
  const [isCovered, setIsCovered] = useState(false);
  const [isEVCharging, setIsEVCharging] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const slotNumberInt = parseInt(slotNo, 10);

    if (isNaN(slotNumberInt)) {
      setError('Please enter a valid slot number.');
      return;
    }

    if (existingSlots.some(slot => slot.slotNo === slotNumberInt)) {
      const msg = `Slot number ${slotNumberInt} already exists.`;
      setError(msg);
      if (onLog) onLog(msg, 'error');
      return;
    }

    onAddSlot({
      slotNo: slotNumberInt,
      isCovered,
      isEVCharging,
      isOccupied: false,
      vehicle: null
    });

    // Reset form
    setSlotNo('');
    setIsCovered(false);
    setIsEVCharging(false);
  };

  return (
    <div className="glass-panel">
      <h2>Add New Slot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="slotNo">Slot Number</label>
          <input
            id="slotNo"
            type="number"
            className="form-input"
            value={slotNo}
            onChange={(e) => setSlotNo(e.target.value)}
            placeholder="e.g. 101"
            required
          />
        </div>

        <div className="checkbox-group">
          <input
            id="isCovered"
            type="checkbox"
            className="checkbox-input"
            checked={isCovered}
            onChange={(e) => setIsCovered(e.target.checked)}
          />
          <label htmlFor="isCovered" className="form-label" style={{ marginBottom: 0 }}>Is Covered</label>
        </div>

        <div className="checkbox-group">
          <input
            id="isEVCharging"
            type="checkbox"
            className="checkbox-input"
            checked={isEVCharging}
            onChange={(e) => setIsEVCharging(e.target.checked)}
          />
          <label htmlFor="isEVCharging" className="form-label" style={{ marginBottom: 0 }}>EV Charging Available</label>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn" style={{ width: '100%' }}>Add Slot</button>
      </form>
    </div>
  );
};

export default AddSlotForm;
