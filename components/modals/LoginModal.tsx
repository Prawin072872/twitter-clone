import useLoginModal from "@/hooks/useLoginModal"
import {signIn} from 'next-auth/react'
import { useCallback, useState } from "react"
import Input from "../layout/Input"
import Modal from "../layout/Modal"
import useRegisterModal from "@/hooks/useRegisterModal"

const LoginModal = () => {

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isloading,setIsloading] = useState(false)

    
    const onToggle = useCallback(() => {
        if(isloading){
            return
        }
        loginModal.onClose()
        registerModal.onOpen()
    },[isloading,registerModal,loginModal])

    const onSubmit = useCallback(async() => {
        try {
            setIsloading(true)

            await signIn('credentials',{
                email,
                password
            })

            loginModal.onClose()

        } catch(error){
            console.log(error)
            
        } finally {
            setIsloading(false)
        }
    },[loginModal,email,password])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
            placeholder="Email"
            onChange={(e) =>setEmail(e.target.value)}
            value={email}
            disabled={isloading}
            />
            <Input 
            placeholder="Password"
            type="password"
            onChange={(e) =>setPassword(e.target.value)}
            value={password}
            disabled={isloading}
            />

        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>first time using Twitter?
                <span onClick={onToggle} 
                className="
                text-white
                cursor-pointer
                hover:underline
                "> Create an account</span>
            </p>
        </div>
    )


    return(
       <Modal
       disabled={isloading}
       isOpen={loginModal.isOpen}
       title="Login"
       actionLabel="Sign in"
       onClose={loginModal.onClose}
       onSubmit={onSubmit}
       body={bodyContent}
       footer={footerContent}
       />
    )
}

export default LoginModal