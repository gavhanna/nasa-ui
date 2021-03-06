import axios from "axios";

const fetchApod = async (selectedDate) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ROOT}/getAPOD?thumbs=True&date=${selectedDate}`
  );

  return response.data;
};

const fetchArchiveItems = async ({ startDate, endDate }) => {
  console.log("fetchArchiveItems", startDate, endDate);
  const response = await axios.get(
    `${process.env.REACT_APP_API_ROOT}/getAPODArchive?thumbs=True&start_date=${startDate}&end_date=${endDate}`
  );

  return response.data;
};

const apodService = {
  fetchApod,
  fetchArchiveItems,
};

export default apodService;
