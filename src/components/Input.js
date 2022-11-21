import React from "react";
import i18n from "../i18n";

export const Input = ({
    name,
    type,
    placeholder,
    autocomplete,
    ...otherProps
}) => {
    return (
        <>
            <label htmlFor={name} className="sr-only">
                {i18n.t(placeholder)}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                autoComplete={autocomplete ?? "off"}
                className="relative block w-full appearance-none mb-3 rounded-md border border-gray-300 dark:border-secondary px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-accent dark:placeholder:text-white dark:text-white"
                placeholder={placeholder}
                {...otherProps}
            />
        </>
    );
};
