import { Leads } from "@/types";
import axios from "axios";

export const postLeads = async (payload: Leads) => {
  const response = await axios.post("/api/leads", payload);
  return response;
};
