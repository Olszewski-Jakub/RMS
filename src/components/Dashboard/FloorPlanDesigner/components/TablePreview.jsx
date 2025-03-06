import React from 'react';
import TableWithChairs from '../../../FloorPlan/components/TableWithChairs';
import { tableTypes } from '../../../../constants/tableTypes';

const TablePreview = ({ selectedTableType }) => {
    const table = {
        id: "preview",
        x: 10,
        y: 10,
        tableType: selectedTableType,
        rotation: 0
    };

    const previewWidth = 180;
    const previewHeight = 150;
    const scale = Math.min(
        (previewWidth - 20) / table.tableType.width,
        (previewHeight - 20) / table.tableType.height
    ) * 0.5;

    const centerX = previewWidth / 2;
    const centerY = previewHeight / 2;
    const tableX = centerX - (table.tableType.width * scale) / 2;
    const tableY = centerY - (table.tableType.height * scale) / 2;

    return (
        <div className="table-preview">
            <div>Preview: {Object.keys(tableTypes).find(key => tableTypes[key] === selectedTableType)}</div>
            <svg width={previewWidth} height={previewHeight} className="table-preview-svg">
                <g transform={`scale(${scale})`}>
                    <TableWithChairs
                        id={table.intId}
                        x={tableX / scale}
                        y={tableY / scale}
                        tableType={table.tableType}
                        isAvailable={true}
                        rotation={table.rotation}
                        onClick={() => {}}
                    />
                </g>
            </svg>
        </div>
    );
};

export default TablePreview;