export const getValueFromPath = (obj, path) => {
  return path.split(".").reduce((acc, part) => {
    // Check if the part includes an array index, e.g., forecastday[0]
    const match = part.match(/([^\[\]]+)(?:\[(\d+)\])?/); // Matches 'forecastday[0]'

    if (match) {
      const key = match[1]; // e.g., 'forecastday'
      const index = match[2]; // e.g., '0' if it exists

      if (acc && acc[key]) {
        return index !== undefined ? acc[key][index] : acc[key];
      }
    }
    return undefined; // Return undefined if path doesn't exist
  }, obj);
};
