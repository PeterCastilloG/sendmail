"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_ses_1 = require("./aws_ses");
const xlsx_1 = __importDefault(require("xlsx"));
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
¡Te deseamos mucho éxito en tu proceso de postulación!`;
class App {
    constructor() {
        this.emailSender = new aws_ses_1.AWSEmailSDK();
    }
    sendEmail(to, subject, template) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, result } = yield this.emailSender.sendEmail(to, subject, template);
            }
            catch (e) {
                console.log(`Email sender Failed`);
            }
        });
    }
}
const peter = new App();
const readDb = () => {
    const workbook = xlsx_1.default.readFile('./db/certus.xlsx');
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet]);
    console.log(dataExcel);
};
readDb();
// peter.sendEmail("peter.castillo@globals.one", "TEST01", mail)
