import { Request, Response } from "express";
import { BaseEntity } from "typeorm";

class ContactController extends BaseEntity {
    static contact(req: Request, res: Response) {
        console.log(req.body);
        res.status(200).json({ message: "I'm a litte teapot" });
    }
}
export default ContactController;