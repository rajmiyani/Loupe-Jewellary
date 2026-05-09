import React, { createContext, useContext, useState } from 'react';

const AdminSearchContext = createContext({
    searchQuery: '',
    setSearchQuery: () => { },
});

export const AdminSearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <AdminSearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </AdminSearchContext.Provider>
    );
};

export const useAdminSearch = () => useContext(AdminSearchContext);
