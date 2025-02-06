const NavigationTabs = ({ currentPage, handleCurrentPage }) => {
    const menuItems = ["Home", "Dashboard", "Reservation", "Menu", "Location"];

    return (
        <div className="header-center">
            {menuItems.map((item) => (
                <h3
                    key={item}
                    className="header-btn"
                    onClick={() => handleCurrentPage(item)}
                    style={{
                        color: currentPage === item ? "#FF7D05" : "black",
                        borderBottom: currentPage === item ? "3px solid #FF7D05" : "none",
                    }}
                >
                    {item}
                </h3>
            ))}
        </div>
    );
};

export default NavigationTabs