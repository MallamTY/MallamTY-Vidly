module.exports = function asyncMiddleware(handler){
    return async (req, res, next) =>{
        try{
            return await handler(req, res)
        }
        catch(ex)
        {
            next(ex)
        }
    }
   
}