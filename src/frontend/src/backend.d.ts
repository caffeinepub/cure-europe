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
export interface Product {
    id: string;
    tagline: string;
    name: string;
    imageUrl: string;
    category: string;
    badge: string;
    price: string;
}
export interface backendInterface {
    addLead(name: string, email: string): Promise<void>;
    addProduct(id: string, name: string, tagline: string, price: string, badge: string, category: string, imageUrl: string): Promise<void>;
    adminLogin(password: string): Promise<boolean>;
    deleteProduct(id: string): Promise<boolean>;
    getAllLeads(): Promise<Array<Lead>>;
    getAllProducts(): Promise<Array<Product>>;
    getLead(email: string): Promise<Lead>;
    getProduct(id: string): Promise<Product | null>;
    seedProducts(newProducts: Array<Product>): Promise<boolean>;
    updateProduct(id: string, name: string, tagline: string, price: string, badge: string, category: string, imageUrl: string): Promise<boolean>;
}
