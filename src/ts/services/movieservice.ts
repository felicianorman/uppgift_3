import { IOmdbResponse } from "../models/IOmdbResponse";
import { IMovie } from "../models/Movie";
import axios from "axios";

//Hämtar API
export const getData = async (searchText: string): Promise<IMovie[]> => {
  return axios
    .get<IOmdbResponse>("http://omdbapi.com/?apikey=416ed51a&s=" + searchText)
    .then((data) => {
      return data.data.Search;
    })
    .catch(() => {
      return [];
    });
};
