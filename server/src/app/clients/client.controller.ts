import { Request,Response } from "express";
import { ClientModel } from "./clients.model";

export const createClient = async (req: Request, res: Response) => {
    try {
        const client = new ClientModel(req.body);
        await client.save();
        res.status(201).send(client);
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error in creating client" });
    }
}


export const getClients = async (req: Request, res: Response) => {
    try {
        const clients = await ClientModel.find({});
        res.status(200).json({
            result: clients,

        });
    } catch (error) {
        res.status(500).send({ message: "Error in fetching clients" });
    }
}

export const DeleteClient = async (req: Request, res: Response) => {
    try {
        const client = await ClientModel.findByIdAndDelete(req.params.id);
        if (client) {
            return res.status(200).send("The client is deleted");
        }
        res.status(404).send("Client not found");
    } catch (error) {
        res.status(500).send({ message: "Error in deleting client" });
    }
}

export const UpdateClient = async (req: Request, res: Response) => {
    try {
        const client = await ClientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (client) {
            return res.status(200).send(client);
        }
        res.status(404).send("Client not found");
    } catch (error) {
        res.status(500).send({ message: "Error in updating client" });
    }
}
