import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useHref, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from 'react-router-dom';

const Navbar = ({ userInfo, onSearchKoto, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleSearch = () => {
    if (searchQuery) {
      onSearchKoto(searchQuery);
    }
  };
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };
  return (
    
             
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
       <Link to="/dashboard" >
       <h2  className="text-xl font-medium text-black py-2">My Kotoba 言葉 </h2>
               </Link>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
