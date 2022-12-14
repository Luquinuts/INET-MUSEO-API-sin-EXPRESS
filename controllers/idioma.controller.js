import conexion from "../db/db.js";

export const IdiomaRegister = async(req, res) =>{
    try {
        /************************************************************/
        await conexion.query("INSERT INTO `idioma`(`idioma`) VALUES (?)",
        {
            replacements: [req.body.idioma],
        });
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end("\n");
        /************************************************************/
    } catch (error) {
        console.log(error.message);
    }
}


export const listarIdioma = async(req,res)=>{
    try {
        const [response]= await conexion.query("SELECT `idIdioma`, `idioma` FROM `idioma` WHERE `estado`=1");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end("\n");
        console.log(JSON.stringify(response, null,1))
    } catch (error) {
        console.log(error.message);
    }
}

export const cambiarEstadoIdioma = async(req, res) =>{
    try{
    var IdIdioma = req.params.idIdioma;
    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT  `estado` FROM `idioma` WHERE `idIdioma`=(?)",
            {
                replacements: [IdIdioma],
            });
            estado = response[0].estado;
            if(estado == 0){
                estado = 1;
            } else {
                estado = 0;
            }
        } catch (error) {
            console.log(error.message);
        }
        /************************************************************/
    
    await conexion.query("UPDATE `idioma` SET `estado`=(?) WHERE `idIdioma`=(?) ",
    {
        replacements: [[estado], [IdIdioma]],
    });
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200);
    res.end("\n");
    
    }
    catch (error) {
    console.log(error.message);
    }
}