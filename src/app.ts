import { AWSEmailSDK } from "./aws_ses"
import XLSX from "xlsx"
import path from "path"

const mail = `Estimado/a [Nombre del candidato/a],
Nos complace invitarte a postular al puesto de Desarrollador de software Full Stack en la empresa Globals S1. Tenemos una gran oportunidad de empleo de crecimiento y desarrollo profesional en un ambiente de trabajo dinámico y agradable.
En Globals S1, nos enorgullece ser una empresa dl desarrollo de soluciones tecnológicas innovadoras. Estamos buscando a alguien con habilidades excepcionales y experiencia para unirse a nuestro equipo de trabajo como Desarrollador Full Stack.
Requisitos del puesto:
Experiencia en el desarrollo de aplicaciones web.
Conocimiento en lenguajes de programación Javascript.
Experiencia en el manejo de bases de datos relacionales y no relacionales.
Dominio de tecnologías back-end y front-end, como Node.js, React.js, Angular.js, MySQL, Docker, entre otros.
Ofrecemos un rango de salario competitivo de 4k a 6k, acorde a tu experiencia y habilidades. Además, como empleado/a de Globals S1, disfrutarás de beneficios adicionales, como seguro de salud y oportunidades de crecimiento y desarrollo profesional.
Si estás interesado/a en esta emocionante oportunidad, te invitamos a agendar una vídeo entrevista al correo: patricia.rioja@globals.one, incluye en el asunto del correo "Solicitud Desarrollador Full Stack Senior".
Valoramos tu experiencia y habilidades, y estamos ansiosos por conocerte. Esperamos que te unas a nuestro equipo y contribuyas con tu talento al éxito continuo de Globals S1.
¡Te deseamos mucho éxito en tu proceso de postulación!`


class App {
    private emailSender: AWSEmailSDK

    constructor() {
        this.emailSender = new AWSEmailSDK()
    }

    async sendEmail(to: string, subject: string, template: string) {
        try {
            const { success, result } = await this.emailSender.sendEmail(to, subject, template) as any
        } catch (e) {
            console.log(`Email sender Failed`)
        }
    }
}

const peter = new App()

const readDb = () => {
    const filePath = path.resolve(__dirname,'./db/certus.xlsx')
    const workbook = XLSX.readFile(filePath)
    const workbookSheets = workbook.SheetNames
    const sheet = workbookSheets[0]
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
    for (let index = 0; index < dataExcel.length; index++) {
        const element: any = dataExcel[index];
        console.log(element['CURSO | Perfil'])
    }
}

readDb()

// peter.sendEmail("peter.castillo@globals.one", "TEST01", mail)