//Validation
const Joi = require('@hapi/joi');

//register validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data);
};


const loginValidation = data => {
    const schema = Joi.object({     
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data);
};

//post validation
const postValidation = data => {
    const schema = Joi.object({
        author: Joi.string()
        .min(6)
        .required(),
        title: Joi.string()
        .min(6)
        .required()
        ,
        content: Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data);
};


//message validation
const messageValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
        .min(6)
        .required(),
        subject: Joi.string()
        .min(6)
        .required()
        ,
        content: Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data);
};







module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation  = postValidation;
module.exports.messageValidation = messageValidation;