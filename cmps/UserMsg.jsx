import { eventBusService } from "../services/eventBus.service.js";
const { useState, useEffect } = React;

export default function UserMsg() {
  const [message, setMessage] = useState();
  useEffect(() => {
    const unsubscribe = eventBusService.on("show-user-msg", (data) => {
      setMessage(data);
      setTimeout(() => {
        setMessage(false);
      }, 2500);
    });
    return () => unsubscribe;
  }, []);
  function onClose() {
    setMessage(false);
  }
  if (!message) return "";
  return (
    <section className={`user-msg ${message.type}`}>
      <i onClick={onClose} className="close-btn bi bi-x-circle"></i>
      <h3>{message.txt}</h3>
    </section>
  );
}
