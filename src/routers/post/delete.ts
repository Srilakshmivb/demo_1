import {Router, Request, Response, NextFunction} from 'express'
import Post from '../../models/post'
const router = Router()

router.delete('/api/post/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if(!id){
        const error = new Error(" Id is needed for deletion") as CustomError
        error.status = 400
        next(error);
    } 
    try{
        await Post.findOneAndDelete({ _id: id})
    } catch(err){
      next(new Error("Cound not delete the post!"))

    }
    res.status(200).json({ success: true})
})

export { router as deletePostRouter}
