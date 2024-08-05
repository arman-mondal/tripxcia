import { Request,Response } from "express";

import { VendorModel } from "./vendor.model";


export const createVendor=async(req:Request,res:Response)=>{
    try{
        const vendor=await VendorModel.create(req.body);
        return res.status(201).send(vendor);
    }catch(err){
        return res.status(500).send(err);
    }
}

export const getVendors=async(req:Request,res:Response)=>{
    try{
        const vendors=await VendorModel.find().lean().exec();
        return res.status(200).send(vendors);
    }catch(err){
        return res.status(500).send(err);
    }
}

export const UpdateVendor=async(req:Request,res:Response)=>{
    try{
        const vendor=await VendorModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).send(vendor);
    }catch(err){
        return res.status(500).send
    }
}

export const DeleteVendor=async(req:Request,res:Response)=>{
    try{
        await VendorModel.findByIdAndDelete(req.params.id);
        return res.status(200).send('Vendor Deleted Successfully');
    }catch(err){
        return res.status(500).send(err);
    }
}

export const getVendorById=async(req:Request,res:Response)=>{
    try{
        const vendor=await VendorModel.findById(req.params.id).lean().exec();
        return res.status(200).send(vendor);
    }catch(err){
        return res.status(500).send
    }
}

