import React, { useState } from 'react';

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '20px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px'
    },
    tableHeader: {
        backgroundColor: '#f4f4f4',
        borderBottom: '1px solid #ddd',
        textAlign: 'left',
        padding: '12px'
    },
    tableRow: {
        borderBottom: '1px solid #ddd'
    },
    tableCell: {
        padding: '12px',
        textAlign: 'left'
    },
    activeStatus: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '4px'
    },
    inactiveStatus: {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '4px'
    },
    actionButton: {
        padding: '8px 16px',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    addButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%'
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px'
    }
};

const TablesManagement = ({
                              tables = [],
                              handleToggleTableActive = () => {},
                              onAddTable = () => {}
                          }) => {
    const [newTable, setNewTable] = useState({
        name: '',
        capacity: '',
        location: ''
    });
    const [isAddTableDialogOpen, setIsAddTableDialogOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTable(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitNewTable = () => {
        // Validate input
        if (!newTable.name || !newTable.capacity || !newTable.location) {
            alert('Please fill in all fields');
            return;
        }

        // Call the parent component's method to add the table
        onAddTable({
            ...newTable,
            capacity: parseInt(newTable.capacity, 10),
            isActive: true // New tables are typically active by default
        });

        // Reset form and close dialog
        setNewTable({
            name: '',
            capacity: '',
            location: ''
        });
        setIsAddTableDialogOpen(false);
    };

    return (
        <div style={styles.container}>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.tableHeader}>Table ID</th>
                    <th style={styles.tableHeader}>Name</th>
                    <th style={styles.tableHeader}>Capacity</th>
                    <th style={styles.tableHeader}>Location</th>
                    <th style={styles.tableHeader}>Status</th>
                    <th style={styles.tableHeader}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tables.length > 0 ? (
                    tables.map(table => (
                        <tr key={table.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{table.id}</td>
                            <td style={styles.tableCell}>{table.name}</td>
                            <td style={styles.tableCell}>{table.capacity} persons</td>
                            <td style={styles.tableCell}>{table.location}</td>
                            <td style={styles.tableCell}>
                  <span style={table.isActive ? styles.activeStatus : styles.inactiveStatus}>
                    {table.isActive ? 'Active' : 'Inactive'}
                  </span>
                            </td>
                            <td style={styles.tableCell}>
                                <button
                                    style={{
                                        ...styles.actionButton,
                                        backgroundColor: table.isActive ? '#f44336' : '#4CAF50'
                                    }}
                                    onClick={() => handleToggleTableActive(table.id)}
                                >
                                    {table.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" style={{...styles.tableCell, textAlign: 'center'}}>
                            No tables found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <div style={{textAlign: 'right'}}>
                <button
                    style={styles.addButton}
                    onClick={() => setIsAddTableDialogOpen(true)}
                >
                    Add New Table
                </button>
            </div>

            {isAddTableDialogOpen && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Add New Table</h2>
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Table Name"
                                value={newTable.name}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                            <input
                                type="number"
                                name="capacity"
                                placeholder="Capacity"
                                value={newTable.capacity}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={newTable.location}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.buttonGroup}>
                            <button
                                style={{...styles.actionButton, backgroundColor: '#6c757d', marginRight: '10px'}}
                                onClick={() => setIsAddTableDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                style={{...styles.actionButton, backgroundColor: '#007bff'}}
                                onClick={handleSubmitNewTable}
                            >
                                Add Table
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablesManagement;