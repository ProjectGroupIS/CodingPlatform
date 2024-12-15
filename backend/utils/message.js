
export function message(res,status,message){
    return res.status(status).json({message:message})
}