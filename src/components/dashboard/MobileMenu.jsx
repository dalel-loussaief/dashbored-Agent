import { MdOutlineMenu, MdOutlineNotifications, MdOutlineAccountCircle, MdOutlineSearch, MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import { MdNotificationsActive } from "react-icons/md";

const MobileMenu = () => {
  const { openSidebar } = useContext(SidebarContext);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
      setShowProfileMenu(false);
      setShowNotificationMenu(false);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotificationMenu(false);
  };

  const toggleNotificationMenu = () => {
    setShowNotificationMenu(!showNotificationMenu);
    setShowProfileMenu(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Notification RDV" />
      {/* <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" /> */}
    </Menu>
  );
  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={32} /> {/* Augmenter la taille de l'icône */}
        </button>
      </div>
      
      <div className="navbar-row">
          
{/*        
        <div
          ref={dateRangeRef}
          className={`date-range-wrapper ${
            !showDatePicker ? "hide-date-range" : ""
          }`}
          onClick={handleInputClick}
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            showMonthAndYearPickers={false}
          />
        </div> */}
      </div>
      <style>{`
        .icons-container {
          display: flex;
          align-items: center;
        }

        .icon-wrapper {
          position: relative;
          margin-right: 10px;
        }

        .profile-menu,
        .notification-menu {
          position: absolute;
          top: calc(100% + 5px);
          left: 0;
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 5px 10px;
          border-radius: 5px;
          z-index: 1000;
          display: none;
        }

        .profile-menu ul,
        .notification-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .profile-menu li,
        .notification-menu li {
          cursor: pointer;
          padding: 5px 0;
        }

        .icon-wrapper:hover .profile-menu,
        .icon-wrapper:hover .notification-menu {
          display: block;
        }

        .search-container {
          display: flex;
          align-items: center;
          margin: 0 auto; /* Centrer horizontalement */
        }

        .search-input {
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 200px; /* Ajustez selon vos besoins */
        }
      `}</style>
    </section>
  );
};

export default MobileMenu;
