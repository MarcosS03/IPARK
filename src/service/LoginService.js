import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import DAOService from "./DAOService";

class LoginService {

    constructor() {
        this.auth = getAuth();
    }

    async login(email, senha) {
        try {
            const userCredencial = await signInWithEmailAndPassword(this.auth, email, senha);
            return userCredencial.user;
        } catch(error) {
            console.log('erro ao realizar login: ', error.message);
            throw error;
        }
    }

    async createUser(object, email, senha) {
        try {
            const usuarioAtual = this.auth.currentUser;

            const userCredencial = await createUserWithEmailAndPassword(this.auth, email, senha);

            const dao = new DAOService('dadosUsuario');

            object.idUsuario = userCredencial.user.uid;

            await dao.insert( { object } );

            await signOut(this.auth);

            if (usuarioAtual) {
                const credential = usuarioAtual; // Pode usar usuarioAtual.reload() para garantir sessão ativa
                await signInWithCredential(this.auth, credential);
            }
            return userCredencial;


        } catch(error) {
            console.log('Erro ao criar usuário', error.message);
            throw error;
        }
    }


    async recoverPassword(email) {
        try {
            await sendPasswordResetEmail(this.auth. email);
        } catch(error) {
            throw error;
        }
    }
}

export default LoginService;