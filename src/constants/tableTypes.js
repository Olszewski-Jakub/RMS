// tableTypes.js
export const tableTypes = {
    // SMALL SQUARE TABLES (40x40)
    squareEmpty: {
        name: 'Square Empty',
        width: 40,
        height: 40,
        chairsTop: 0,
        chairsBottom: 0,
        chairsLeft: 0,
        chairsRight: 0
    },

    // Single-chair tables
    squareSingleNorth: {
        name: 'Square Single North',
        width: 40,
        height: 40,
        chairsTop: 1,
        chairsBottom: 0,
        chairsLeft: 0,
        chairsRight: 0
    },
    squareSingleSouth: {
        name: 'Square Single South',
        width: 40,
        height: 40,
        chairsTop: 0,
        chairsBottom: 1,
        chairsLeft: 0,
        chairsRight: 0
    },
    squareSingleWest: {
        name: 'Square Single West',
        width: 40,
        height: 40,
        chairsTop: 0,
        chairsBottom: 0,
        chairsLeft: 1,
        chairsRight: 0
    },
    squareSingleEast: {
        name: 'Square Single East',
        width: 40,
        height: 40,
        chairsTop: 0,
        chairsBottom: 0,
        chairsLeft: 0,
        chairsRight: 1
    },

    // Two-chair tables
    squareNorthSouth: {
        name: 'Square North South',
        width: 40,
        height: 40,
        chairsTop: 1,
        chairsBottom: 1,
        chairsLeft: 0,
        chairsRight: 0
    },
    squareEastWest: {
        name: 'Square East West',
        width: 40,
        height: 40,
        chairsTop: 0,
        chairsBottom: 0,
        chairsLeft: 1,
        chairsRight: 1
    },
    squareCornerNW: {
        name: 'Square Corner NW',
        width: 40,
        height: 40,
        chairsTop: 1,
        chairsBottom: 0,
        chairsLeft: 1,
        chairsRight: 0
    },
    squareCornerNE: {
        name: 'Square Corner NE',
        width: 40,
        height: 40,
        chairsTop: 1,
        chairsBottom: 0,
        chairsLeft: 0,
        chairsRight: 1
    },
    squareCornerSW: {
        name: 'Square Corner SW',
        width: 40,
        height: 40,
        chairsTop: 0,
        chairsBottom: 1,
        chairsLeft: 1,
        chairsRight: 0
    },
    squareCornerSE: {
        name: 'Square Corner SE',
        width: 40,
        height: 40,
        chairsTop: 0,
        chairsBottom: 1,
        chairsLeft: 0,
        chairsRight: 1
    },

    // Three-chair tables
    squareThreeSideN: {
        name: 'Square Three Side N',
        width: 40,
        height: 40,
        chairsTop: 1,
        chairsBottom: 0,
        chairsLeft: 1,
        chairsRight: 1
    },
    squareThreeSideS: {
        name: 'Square Three Side S',
        width: 40,
        height: 40,
        chairsTop: 0,
        chairsBottom: 1,
        chairsLeft: 1,
        chairsRight: 1
    },
    squareThreeSideW: {
        name: 'Square Three Side W',
        width: 40,
        height: 40,
        chairsTop: 1,
        chairsBottom: 1,
        chairsLeft: 1,
        chairsRight: 0
    },
    squareThreeSideE: {
        name: 'Square Three Side E',
        width: 40,
        height: 40,
        chairsTop: 1,
        chairsBottom: 1,
        chairsLeft: 0,
        chairsRight: 1
    },

    // Four-chair table
    squareAllSides: {
        name: 'Square All Sides',
        width: 40,
        height: 40,
        chairsTop: 1,
        chairsBottom: 1,
        chairsLeft: 1,
        chairsRight: 1
    },

    // RECTANGULAR TABLES
    // Horizontal rectangle (90x40)
    rectangleHorizontal: {
        name: 'Rectangle Horizontal',
        width: 90,
        height: 40,
        chairsTop: 3,
        chairsBottom: 3,
        chairsLeft: 1,
        chairsRight: 1
    },
    rectangleHorizontalTopBottom: {
        name: 'Rectangle Horizontal Top Bottom',
        width: 90,
        height: 40,
        chairsTop: 3,
        chairsBottom: 3,
        chairsLeft: 0,
        chairsRight: 0
    },
    rectangleHorizontalSides: {
        name: 'Rectangle Horizontal Sides',
        width: 90,
        height: 40,
        chairsTop: 0,
        chairsBottom: 0,
        chairsLeft: 1,
        chairsRight: 1
    },

    // Vertical rectangle (40x90)
    rectangleVertical: {
        name: 'Rectangle Vertical',
        width: 40,
        height: 90,
        chairsTop: 1,
        chairsBottom: 1,
        chairsLeft: 3,
        chairsRight: 3
    },
    rectangleVerticalTopBottom: {
        name: 'Rectangle Vertical Top Bottom',
        width: 40,
        height: 90,
        chairsTop: 1,
        chairsBottom: 1,
        chairsLeft: 0,
        chairsRight: 0
    },
    rectangleVerticalSides: {
        name: 'Rectangle Vertical Sides',
        width: 40,
        height: 90,
        chairsTop: 0,
        chairsBottom: 0,
        chairsLeft: 3,
        chairsRight: 3
    },

    // LARGE TABLES
    large2x2: {
        name: 'Large 2x2',
        width: 100,
        height: 60,
        chairsTop: 2,
        chairsBottom: 2,
        chairsLeft: 2,
        chairsRight: 2
    },
    large3x2: {
        name: 'Large 3x2',
        width: 120,
        height: 60,
        chairsTop: 3,
        chairsBottom: 3,
        chairsLeft: 2,
        chairsRight: 2
    },
    largeRound4: {
        name: 'Large Round 4',
        width: 80,
        height: 80,
        chairsTop: 1,
        chairsBottom: 1,
        chairsLeft: 1,
        chairsRight: 1,
        isRound: true
    },
    largeRound6: {
        name: 'Large Round 6',
        width: 100,
        height: 100,
        chairsTop: 2,
        chairsBottom: 2,
        chairsLeft: 1,
        chairsRight: 1,
        isRound: true
    },
    largeRound8: {
        name: 'Large Round 8',
        width: 120,
        height: 120,
        chairsTop: 2,
        chairsBottom: 2,
        chairsLeft: 2,
        chairsRight: 2,
        isRound: true
    },

    // CONFERENCE TABLES
    conferenceSmall: {
        name: 'Conference Small',
        width: 120,
        height: 60,
        chairsTop: 3,
        chairsBottom: 3,
        chairsLeft: 0,
        chairsRight: 0
    },
    conferenceMedium: {
        name: 'Conference Medium',
        width: 180,
        height: 60,
        chairsTop: 5,
        chairsBottom: 5,
        chairsLeft: 0,
        chairsRight: 0
    },
    conferenceLarge: {
        name: 'Conference Large',
        width: 240,
        height: 80,
        chairsTop: 7,
        chairsBottom: 7,
        chairsLeft: 1,
        chairsRight: 1
    },

    // BOOTH/BANQUET TABLES
    boothSmall: {
        name: 'Booth Small',
        width: 100,
        height: 40,
        chairsTop: 0,
        chairsBottom: 3,
        chairsLeft: 0,
        chairsRight: 0
    },
    boothMedium: {
        name: 'Booth Medium',
        width: 120,
        height: 40,
        chairsTop: 0,
        chairsBottom: 4,
        chairsLeft: 0,
        chairsRight: 0
    },
    banquetLong: {
        name: 'Banquet Long',
        width: 200,
        height: 60,
        chairsTop: 6,
        chairsBottom: 6,
        chairsLeft: 0,
        chairsRight: 0
    },
    banquetCorner: {
        name: 'Banquet Corner',
        width: 120,
        height: 120,
        chairsTop: 3,
        chairsBottom: 0,
        chairsLeft: 3,
        chairsRight: 0
    }
};

// For backward compatibility, ensure all old table references still work
const backwardCompatibility = {
    small1: 'squareEmpty',
    small2: 'squareSingleNorth',
    small3: 'squareSingleSouth',
    small4: 'squareSingleWest',
    small5: 'squareSingleEast',
    small6: 'squareNorthSouth',
    small7: 'squareCornerNW',
    small8: 'squareCornerNE',
    small9: 'squareCornerSW',
    small10: 'squareCornerSE',
    small11: 'squareEastWest',
    small12: 'squareThreeSideW',
    small13: 'squareThreeSideE',
    small14: 'squareThreeSideN',
    small15: 'squareThreeSideS',
    small16: 'squareAllSides',
    medium1: 'rectangleHorizontal',
    medium2: 'rectangleVertical',
    large8: 'large2x2'
};

// Add backward compatibility layer
Object.entries(backwardCompatibility).forEach(([oldKey, newKey]) => {
    if (!tableTypes[oldKey] && tableTypes[newKey]) {
        Object.defineProperty(tableTypes, oldKey, {
            get: function() { return tableTypes[newKey]; }
        });
    }
});

export default tableTypes;