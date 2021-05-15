const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') =>{

    return new Promise((resolve, reject) => {

        const paylod = {uid};

        jwt.sign(paylod, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err,token) =>{
            if(err){
                console.log(err);
                reject('No se pudo generar el toekn');
            }
            resolve(token);
        })

    })

}


module.exports = {
    generarJWT
}