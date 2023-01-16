import { ITextBox } from './TextBox.mocks';

const Textbox: React.FC<ITextBox> = ({
    id,
    name,
    label,
    value,
    placeholder,
    onChange,
}) => {
    return (
        <div className="w-full grid gap-6">
            <label className="block text-grey-30 text-lg">
                {label}
            </label>
            <input
                className="border w-full py-2 px-3 text-gray-700 leading-tight"
                id={`${id}`}
                name={name}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default Textbox;
