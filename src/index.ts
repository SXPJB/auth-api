import app from './app';
import { PORT } from './constants/constants';
import { DatabaseConfig } from './config/db_conextion';

/**
 * @description Main function to initialize the server
 * @returns {Promise<void>}
 * @author SXPJB
 * **/
class RunServer {
  public static async main(): Promise<void> {
    try {
      await DatabaseConfig.initialize();
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error starting server: ', error);
    }
  }
}

RunServer.main();