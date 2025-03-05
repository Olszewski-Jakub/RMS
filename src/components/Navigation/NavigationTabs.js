const NavigationTabs = ({ currentPage, handleCurrentPage, isMobile }) => {
    const menuItems = ["Home", "Dashboard", "Reservation", "Menu", "Location"];

    return (
        <div className={isMobile ? "mobile-header-center" : "header-center"}>
            {menuItems.map((item) => (
                <h3
                    key={item}
                    className={isMobile ? "mobile-header-btn" : "header-btn"}
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

export default NavigationTabs;