
import * as yup from 'yup'

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const passwordError = 'use lowercase, uppercase and digits'

const loginSchema = yup.object().shape({
    username:yup.string().max(30).min(5).required(),
    password:yup.string().max(25).min(8).matches(passwordPattern, {message:passwordError}).required()
})

export default loginSchema