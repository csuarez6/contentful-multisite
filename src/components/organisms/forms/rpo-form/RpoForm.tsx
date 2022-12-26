import Icon from "@/components/atoms/icon/Icon";
import { IRpoForm } from "@/lib/interfaces/IForm-cf";
import { useState } from "react";

const RpoForm: React.FC<IRpoForm> = ({
    title,
    subTitle,
    titleForm,
    dataForm
}) => {
    const [account, setAccount] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = () => {
        console.log('send');
    }

    return (
        <div className="md:flex md:flex-row">
            <div className="basis-1/2">
                <form className="max-w-full p-4 flex flex-wrap" onSubmit={handleSubmit}>
                    {titleForm && (
                        <div className="mb-2 w-full">
                            <p className="text-2xl text-blue-dark font-semibold">{titleForm}</p>
                        </div>
                    )}
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-base mb-1">
                            Escribe el número de tu cuenta contrato*
                        </label>
                        <label className="block text-gray-700 text-base mb-2">
                            *(lo encuentras en la parte superior izquierda de tu factura del gas).
                        </label>
                        <input className="border w-full py-2 px-3 text-gray-700 leading-tight " type="text" placeholder="00000-0000"
                            onChange={(event) => setAccount(event.target.value)}
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-base mb-1">
                            Escribe Tu numero de celular para notificarte
                        </label>
                        <input className="border w-full py-2 px-3 text-gray-700 leading-tight " type="text" placeholder="300 2345678"
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 text-base mb-1">
                            Escribe Tu correo electrónico para notificarte
                        </label>
                        <input className="border w-full py-2 px-3 text-gray-700 leading-tight " type="text" placeholder="300 2345678"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <p className="text-gray-700 text-sm">Al dar click en consultar aceptas las políticas de tratamiento de datos de Vanti</p>
                </form>
            </div>
            <div className="basis-1/2 bg-sky-50 rounded-lg">
                <div className="w-full h-full  text-blue-dark text-justify p-8">
                    <div className="flex justify-items-stretch">
                        <Icon
                            icon='check'
                            className="block w-[40px] h-[40px] text-cyan-300"
                            aria-hidden="true"
                        />
                        {title && <p className="text-xl p-1"> {title} </p>}
                    </div>
                    {subTitle && <p className="text-5xl pt-4 pb-6 font-semibold"> {subTitle} </p>}
                    {dataForm && (
                        dataForm.map((item) => {
                            return (
                                <div className="pt-4">
                                    <p className="text-lg font-semibold">{item.name}</p>
                                    <p className="text-lg">{item.value != ''? item.value : '-'}</p>
                                </div>
                            )
                        })
                    )}
                    <div className="p-5">
                        <input type="submit" value="Consulta" className="button button-primary w-full"  />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RpoForm;
