const validateRequired=(fields,body,res) => {
    for(let field of fields)
    {
        if(!body[field])
        {
            res.status(400);
            throw new Error(`${field} is not filled`);
        }
    }
};
module.exports=validateRequired