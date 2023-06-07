import { getRequest } from "./utils";

// const BASE_URL = "/fetch_contract";

export const getContracts = () => getRequest(`/upgraded_contracts`);