import { useCallback, type ChangeEvent, type HTMLAttributes } from "react";

type UseSelectOptionsParams<Option> = {
    options: readonly Option[];
    getLabel: (option: Option) => string;
};

function useSelectOptions<Option>({
    options,
    getLabel,
}: UseSelectOptionsParams<Option>) {
    return (
        <>
            {options.map((option, index) => (
                <option key={index} value={index}>
                    {getLabel(option)}
                </option>
            ))}
        </>
    );
}

type UseSelectParams<Option> = {
    selectedOption: Option;
    options: readonly Option[];
    onChange: (option: Option) => void;
};

function useSelect<Option>({
    selectedOption,
    options,
    onChange,
}: UseSelectParams<Option>) {
    const onChangeCallback = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            /**
             * With the TypeScript noUncheckedIndexedAccess flag enabled
             * the type will be “Option | undefined”!
             */
            const selectedOption = options[event.currentTarget.selectedIndex];

            if (selectedOption !== undefined) {
                /**
                 * Note we must check explicitly for undefined, as falsy values
                 * like 0, or false can be in the options array!
                 */
                onChange(selectedOption);
            }
        },
        [options, onChange],
    );

    return {
        value: options.indexOf(selectedOption),
        onChange: onChangeCallback,
    };
}

export default function Select<Option>({
    selectedOption,
    options,
    onChange,
    getLabel,
}: UseSelectParams<Option> & UseSelectOptionsParams<Option>) {
    const selectProps = useSelect({ selectedOption, options, onChange });
    const selectOptions = useSelectOptions({ options, getLabel });

    return <select {...selectProps}>{selectOptions}</select>;
}

// API:
// const options = [true, false] as const;
// const getLabel = (option: boolean) => (option ? "Satisfied" : "Unsatisfied");
// export function SatisfactionSelect() {
//     const [selectedOption, setSelectedOption] = useState(true);
//     return (
//      <label>
//        <span>How do you feel right now?</span>
//        <Select
//          selectedOption={selectedOption}
//          options={options}
//          getLabel={getLabel}
//          onChange={setSelectedOption}
//        />
//      </label>
//     );
//   }
