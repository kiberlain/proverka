import { useState } from "react";

export const MyField = ({ tag, label, value, change, id, type, ...rest }) =>
{
    return (
        <>
            {tag == "textarea"
                ? <div className='field'>
                    <label htmlFor={id}>{label}</label>
                    <textarea
                        type={type}
                        id={id}
                        name={id}
                        required
                        placeholder={label}
                        value={value}
                        onChange={change}
                        {...rest}
                    >{value}</textarea>
                </div>
                : <div className='field'>
                    <label htmlFor={id}>{label}</label>
                    <input
                        type={type}
                        id={id}
                        name={id}
                        required
                        placeholder={label}
                        value={value}
                        onChange={change}
                        {...rest}
                    />
                </div>
            }
        </>
    )
}

