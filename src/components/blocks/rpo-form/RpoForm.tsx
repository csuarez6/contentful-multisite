import { useState } from "react";
import RpoForm from '@/components/organisms/forms/rpo-form/RpoForm';
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const RpoFormBlock: React.FC<IPromoBlock> = ({ pretitle, title, description, listedForm, blockId, sysId }) => {
  const [account, setAccount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {
    console.log('send', { account, phone, email });
  };
  return (
    <section id={blockId ? blockId : sysId} className="section grid gap-9">
      {(title || description) &&
        <div className="grid gap-9 text-center">
          <h2 className="text-blue-dark">{title}</h2>
          <div className="text-blue-dark">{documentToReactComponents(description?.json)}</div>
        </div>
      }
      
      <div className="md:flex md:flex-row">
        <div className="basis-1/2">
          <form className="max-w-full p-4 flex flex-wrap" onSubmit={handleSubmit}>
            {pretitle && (
              <div className="mb-2 w-full">
                <p className="text-2xl text-blue-dark font-semibold">{pretitle}</p>
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
              <input className="border w-full py-2 px-3 text-gray-700 leading-tight " type="text" placeholder="1010101010"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <p className="text-gray-700 text-sm">Al dar click en consultar aceptas las políticas de tratamiento de datos de Vanti</p>
          </form>
        </div>
        <div className="basis-1/2 bg-sky-50 rounded-lg">
          {listedForm && <RpoForm {...listedForm} />}
        </div>
      </div>
    </section>
  );
};

export default RpoFormBlock;
