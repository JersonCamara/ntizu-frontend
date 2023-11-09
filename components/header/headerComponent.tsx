import { useState } from 'react'
import Image from "next/image"
import Logo from '@/public/logotipoHorizontal.png'
import { IconFileSpreadsheet } from "@tabler/icons-react"
import ModalComponent from "../modal/modalComponent"

const HeaderComponent = () => {

    const [show, setShow] = useState(false)

    const expertExcel = () => {
        setShow(true)
    }

    return (
        <>
            <div className="header-bg flex justify-between items-center py-1">
                <Image src={Logo} alt="Logo" />
                <button
                    className="flex gap-2 items-center font-medium bg-white py-2 px-4 rounded me-16"
                    onClick={expertExcel}
                >
                    <IconFileSpreadsheet />
                    <span className="hidden md:block">Excel</span>
                </button>
            </div>

            {/* modalComponent */}
            <ModalComponent show={show} onClose={() => setShow(false)} />
        </>
    )
}

export default HeaderComponent