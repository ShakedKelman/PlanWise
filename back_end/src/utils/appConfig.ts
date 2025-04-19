import path from "path";

class AppConfig {
    readonly port : number = 4000
    readonly routePrefix = "/api/v1";
    readonly dbConfig = {
        host: 'localhost',
        port: 3306,
        database: 'PlanWise',
        user: 'root',
        password: ''
    }
    readonly logsDir: string = path.resolve(__dirname, '../logs');
    readonly errorLogFile: string = path.join(this.logsDir, 'error.log');
    readonly accessLogFile: string = path.join(this.logsDir, 'access.log');
}

export const appConfig = new AppConfig()