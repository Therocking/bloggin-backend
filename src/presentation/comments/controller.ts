import { Request, Response } from "express";
import { CreateCommentDto, CustomHandleError, UpdateCommentDto } from "../../domain";
import { CommentService } from "../services";






export class CommentController {
   constructor(
      private readonly commentService: CommentService,
      private readonly handleError: CustomHandleError
   ){}

   public getComments = async(_req: Request, res: Response) => {
      this.commentService.getComments()
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public getCommment = async(req: Request, res: Response) => {
      const { id } = req.params;

      this.commentService.getComment( Number(id) )
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public getAnswers = async(req: Request, res: Response) => {
      const {id} = req.params;

      this.commentService.getAnswers( Number(id) )
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public createComment = async(req: Request, res: Response) => {
      const [error, commentDto] = CreateCommentDto.create({
	 ...req.body,
	 user: req.body.user,
	 post: req.params.id
      });
      if(error) return res.status(400).json({error});

      this.commentService.createComment(commentDto!)
	 .then( resp => res.status(201).json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public updateComment = async(req: Request, res: Response) => {
      const [error, commentDto] = UpdateCommentDto.create(req.body);
      if(error) return res.status(400).json({error});

      this.commentService.updateComment(commentDto!)
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }

   public deleteComment = async(req: Request, res: Response) => {
      const {id} = req.params;

      this.commentService.deleteComment( Number(id) )
	 .then( resp => res.json(resp) )
	 .catch( error => this.handleError.handleError(error, res) )
   }
}
