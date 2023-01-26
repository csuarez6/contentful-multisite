import Icon from "@/components/atoms/icon/Icon";
import { IRpoForm } from "@/lib/interfaces/IForm-cf";

const RpoForm: React.FC<IRpoForm> = ({
    title,
    subTitle,
    dataForm
}) => {
    return (
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
                dataForm.map((item) => (
                    <div className="pt-4" key={item.name}>
                        <p className="text-lg font-semibold">{item.name}</p>
                        <p className="text-lg">{item.value != '' ? item.value : '-'}</p>
                    </div>
                )
                )
            )}
            <div className="p-5">
                <input type="submit" value="Consulta" className="button button-primary w-full" />
            </div>
        </div>
    );
};

export default RpoForm;
