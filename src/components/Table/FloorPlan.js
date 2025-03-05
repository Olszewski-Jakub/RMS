import React, {useState} from "react";
import TableWithChairs from "./TableWithChairs";
import {tableTypes} from "./tableTypes";

const FloorPlan = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleTableClick = (id, totalSeats) => {
        setSelectedRoom(id);
        console.log(`Selected table: ${id} with ${totalSeats} seats.`);
    };

    return (
        <div>
            <h2 style={{padding: "80px 0"}}>Interactive Floor Plan</h2>

            <svg width="500" height="500" viewBox="0 0 500 500">
                <rect x="0" y="0" width="100" height="5" fill="#cce6ff"/>
                <rect x="200" y="0" width="100" height="5" fill="#cce6ff"/>
                <rect x="400" y="0" width="100" height="5" fill="#cce6ff"/>
                <rect x="0" y="0" width="5" height="200" fill="#cce6ff"/>
                <rect x="0" y="250" width="5" height="200" fill="#cce6ff"/>
                <rect x="490" y="50" width="5" height="90" fill="#cce6ff"/>
                <rect x="490" y="350" width="5" height="90" fill="#cce6ff"/>

                <line
                    x1="500"
                    y1="250"
                    x2="460"
                    y2="250"
                    stroke="#000000"
                    strokeWidth="3"
                />
                <line
                    x1="500"
                    y1="280"
                    x2="500"
                    y2="250"
                    stroke="#000000"
                    strokeWidth="3"
                />
                <path
                    d="M500,280 C480,275 470,265 460,250"
                    fill="transparent"
                    stroke="#000000"
                    strokeWidth="1"
                />


                <TableWithChairs
                    x={20}
                    y={40}
                    id={1}
                    tableType={tableTypes.small6}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
                <TableWithChairs
                    x={20}
                    y={160}
                    id={2}
                    tableType={tableTypes.small6}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
                <TableWithChairs
                    x={20}
                    y={280}
                    id={3}
                    tableType={tableTypes.small6}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
                <TableWithChairs
                    x={20}
                    y={400}
                    id={4}
                    tableType={tableTypes.small6}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
                <TableWithChairs
                    x={180}
                    y={40}
                    id={5}
                    tableType={tableTypes.medium1}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
                <TableWithChairs
                    x={180}
                    y={160}
                    id={6}
                    tableType={tableTypes.medium1}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
                <TableWithChairs
                    x={180}
                    y={280}
                    id={7}
                    tableType={tableTypes.medium1}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
                <TableWithChairs
                    x={180}
                    y={400}
                    id={8}
                    tableType={tableTypes.medium1}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
                <TableWithChairs
                    x={380}
                    y={40}
                    id={9}
                    tableType={tableTypes.medium2}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
                <TableWithChairs
                    x={380}
                    y={350}
                    id={10}
                    tableType={tableTypes.medium2}
                    isAvaible={true}
                    onClick={handleTableClick}
                />
            </svg>

            {selectedRoom && (
                <div className="info">
                    <h3>{selectedRoom} Details</h3>
                    <p>Information about {selectedRoom}.</p>
                </div>
            )}
        </div>
    );
};

export default FloorPlan;