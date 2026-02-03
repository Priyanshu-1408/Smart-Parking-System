
import React, { useState } from 'react';
import AddSlotForm from './components/AddSlotForm';
import SlotList from './components/SlotList';
import ParkVehicleForm from './components/ParkVehicleForm';
import RemoveVehicleForm from './components/RemoveVehicleForm';
import OutputPanel from './components/OutputPanel';

function App() {
  const [slots, setSlots] = useState([]);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { message, type, time }]);
  };

  const handleAddSlot = (newSlot) => {
    setSlots([...slots, newSlot]);
    addLog(`Slot #${newSlot.slotNo} added successfully.`, 'success');
  };

  /**
   * Parks a vehicle based on requirements.
   * @param {Object} vehicle - Vehicle details and requirements.
   * @param {boolean} vehicle.needsEV - Whether the vehicle requires EV charging.
   * @param {boolean} vehicle.needsCover - Whether the vehicle requires a covered spot.
   * @returns {Object} Result object with success status and message/slotNo.
   */
  const handleParkVehicle = ({ plateNumber, needsEV, needsCover }) => {
    // 1. Filter for all available (not occupied) slots
    // 2. Further filter based on requirements (EV, Cover)
    const availableSlots = slots.filter(slot => {
      // Must not be occupied
      if (slot.isOccupied) return false;

      // If EV is needed, slot MUST have EV charging
      if (needsEV && !slot.isEVCharging) return false;

      // If Cover is needed, slot MUST be covered
      if (needsCover && !slot.isCovered) return false;

      return true;
    });

    // 3. If no slots found, return failure
    if (availableSlots.length === 0) {
      addLog('Failed to park: No slot available matching requirements.', 'error');
      return { success: false, message: 'No slot available matching requirements.' };
    }

    // 4. Sort by slotNo to find the "nearest" (lowest number)
    availableSlots.sort((a, b) => a.slotNo - b.slotNo);

    // 5. Pick the best slot
    const bestSlot = availableSlots[0];

    // 6. Update state to mark slot as occupied
    setSlots(slots.map(slot => {
      if (slot.slotNo === bestSlot.slotNo) {
        return {
          ...slot,
          isOccupied: true,
          vehicle: {
            plateNumber,
            entryTime: new Date()
          }
        };
      }
      return slot;
    }));

    addLog(`Vehicle ${plateNumber} parked at Slot #${bestSlot.slotNo}.`, 'success');
    return { success: true, slotNo: bestSlot.slotNo };
  };

  const handleRemoveVehicle = (slotNo) => {
    const slot = slots.find(s => s.slotNo === slotNo);

    if (!slot) {
      addLog(`Remove failed: Slot #${slotNo} not found.`, 'error');
      return { success: false, message: 'Slot not found.' };
    }

    if (!slot.isOccupied) {
      addLog(`Remove failed: Slot #${slotNo} is already empty.`, 'error');
      return { success: false, message: 'Slot is already empty.' };
    }

    setSlots(slots.map(s => {
      if (s.slotNo === slotNo) {
        return {
          ...s,
          isOccupied: false,
          vehicle: null
        };
      }
      return s;
    }));

    addLog(`Vehicle removed from Slot #${slotNo}.`, 'success');
    return { success: true, message: `Vehicle removed from Slot #${slotNo} ` };
  };

  return (
    <div className="app-container">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Smart Parking System
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your parking facility efficiently</p>
      </header>

      <main>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <AddSlotForm onAddSlot={handleAddSlot} existingSlots={slots} onLog={addLog} />
            <ParkVehicleForm onPark={handleParkVehicle} />
            <RemoveVehicleForm onRemove={handleRemoveVehicle} />
            <OutputPanel logs={logs} />

            <div className="glass-panel" style={{ marginTop: '0rem' }}>
              <h3>Stats</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{slots.length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--danger)' }}>{slots.filter(s => s.isOccupied).length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Occupied</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>{slots.filter(s => !s.isOccupied).length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Available</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Parking Slots</h2>
            <SlotList slots={slots} onRemove={handleRemoveVehicle} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
