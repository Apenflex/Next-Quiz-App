import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
    return (
        <SignUp
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in" 
            afterSignUpUrl="/new-user" 
            redirectUrl="/new-user"
        />
    )
}
export default SignUpPage
