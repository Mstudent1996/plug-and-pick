import { useEffect, useState } from "react"; 
import styles from './Cookies.module.css'

const Cookies = () => {
    const [isVisible, setIsVisible] = useState(false) // State der styrer på banneret er synligt eller ej. Vises ikke til at state med fordi det er falsk. 

    useEffect(() => {
        const cookieAccepted = localStorage.getItem("cookieConsent") // Der tjekkes om der tidligere er blevet accepteret cookies
        if(!cookieAccepted) {
            setIsVisible(true)
        } // Findes der ikke en værdi, ændres isVisble til true og banneret vises
    }, [])

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true")
        setIsVisible(false) // Nå der trykkes accept, gemmes det som true i localStorage og bannerets værdi sættes til falsk og det skjules. 
    }

    if (!isVisible) return null // Hvis set visible er false vises intet
    
    return (
        <div className={styles.banner}>
            <p>We are using cookies to enhance your experience. You are accepting our use of cookies with continiued use.</p>

            <button onClick={handleAccept}>Accept</button>
        </div>
    )
}

export default Cookies