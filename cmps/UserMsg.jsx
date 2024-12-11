import { eventBusService } from "../services/eventBus.service"
const {useState, useEffect} = React;

export default function UserMsg(){
    const [message, setMessage] = useState()
    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', data => {
            setMessage(data)
            setTimeout(() => {
                setMessage(false)
            }, 2500)
        })
        return () => unsubscribe
    })
    return (
        <section>
            <h3>{message.txt}</h3>
        </section>
    )
}