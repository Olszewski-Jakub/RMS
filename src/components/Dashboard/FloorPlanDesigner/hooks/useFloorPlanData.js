import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import tableService from "../../../../services/table.service";
import wallsService from "../../../../services/walls.service";
import doorService from "../../../../services/door.service";
import windowService from "../../../../services/window.service";
import { tableTypes } from '../../../../constants/tableTypes';

export const useFloorPlanData = () => {
    const [tables, setTables] = useState([]);
    const [walls, setWalls] = useState([]);
    const [doors, setDoors] = useState([]);
    const [windows, setWindows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    fetchTables(),
                    fetchWalls(),
                    fetchDoors(),
                    fetchWindows()
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const fetchTables = async () => {
        try {
            const data = await tableService.getAll();

            const tables = data.map(table => ({
                ...table,
                type: Object.values(tableTypes).find(t => t.name === table.type) || null,
                intId: table.id,
                id: uuidv4()
            }));

            setTables(tables || []);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    const fetchWalls = async () => {
        try {
            const data = await wallsService.getAll();

            const walls = data.map(wall => ({
                ...wall,
                intId: wall.id,
                id: uuidv4()
            }));

            setWalls(walls);
        } catch (error) {
            console.error('Error fetching walls:', error);
        }
    };

    const fetchDoors = async () => {
        try {
            const data = await doorService.getAll();

            const doors = data.map(door => ({
                ...door,
                intId: door.id,
                id: uuidv4()
            }));

            setDoors(doors);
        } catch (error) {
            console.error('Error fetching doors:', error);
        }
    };

    const fetchWindows = async () => {
        try {
            const data = await windowService.getAll();

            const windows = data.map(window => ({
                ...window,
                intId: window.id,
                id: uuidv4()
            }));

            setWindows(windows);
        } catch (error) {
            console.error('Error fetching windows:', error);
        }
    };

    return {
        tables,
        setTables,
        walls,
        setWalls,
        doors,
        setDoors,
        windows,
        setWindows,
        isLoading
    };
};