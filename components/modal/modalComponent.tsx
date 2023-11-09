import { IconX, IconFileSpreadsheet, IconFileSad } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ModalComponent = (
    { show, onClose }: { show: boolean, onClose: any }
) => {

    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState<null | string>(null)

    useEffect(() => {
        setLoading(true)
        setErr(null)
        axios.get('http://localhost:8000/api/v1/export/')
            .then(res => {
                if (res.status === 200) {
                    setLoading(false)
                } else {
                    setErr('Ocorreu algum erro ao gerar ficheiro excel')
                }
            }).catch(error => {
                setErr('Ocorreu algum erro ao gerar ficheiro excel')
            })
    }, [show])

    if (!show) return null

    return (
        <div className='bg-black bg-opacity-25 fixed left-0 top-0 right-0 h-full overflow-auto' onClick={onClose}>
            <div className='w-[400px] bg-white rounded-2xl border shadow absolute left-1/2 top-28 -translate-x-1/2' onClick={e => e.stopPropagation()}>
                <div className='flex justify-between items-center border-b p-2'>
                    <div className='text-lg font-medium p-2'>Exportar Lista</div>
                    <button className='text-light p-2 rounded-full hover:bg-[#f6f6f7]' onClick={onClose}><IconX /></button>
                </div>
                <div className='p-4'>
                    {loading && !err && <div>Loading...</div>}
                    {!loading && <div className='flex justify-between items-center'>
                        <div className='flex text-gray-600'><IconFileSpreadsheet className='me-2' /><span>ntizu-export.xlsx</span></div>
                        <Link onClick={onClose} className='bg-blue-600 rounded-lg font-medium text-white px-4 py-2 hover:bg-blue-500' href={'http://localhost:8000/static/ntizu-export.xlsx'}>Baixar</Link>
                    </div>}
                    {err && <div className='flex justify-between items-center text-red-500'><IconFileSad className='me-2' size={50} stroke={1.5} />{err}</div>}
                </div>
            </div>
        </div>
    )
}

export default ModalComponent