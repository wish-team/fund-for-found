// Using fetch API
const createBrandLocalhost = async (brandData) => {
  try {
    const response = await fetch(
      'https://fund-for-found-y4d1.onrender.com/brand',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include cookies in the request
        credentials: 'include',
        body: JSON.stringify(brandData),
      },
    );

    const result = await response.json();
    console.log('Success:', result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Example usage
const brandData = {
  name: 'Example Brand',
  description: 'This is a test brand',
};

// Call the function
createBrandLocalhost(brandData);
