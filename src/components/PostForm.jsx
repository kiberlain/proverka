import useForm from 'h/useForm'
import { MyField } from './MyField'

export const PostForm = ({ fields, submit, button }) =>
{
    const initialData = fields.reduce((o, f) =>
    {
        o[f.id] = f.value || ''
        return o
    }, {})


    const { data, change, disabled } = useForm(initialData)

    const onSubmit = (e) =>
    {
        if (disabled) return
        e.preventDefault()
        submit(data)
    }

    return (
        <form onSubmit={onSubmit}>
            {fields.map((f, i) => (
                <MyField {...f} value={data[f.id]} change={change} key={i} />
            ))}
            <button disabled={disabled} className='success'>
                {button}
            </button>
        </form>
    )
}
