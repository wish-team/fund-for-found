import React, { type ChangeEvent } from "react";

type TextArea = {
    title?: string;
    description?: string;
    name: string;
    placeHolder: string;
    rows?: number;
    cols?: number;
    required?: boolean;
    disabled?: boolean;
    value: string;
    rest?: any;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({
    title,
    description,
    name,
    placeHolder,
    rows,
    cols,
    required,
    disabled,
    value,
    onChange,
    ...rest
}: TextArea) {
    return (
        <div>
            {title ? <h6 className="bold text-lg">{title}</h6> : null}
            {description ? (
                <label
                    htmlFor="objective_input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    {description}
                </label>
            ) : null}
            <textarea
                name={name}
                rows={rows}
                cols={cols}
                value={value}
                className="block w-full appearance-none border-0 border-2 border-gray-600 bg-transparent p-2 px-2.5 py-2.5 text-sm text-white focus:border-white focus:outline-none focus:ring-0"
                placeholder={placeHolder}
                onChange={onChange}
                {...rest}
            ></textarea>
        </div>
    );
}
