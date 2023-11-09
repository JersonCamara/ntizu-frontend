import HeaderComponent from "../header/headerComponent"

const LayoutComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <HeaderComponent />
            <main>
                <div className="text-center w-[450px] mx-auto mb-12 md:w-[700px] mt-16">
                    <div className="text-white font-type-2 text-2xl md:text-3xl mb-2">QUER TRABALHAR FORA?</div>
                    {/* <div>QUER EMPREGO?</div> */}
                    <div className="text-3xl md:text-4xl font-type-3 text-green-color font-bold mb-2">É só clicar!</div>
                    <p className="text-white text-sm md:text-base">Com a Ntizu pode aceder vagas de emprego locais e intenacionais. <br className="hidden md:block" /> Recrutamento nao é uma batalha sem fim. <br /> <span className="font-bold">Cadastre-se hoje e deixe-nos agilizar o processo para si!</span></p>
                </div>
                <div className="w-[400px] mx-auto">{children}</div>
            </main>
        </>
    )
}

export default LayoutComponent