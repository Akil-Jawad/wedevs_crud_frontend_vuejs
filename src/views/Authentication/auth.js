
import Login from '../../components/AuthenticationComponents/Login'
import Register from '../../components/AuthenticationComponents/Register'
import ValidationErrors from "../../components/globals/ValidationErrors"
export default {
    name:"Auth",
    components:{
        Login,
        Register,
        ValidationErrors
    },
    data: () => ({
        dialog: true,
        showLoginSuccessMessage:null,
        showRegistrationSuccessMessage:null,
        showLoginValidatorErrorMessage:null,
        showRegistrationValidatorErrorMessage:null,
        showRegistrationErrorMessage:null,
        showLoginErrorMessage:null,
        alertType:"info",
        tab: 0,
        tabs: [
            {name:"Login", icon:"mdi-account"},
            {name:"Register", icon:"mdi-account-outline"}
        ],
    }),
    methods: {
        initializeMessages(){
            this.showLoginSuccessMessage=null;
            this.showLoginValidatorErrorMessage=null;
            this.showLoginErrorMessage=null;

            this.showRegistrationValidatorErrorMessage=null;
            this.showRegistrationErrorMessage=null;
            this.showRegistrationSuccessMessage=null;
        },
        getMessageFromRegistration(message,type,tab,backend_validator) {
            this.initializeMessages();
            if(type === "success"){
                this.showRegistrationSuccessMessage = message;
                this.alertType = type;
                this.tab = tab;
            }else if(backend_validator && type ==="error"){
                this.showRegistrationValidatorErrorMessage = message;
                this.alertType = type;
                this.tab = tab;
            }else if(!backend_validator && type ==="error"){
                this.showRegistrationErrorMessage = message;
                this.alertType = type;
                this.tab = tab;
            }
            
        },
        getMessageFromLogin(message,type,backend_validator){
            this.initializeMessages();
            if(type === "success"){
                this.showLoginSuccessMessage = message;
                this.alertType = type;
                this.tab = 0;
            }else if(backend_validator && type ==="error"){
                this.showLoginValidatorErrorMessage = message;
                this.alertType = type;
                this.tab = 0;
            }else if(!backend_validator && type ==="error"){
                this.showLoginErrorMessage = message;
                this.alertType = type;
                this.tab = 0;
            }
        }
    }
}