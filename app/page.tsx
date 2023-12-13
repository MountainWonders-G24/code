import Image from 'next/image'
import { Button } from 'antd'
import Link from 'next/link'
export default function Home() {
  return (
    
    <div>
      <h1>Home Page</h1>
      <Button href="/auth/register" type='primary' htmlType='submit' block>
        Register
      </Button>
      <Link href="/auth/login" className='text-black'>
        Already have an account? Login
      </Link>
    </div>


  )
}
