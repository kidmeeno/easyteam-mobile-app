// src/services/dataFetch.js
export const fetchEmployeesAndLocations = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/employees-locations`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data;  // Expected data: { employees, locations }
      } else {
        throw new Error('Failed to fetch employees and locations');
      }
    } catch (error) {
      console.error('Data fetch error:', error);
      throw error;
    }
  };
  