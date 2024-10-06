import {Router, Request, Response, NextFunction} from 'express'
import Comment from '../../models/comment'
import Post from '../../models/post'
const router = Router()

router.delete('/api/comment/:commentId/delete/:postId', async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const { commentId } = req.params;

    if(!commentId || !postId ){
        const error = new Error(" Post Id and Comment Id are needed for deletion") as CustomError
        error.status = 400
        next(error);
    } 
    try{
        await Comment.findOneAndDelete({ _id: commentId})
    } catch(err){
      next(new Error("Cound not delete the comment!"))

    }

    await Post.findOneAndUpdate({ _id: postId }, { $pull: {comments: commentId }})

    res.status(200).json({ success: true})
})

export { router as deleteCommentRouter}
