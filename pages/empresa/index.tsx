import Link from "next/link"
import { IconChevronLeft } from '@tabler/icons-react'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useState } from "react"
import { enqueueSnackbar } from 'notistack'

type Inputs = {
    nome: string
    email: string
    cell: string
    nuit: string
}

const Empresa = () => {

    const [fields, setFields] = useState<null | string[]>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        axios.post('http://localhost:8000/api/v1/empresa/', { ...data })
            .then((response) => {
                if (response.status === 201) {
                    setFields(null)
                    enqueueSnackbar('Cadastrado com Sucesso', { variant: 'success' })
                } else {
                    enqueueSnackbar('Erro')
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    enqueueSnackbar('Erro')
                } else if (error.response.status === 400) {
                    setFields(Object.keys(error.response.data))
                    enqueueSnackbar('Empresa com este e-mail já existe')
                } else {
                    enqueueSnackbar('Erro')
                }
            })
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-head">Candidato</div>
            <div className="grid gap-3 mt-7 md:mt-3">
                <div>
                    <input
                        type="text"
                        placeholder="Nome Completo"
                        className={`input ${errors.nome ? 'invalid' : 'valid'}`}
                        {...register("nome", {
                            required: 'Campo em branco',
                            maxLength: {
                                value: 150,
                                message: 'Excedeu o limite de 150 caracteres'
                            }
                        })}
                    />
                    {errors.nome && <span className="px-4 text-sm text-red-900 hidden md:block">{errors.nome.message}</span>}
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="exemplo@gmail.com"
                        className={`input ${errors.email || fields?.includes('email') ? 'invalid' : 'valid'}`}
                        {...register("email", {
                            required: 'Campo em branco',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Email invalido',
                            },
                        })}
                    />
                    {errors.email && <span className="px-4 text-sm text-red-900 hidden md:block">{errors.email.message}</span>}
                    {fields?.includes('email') && <span className="px-4 text-sm text-red-900 hidden md:block">Empresa com este e-mail já existe</span>}
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Número de telefone"
                        className={`input ${errors.cell ? 'invalid' : 'valid'}`}
                        {...register("cell", {
                            required: 'Campo em branco',
                            maxLength: {
                                value: 30,
                                message: 'Excedeu o limite de 30 caracteres'
                            }
                        })}
                    />
                    {errors.cell && <span className="px-4 text-sm text-red-900 hidden md:block">{errors.cell.message}</span>}
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="NUIT"
                        className={`input ${errors.nuit ? 'invalid' : 'valid'}`}
                        {...register("nuit", {
                            required: 'Campo em branco',
                            maxLength: {
                                value: 30,
                                message: 'Excedeu o limite de 30 caracteres'
                            }
                        })}
                    />
                    {errors.nuit && <span className="px-4 text-sm text-red-900 hidden md:block">{errors.nuit.message}</span>}
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <Link href={'/'} className="btn back-btn"><IconChevronLeft /> Voltar</Link>
                <button type="submit" className="btn submit-btn">Cadastrar</button>
            </div>
        </form>
    )
}

export default Empresa