import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import React, { useState } from 'react'
import useUserAction from '../Hook/useUserAction'

export default function CreateNewUser() {
    const [result, setResult]= useState<'ok' | 'ko' | null>(null)
    const { addUser }= useUserAction()
    const handelSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const form = e.target
        const formData= new FormData(form)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        if(!name || !email || !github){
            return setResult('ko')
        }
        addUser({name,email,github})
        setResult('ok')
        formData.reset()
    }
  return (
    <Card>
        <Title> Cretae a New User </Title>
        <form onSubmit={handelSubmit}>
            <TextInput name='name' placeholder='Put your Name here'/>
            <TextInput name='email' placeholder='Put your E-mail here'/>
            <TextInput name='github' placeholder='Put your userName from GitHub here'/>
            <div>
                <Button
                    type='submit'
                    style={{marginTop: '16px'}}
                >
                    Create User
                </Button>
                {result === 'ok' && <Badge color='green'>Succefull Save</Badge>}
                {result === 'ko' && <Badge color='red'>Something date was wrong</Badge>}
            </div>
        </form>

    </Card>
  )
}
