export const products = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      throw new Error('Error fetching data from API');
    }
  };