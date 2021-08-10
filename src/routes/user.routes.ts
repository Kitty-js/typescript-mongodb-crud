import { Request, Response, Router } from "express";

import User from "../models/User";

class UsersRoutes {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    };

    public async getUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find();
        res.json(users)
    };

    public async getUser(req: Request, res: Response): Promise<void> {
        const user = await User.findOne({ username: req.params.username }).populate('posts');
        res.json(user)
    };

    public async createUser(req: Request, res: Response): Promise<void> {
        const newUser = new User(req.body)
        await newUser.save();
        res.json({ data: newUser });
    };

    public async updateUser(req: Request, res: Response): Promise<void> {
        const { username } = req.params;
        const user = await User.findOneAndUpdate({ username }, req.body, { new: true });
        res.json(user)
    };

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { username } = req.params;
        await User.findOneAndDelete({ username });
        res.json({ "message": "Successfully deleted user!" })
    };

    routes() {
        this.router.get("/", this.getUsers);
        this.router.get("/:username", this.getUser);
        this.router.post("/new_user/", this.createUser);
        this.router.put("/update_user/:username", this.updateUser);
        this.router.delete("/delete_user/:username", this.deleteUser);
    };

};

const usersRoutes = new UsersRoutes();

export default usersRoutes.router;