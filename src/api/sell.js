import { postRequest, getRequest } from "./utils";

// const BASE_URL = "/fetch_contract";

export const getFunctiondetails = (contract_type) => getRequest(`/available_function/${contract_type}`);

export const getBasicData = (contract_type) => getRequest(`/fetch_contract/${contract_type}`);

export const getFunctionData = (contract_type, function_name) => getRequest(`/fetch_contract/${contract_type}/${function_name}`);

export const checkFunction = (contract_type,data) => postRequest(`/check/${contract_type}`, data);

export const deployContract = (contract_type,data) => postRequest(`/deploy/${contract_type}`, data);

export const getFunction = (contract_type,function_name) => getRequest(`/fetch_function/${contract_type}/${function_name}`);

export const deployedContract = (address) => getRequest(`/created_proposal/${address}`);