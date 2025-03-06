import React from 'react';
import { DrawingMode } from "../../../../constants/drawingModes";
import TablePreview from "./TablePreview";

const ControlPanel = ({
                          currentDrawingMode,
                          setCurrentDrawingMode,
                          selectedTableType,
                          setSelectedTableType,
                          tableTypes,
                          onClose
                      }) => {
    // Prevent clicks inside the panel from propagating to the parent
    const handlePanelClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="controls" onClick={handlePanelClick}>
            <div className="controls-header">
                <h3>Floor Plan Tools</h3>
            </div>

            <div className="controls-section">
                <h4 className="section-title">Mode</h4>
                <div className="button-group">
                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.SELECT)}
                        className={`tool-button select-button ${currentDrawingMode === DrawingMode.SELECT ? 'active' : ''}`}
                    >
                        <i className="tool-icon select-icon"></i>
                        <span>Select</span>
                    </button>

                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.WINDOW)}
                        className={`tool-button ${currentDrawingMode === DrawingMode.WINDOW ? 'active' : ''}`}
                    >
                        <i className="tool-icon window-icon"></i>
                        <span>Window</span>
                    </button>



                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.WALL)}
                        className={`tool-button ${currentDrawingMode === DrawingMode.WALL ? 'active' : ''}`}
                    >
                        <i className="tool-icon wall-icon"></i>
                        <span>Wall</span>
                    </button>

                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.DOOR)}
                        className={`tool-button ${currentDrawingMode === DrawingMode.DOOR ? 'active' : ''}`}
                    >
                        <i className="tool-icon door-icon"></i>
                        <span>Door</span>
                    </button>

                    <button
                        onClick={() => setCurrentDrawingMode(DrawingMode.TABLE)}
                        className={`tool-button ${currentDrawingMode === DrawingMode.TABLE ? 'active' : ''}`}
                    >
                        <i className="tool-icon table-icon"></i>
                        <span>Table</span>
                    </button>
                </div>
            </div>

            {currentDrawingMode === DrawingMode.TABLE && (
                <div className="controls-section">
                    <h4 className="section-title">Table Type</h4>
                    <select
                        className="table-select"
                        value={Object.keys(tableTypes).find(key => tableTypes[key] === selectedTableType) || 'medium1'}
                        onChange={(e) => setSelectedTableType(tableTypes[e.target.value])}
                    >
                        {Object.keys(tableTypes).map(key => (
                            <option key={key} value={key}>{tableTypes[key].name}</option>
                        ))}
                    </select>

                    <div className="preview-container">
                        <TablePreview selectedTableType={selectedTableType} />
                    </div>
                </div>
            )}

            <div className="controls-section controls-footer">
                <div className="tool-help">
                    {currentDrawingMode === DrawingMode.SELECT &&
                        <p>Click on elements to select, drag to move.</p>
                    }
                    {currentDrawingMode === DrawingMode.TABLE &&
                        <p>Click on the floor plan to place a table.</p>
                    }
                    {currentDrawingMode === DrawingMode.WALL &&
                        <p>Click and drag to draw walls.</p>
                    }
                    {currentDrawingMode === DrawingMode.DOOR &&
                        <p>Click to place a door on the floor plan.</p>
                    }
                    {currentDrawingMode === DrawingMode.WINDOW &&
                        <p>Click to place a window on the floor plan.</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;