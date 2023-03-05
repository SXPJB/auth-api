import app from "./app";
import {PORT} from './constants/constants'
import {DatabaseConfig} from "./config/db_conextion";


const main = async () => {
    try {
        await DatabaseConfig.initialize()
        app.listen(PORT, () => console.log(`Server on PORT: ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}

main()