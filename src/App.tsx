import { Button } from "@/components/ui/button"
import { Toaster, toast } from "sonner"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

export function App() {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const [isRegister, setisRegister] = useState(false)

  const register = async () => {
    const res = await fetch('https://api.freeapi.app/api/v1/users/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
    const data = await res.json()
    console.log(data)
    if (res.status === 200) {
      toast.success("Account created!")
    } else {
      toast.error("Failed!")
    }
  }
  const login = async () => {
    const res = await fetch('https://api.freeapi.app/api/v1/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
    const data = await res.json()
    console.log(data)
    if (res.status === 200) {
      toast.success("Logged in successfully!")
    } else {
      toast.error("Failed!")
    }
  }

  const toggleMode = () => {
    setisRegister(!isRegister)

    setusername('')
    setpassword('')
    setemail('')
  }



  return (
    <div className="p-6 flex items-center justify-center min-h-screen">
      <Toaster />
      {/* <Button className="mt-2" onClick={register}>Register</Button> */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{!isRegister ? 'Login' : 'Register'}</CardTitle>
          <CardAction>
            <Button variant="link" className="text-chart-1" onClick={toggleMode}>
              {isRegister ? 'Login' : 'Register'}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <FieldSet className="w-full max-w-xs">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <FieldDescription>
                  {!isRegister ? null : 'Choose a unique username for your account.'}
                </FieldDescription>
                <Input id="username" value={username} type="text" placeholder="krrish" onChange={(e) => { setusername(e.target.value) }} />
              </Field>

              {/* For Register im adding email field */}
              {
                isRegister ?
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" value={email} type="email" placeholder="krrish@leafvillage.com" onChange={(e) => { setemail(e.target.value) }} />
                  </Field>
                  :
                  null
              }


              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                <Input id="password" value={password} type="password" placeholder="password" onChange={(e) => { setpassword(e.target.value) }} />
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {!isRegister ? <Button type="submit" className="w-full" onClick={login}>
            Login
          </Button> : <Button type="submit" className="w-full" onClick={register}>
            Register
          </Button>}
        </CardFooter>
      </Card>
    </div>
  )
}

export default App