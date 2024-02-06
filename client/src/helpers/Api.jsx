export const getForecast = async (key) => {
  try {
    const queryParams = new URLSearchParams({
      key: key,
    });
    const response = await fetch(`/api/getForecast?${queryParams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getCurrentCondition = async (key) => {
  try {
    const queryParams = new URLSearchParams({
      key: key,
    });
    const response = await fetch(`/api/getCurrentCondition?${queryParams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getAutocomplete = async (key) => {
  try {
    const queryParams = new URLSearchParams({
      searchedString: key,
    });
    const response = await fetch(`/api/getAutocomplete?${queryParams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
