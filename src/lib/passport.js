const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM USERS WHERE username = ?', username);
    const exist_pac = await pool.query(
        "SELECT USR.id_paciente, PAC.fecha_Salida     "+
        "FROM Users USR                               "+
        "LEFT JOIN Historias_Clinicas HCL             "+
        "ON USR.id_paciente = HCL.identif_paciente    "+
        "LEFT JOIN PACIENTES PAC                      "+
        "ON PAC.id_Hist_Clinica = HCL.id_Hist_Clinica "+
        "WHERE HCL.identif_paciente IS NOT NULL       "+
        "AND PAC.fecha_Salida = '0000-00-00 00:00:00' "+
        "AND USR.username=?;",username
    );
    console.log("exist_Paciente -*****************************************");
    console.log(exist_pac);
    console.log(exist_pac.length);

    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            console.log("exist_Paciente -*****************************************");
            console.log(exist_pac);
            console.log(exist_pac.length);
            if(exist_pac.length > 0 & rows.user_mode == 'ACOMPANANTE'){
                done(null, user, req.flash('success','Bienvenido ' + user.username));
            }else if(exist_pac.length == 0 & rows.user_mode == 'ACOMPANANTE'){
                console.log("exist_pac.length: " + exist_pac.length);
                done(null, user, req.flash('success','Bienvenido ' + user.username + ', tu paciente no está actualmente en UCI'));
            }else {
                done(null, user, req.flash('success','Bienvenido ' + user.username));
            }
        } else {
            done(null, false, req.flash('message','Tu contraseña está incorrecta'));
        }
    } else {
        console.log("No registrado ***********************************************");
        return done(null, false, req.flash('message', 'Tu usuario no está registrado'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    const { name, last_name, no_id, fecha_nac, email, id_paciente } = req.body;
    console.log(email)
    const newUser = {
        username,
        password,
        no_id,
        email
    }
    const usernameVal = await pool.query('SELECT username FROM USERS where username = ?', username);
    const idVal = await pool.query('SELECT * FROM USERS where no_id = ?', no_id);
    const idRol = await pool.query('SELECT EMP.ID_ROL FROM EMPLEADOS EMP WHERE EMP.IDENTIF_EMPLEADO = ?;', no_id)
    
    if (idVal[0]) {
        done(null, false, req.flash('message', 'Ya estas registrado'));
    } else if (usernameVal[0]){
        done(null, false, req.flash('message', 'El nombre de usuario ya está registrado'));
    } else { 
        newUser.password = await helpers.encryptPassword(password);
        console.log(fecha_nac);
        console.log(password);
        if(idRol[0]){
        //await pool.query('INSERT INTO USERS  (username = ?, password = ?) WHERE no_id = ?', [username, newUser.password, no_id]);
            const nombreRol = await pool.query('SELECT ROL.ID_ROL, ROL.NOMBRE_ROL FROM ROLES ROL WHERE ROL.ID_ROL = ?;', idRol[0].ID_ROL)
            console.log(nombreRol[0].NOMBRE_ROL);
            console.log(nombreRol[0].ID_ROL);
            console.log(idRol[0]);
            await pool.query('INSERT INTO USERS (username, password, nombres_Usuario, apellidos_Usuario, no_id, fecha_nac, email, id_rol, user_mode) VALUES (?,?,?,?,?,?,?,?,?)', [username, newUser.password, name, last_name, no_id, fecha_nac, email, nombreRol[0].ID_ROL, nombreRol[0].NOMBRE_ROL]);
        }else{
            await pool.query('INSERT INTO USERS (username, password, nombres_Usuario, apellidos_Usuario, no_id, fecha_nac, email, id_rol, user_mode, id_paciente) VALUES (?,?,?,?,?,?,?,?,?,?)', [username, newUser.password, name, last_name, no_id, fecha_nac, email, '4', 'ACOMPANANTE', id_paciente]);
        }
        const idVal = await pool.query('SELECT * FROM USERS where no_id = ?', no_id);
        newUser.id = idVal[0].id; 
        return done(null, newUser);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM USERS WHERE ID = ?', [id]);
    done(null, rows[0]);
});