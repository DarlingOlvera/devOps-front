import { defineRule,configure } from "vee-validate";
import { email, required } from "@vee-validate/rules";

configure({
    generateMessage:(context) =>{
        const messages = {
            required:`El campo ${context.field} es requerido`,
            email:`El campo ${context.field} no es un email valido`
        };

        const message = messages[context.rule.name]
            ? messages[context.rule.name]
            :`El campo ${context.field} no es valido`
        return message
    },

    validateOnBlur:true,
    validateOnChange:true,
    validateOnInput:false,
    validateOnModelUpdate:true
})

defineRule('required',required)
defineRule('email',email)

export default{

}
