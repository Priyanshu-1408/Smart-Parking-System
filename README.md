<<<<<<< HEAD
# Smart-Parking-System
=======
# Smart Parking Lot System

A modern, responsive web application for managing parking slots and vehicles. Built with React and Vite.

## Features

- **Dashboard**: Real-time overview of total, occupied, and available slots.
- **Slot Management**: Add new slots with specific features (EV Charging, Covered).
- **Smart Parking**: automatically assigns the best available slot based on vehicle requirements (size, EV, cover) using a "nearest slot" algorithm.
- **Vehicle Removal**: Free up slots explicitly or via the dashboard.
- **Activity Log**: Real-time log of all system actions and errors.
- **Data Persistence**: Local state management (resets on refresh).

## Parking Logic

The system uses a "Best Fit / Nearest Slot" algorithm:
1.  **Filter**: Identifies all empty slots.
2.  **Match**: Filters empty slots against user requirements:
    *   If `EV Required`: Filters for slots with `isEVCharging === true`.
    *   If `Cover Required`: Filters for slots with `isCovered === true`.
3.  **Sort**: Sorts valid candidates by `slotNo` (ascending).
4.  **Assign**: Selects the first slot in the sorted list (lowest number).
5.  **Feedback**: Returns an error if no matching slots are found.

## Project Structure

- `src/App.jsx`: Main controller and state container.
- `src/components/`:
    - `AddSlotForm.jsx`: Form to create slots.
    - `ParkVehicleForm.jsx`: Form to park vehicles.
    - `RemoveVehicleForm.jsx`: Logic to unpark vehicles.
    - `SlotList.jsx`: Visual grid of parking slots.
    - `OutputPanel.jsx`: System activity logger.

## Setup & Deployment

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Locally**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

### Deploying to Vercel/Netlify

This project is optimized for static hosting.

**Netlify:**
1.  Run `npm run build`.
2.  Drag and drop the `dist` folder to Netlify Drop.

**Vercel:**
1.  Import this repository.
2.  Framework Preset: `Vite`.
3.  Build Command: `npm run build`.
4.  Output Directory: `dist`.
>>>>>>> 77d8ab9 (Initial smart parking lot system)
