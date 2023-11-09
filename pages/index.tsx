import { Montserrat } from 'next/font/google'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
    return (
        <div className='flex justify-between px-4 md:px-0'>
            <Link className='btn-main' href={'/candidato'}>CANDIDATO</Link>
            <Link className='btn-main' href={'/empresa'}>EMPRESA</Link>
        </div>
    )
}
