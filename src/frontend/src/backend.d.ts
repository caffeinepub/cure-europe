import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    name: string;
    email: string;
}
export interface backendInterface {
    addLead(name: string, email: string): Promise<void>;
    getAllLeads(): Promise<Array<Lead>>;
    getLead(email: string): Promise<Lead>;
}
