import { Request, Response } from "express";
import { CreatePostDto, CustomHandleError, UpdatePostDto } from "../../domain";
import { PostService } from "../services";





export class PostController {
   constructor(
      private readonly postService: PostService,
      private readonly handleError: CustomHandleError
   ){}

   public getPosts = async(_req: Request, res: Response) => {
      this.postService.getPosts()
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public getPost = async(req: Request, res: Response) => {
      const {id} = req.params;

      this.postService.getPost( Number(id) )
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public createPost = async(req: Request, res: Response) => {
      const [error, postDto] = CreatePostDto.create({
	 ...req.body,
	 user: req.body.user.id
      });
      if(error) return res.status(400).json({error});
      
      this.postService.createPost(postDto!)
	 .then( resp => res.status(201).json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public updatePost = async(req: Request, res: Response) => {
      const [error, postDto] = UpdatePostDto.create(req.body);
      if(error) return res.status(400).json({error});

      this.postService.updatePost(postDto!)
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public delete = async(req: Request, res: Response) => {
      const {id} = req.params;

      this.postService.deletePost( Number(id) )
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }
}
