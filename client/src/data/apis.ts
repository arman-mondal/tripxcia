import { API_URL } from "@/configs/api";

export const SaveFlight=API_URL+"query/flight/save";
export const GetFlightQueries=API_URL+"query/flight/list";
export const ConfirmFlightQuery=API_URL+"query/flight/confirm/";
export const CreateClient=API_URL+"clients/create";
export const GetClients=API_URL+"clients/get";
export const DeleteClient=API_URL+"clients/delete/";
export const UpdateClient=API_URL+"clients/update/";
export const CreateVendor=API_URL+"vendors/create";
export const GetVendors=API_URL+"vendors/get";
export const DeleteVendor=API_URL+"vendors/delete/";
export const UpdateVendor=API_URL+"vendors/update/";
export const GetVendorById=API_URL+"vendors/get/";
export const AuthLoginAPI=API_URL+"auth/login";
export const getAllQueries=API_URL+"query";
