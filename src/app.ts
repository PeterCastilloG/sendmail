import { AWSEmailSDK } from "./aws_ses"
import XLSX from "xlsx"
import fs from "fs"
import path from "path"
import { IPeople } from "./interfaces/people"
import { error } from "console"

class AppMailer {
    private readonly emailSender: AWSEmailSDK;
    private readonly template: string;
    private readonly db: IPeople[]

    constructor(template: string, db: string) {
        this.emailSender = new AWSEmailSDK();
        this.template = this.getTemplate(template);
        this.db = this.readDb(db)
    }

    init() {
        for (let index = 0; index < this.db.length; index++) {
            const element = this.db[index];
            const template = this.perzonalizeTemplate([element.nombre])
            this.sendEmail(element.correo,"Global S1", template)
        }
    }

    private getTemplate(route: string) {
        const routeTemplate = path.resolve(__dirname, `templates/${route}.html`);
        const template = fs.readFileSync(routeTemplate, 'utf8');
        if (!template) {
            throw error("Failed to get Template")
        }
        return template;
    }

    private perzonalizeTemplate(datos: Array<string>) {
        return this.template.replace(/{{([^{}]+)}}/g, (_, placeholder) => {
            const valor = datos.shift() || '';
            return valor;
        })
    }

    private readDb(db: string): IPeople[] {
        const filePath = path.resolve(__dirname, `db/${db}.xlsx`)
        const workbook = XLSX.readFile(filePath)
        if (!workbook) {
            throw error("Failed to get Exel")
        }
        const workbookSheets = workbook.SheetNames
        const sheet = workbookSheets[0]
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        const people: IPeople[] = []
        for (let index = 0; index < dataExcel.length; index++) {
            const element: any = dataExcel[index];
            people.push({ correo: element['Correo Personal'], nombre: element['Nombres y Apellidos'] })
        }
        return people
    }

    private async sendEmail(to: string, subject: string, template: string) {
        try {
            await this.emailSender.sendEmail(to, subject, template) as any;
        } catch (e) {
            console.log(`Email sender Failed`);
        }
    }
}

// const peter = new AppMailer("INTERVIEW", "certus").init()
console.log("hola")

const peter = new AppMailer("INTERVIEW", "test").init()

