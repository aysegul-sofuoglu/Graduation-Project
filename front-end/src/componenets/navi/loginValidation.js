function Validation(values){


  
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.mail === ""){
        error.mail ="İsim boş"
    }else if(!email_pattern.test(values.mail)){
        error.mail ="mail eşleşmedi"
    }else{
        error.mail=""
    }

    if(values.password === ""){
        error.password = "şifre boş"
    }else if(!password_pattern.test(values.password)){
        error.password = "şifre eşleşmedi"
    }else{
        error.password =""
    }
    return error;


}
export default Validation

