 'use server'
import { Data } from "@/types/Data";
import axios from "axios"

export const getData = async (type:Data) => {
 
  const url = process.env.URL_KEY;
  if (url) {
      
      const response = await axios.get(`${url}/${type}`);
      return response.data;
 }
}