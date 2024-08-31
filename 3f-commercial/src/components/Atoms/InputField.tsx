//TODO

type InputFIeldType = {
    type: "select" | "input";
    required: boolean;
    format: string;
    name: string;
    validator: (e: string) => boolean;
};

// validate input based on name
// from utils import validator
// validatorFunction = validator(format)

export default function InputField({ type }: InputFIeldType) {
    return <div></div>;
}
