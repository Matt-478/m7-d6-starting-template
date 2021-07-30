export const addToFav = (company) => ({
  type: "ADD_TO_FAV",
  payload: company,
});

export const removeFromFav = (company) => ({
  type: "REMOVE_FROM_FAV",
  payload: company,
});

export const fetchJobs = (url, query) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch(url + query);
      if (resp.ok) {
        const { jobs } = await resp.json();
        dispatch({
          type: "FETCH_JOBS",
          payload: jobs,
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
