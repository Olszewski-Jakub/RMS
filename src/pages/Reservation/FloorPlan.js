import React, { useState, useEffect } from "react";
import { 
  FloorPlanContainer, 
  Table, 
  Chair,
  ErrorMessage,
  Legend,
  LegendItem
} from "./ReserveTableStyle";

const FloorPlan = ({ freeTables, onTableSelect, loading, error }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Adjust scale based on screen width
      if (window.innerWidth <= 480) {
        setScale(0.6);
      } else if (window.innerWidth <= 768) {
        setScale(0.75);
      } else {
        setScale(1);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rectangleTable = { width: 120, height: 60 };
  const squareTable = { width: 60, height: 60 };
  const longTable = { width: 60, height: 120 };

  const getChairPositions = (tableType, tableX, tableY) => {
    const positions = [];
    
    if (tableType === "rectangle") {
      for (let i = 0; i < 3; i++) {
        positions.push({ 
          x: tableX + 15 + (rectangleTable.width - 30) * i / 2, 
          y: tableY - 30 
        });
      }
      
      for (let i = 0; i < 3; i++) {
        positions.push({ 
          x: tableX + 15 + (rectangleTable.width - 30) * i / 2, 
          y: tableY + rectangleTable.height + 10 
        });
      }
      
      positions.push({ x: tableX - 30, y: tableY + rectangleTable.height / 2 });
      
      positions.push({ 
        x: tableX + rectangleTable.width + 10, 
        y: tableY + rectangleTable.height / 2 
      });
    } else if (tableType === "square") {
      positions.push({ x: tableX + squareTable.width / 2, y: tableY - 30 }); // top
      positions.push({ x: tableX + squareTable.width / 2, y: tableY + squareTable.height + 10 }); // bottom
      positions.push({ x: tableX - 30, y: tableY + squareTable.height / 2 }); // left
      positions.push({ x: tableX + squareTable.width + 10, y: tableY + squareTable.height / 2 }); // right
    } else if (tableType === "long") {
      positions.push({ x: tableX - 30, y: tableY + longTable.height / 4 }); // left top
      positions.push({ x: tableX - 30, y: tableY + longTable.height * 3 / 4 }); // left bottom
      positions.push({ x: tableX + longTable.width + 10, y: tableY + longTable.height / 4 }); // right top
      positions.push({ x: tableX + longTable.width + 10, y: tableY + longTable.height * 3 / 4 }); // right bottom
      positions.push({ x: tableX + longTable.width / 2, y: tableY - 30 }); // top
      positions.push({ x: tableX + longTable.width / 2, y: tableY + longTable.height + 10 }); // bottom
    }
    
    return positions;
  };

  const tables = [
    { id: 1, type: "square", x: 50, y: 70 },
    { id: 2, type: "rectangle", x: 200, y: 70 },
    { id: 3, type: "long", x: 400, y: 70 },
    { id: 4, type: "square", x: 50, y: 240 },
    { id: 5, type: "rectangle", x: 200, y: 240 },
    { id: 6, type: "rectangle", x: 200, y: 410 },
    { id: 7, type: "square", x: 50, y: 410 },
    { id: 8, type: "square", x: 50, y: 580 },
    { id: 9, type: "rectangle", x: 200, y: 580 },
    { id: 10, type: "long", x: 400, y: 580 }
  ];

  const getTableDimensions = (type) => {
    switch(type) {
      case "rectangle": return rectangleTable;
      case "square": return squareTable;
      case "long": return longTable;
      default: return squareTable;
    }
  };

  return (
    <FloorPlanContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <div 
        className="floor-plan-wrapper"
        style={{ 
          position: "relative", 
          height: isMobile ? "500px" : "750px", 
          width: "100%",
          overflow: "auto",
          touchAction: "pan-x pan-y" // Improved touch handling
        }}
      >
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: "500px",
          height: "750px",
          position: "relative"
        }}>
          {tables.map((table) => {
            const { id, type, x, y } = table;
            const { width, height } = getTableDimensions(type);
            const tableData = freeTables.find(t => t.id === id) || { id, isActive: false };
            
            const chairPositions = getChairPositions(type, x, y);
            
            return (
              <React.Fragment key={id}>
                <Table
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                  }}
                  isActive={tableData.isActive}
                  tableId={id}
                  onClick={() => tableData.isActive && !loading && onTableSelect(id)}
                  isMobile={isMobile}
                />
                
                {/* Draw chairs */}
                {chairPositions.map((position, index) => (
                  <Chair
                    key={`${id}-chair-${index}`}
                    style={{
                      position: "absolute",
                      left: position.x,
                      top: position.y,
                      transform: "translate(-50%, -50%)",
                      width: isMobile ? "15px" : "20px",
                      height: isMobile ? "15px" : "20px",
                    }}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </div>

        <Legend isMobile={isMobile}>
          <LegendItem>
            <div style={{ width: "20px", height: "20px", backgroundColor: "#8cb369", borderRadius: "4px" }}></div>
            <span>Available</span>
          </LegendItem>
          <LegendItem>
            <div style={{ width: "20px", height: "20px", backgroundColor: "#718096", borderRadius: "4px" }}></div>
            <span>Reserved</span>
          </LegendItem>
        </Legend>

        {/* Loading overlay */}
        {loading && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            fontSize: isMobile ? "14px" : "16px"
          }}>
            <div style={{
              padding: "10px 20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
            }}>
              Loading...
            </div>
          </div>
        )}
      </div>
    </FloorPlanContainer>
  );
};

export default FloorPlan;