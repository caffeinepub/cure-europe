import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductView {
    id: string;
    imageUrls: Array<string>;
    tagline: string;
    name: string;
    imageUrl: string;
    category: string;
    badge: string;
    price: string;
}
export interface Lead {
    name: string;
    email: string;
}
export interface TouchdownGallery {
    images: Array<string>;
    title: string;
}
export interface backendInterface {
    addLead(name: string, email: string): Promise<void>;
    addProduct(id: string, name: string, tagline: string, price: string, badge: string, category: string, imageUrl: string, imageUrlsArray: Array<string>): Promise<void>;
    adminLogin(password: string): Promise<boolean>;
    deleteProduct(id: string): Promise<boolean>;
    getAllLeads(): Promise<Array<Lead>>;
    getAllProducts(): Promise<Array<ProductView>>;
    getLead(email: string): Promise<Lead>;
    getProduct(id: string): Promise<ProductView | null>;
    seedProducts(newProducts: Array<ProductView>): Promise<boolean>;
    updateProduct(id: string, name: string, tagline: string, price: string, badge: string, category: string, imageUrl: string, imageUrlsArray: Array<string>): Promise<boolean>;
    getTouchdownGallery(): Promise<TouchdownGallery>;
    setTouchdownGallery(images: Array<string>, title: string): Promise<void>;
}
