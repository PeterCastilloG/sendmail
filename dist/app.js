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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const console_1 = require("console");
class AppMailer {
    constructor(template, db) {
        this.emailSender = new aws_ses_1.AWSEmailSDK();
        this.template = this.getTemplate(template);
        this.db = this.readDb(db);
    }
    init() {
        for (let index = 0; index < this.db.length; index++) {
            const element = this.db[index];
            const template = this.perzonalizeTemplate([element.nombre]);
            this.sendEmail(element.correo, "Global S1", template);
        }
    }
    getTemplate(route) {
        const routeTemplate = path_1.default.resolve(__dirname, `templates/${route}.html`);
        const template = fs_1.default.readFileSync(routeTemplate, 'utf8');
        if (!template) {
            throw (0, console_1.error)("Failed to get Template");
        }
        return template;
    }
    perzonalizeTemplate(datos) {
        return this.template.replace(/{{([^{}]+)}}/g, (_, placeholder) => {
            const valor = datos.shift() || '';
            return valor;
        });
    }
    readDb(db) {
        const filePath = path_1.default.resolve(__dirname, `db/${db}.xlsx`);
        const workbook = xlsx_1.default.readFile(filePath);
        if (!workbook) {
            throw (0, console_1.error)("Failed to get Exel");
        }
        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet]);
        const people = [];
        for (let index = 0; index < dataExcel.length; index++) {
            const element = dataExcel[index];
            people.push({ correo: element['Correo Personal'], nombre: element['Nombres y Apellidos'] });
        }
        return people;
    }
    sendEmail(to, subject, template) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.emailSender.sendEmail(to, subject, template);
            }
            catch (e) {
                console.log(`Email sender Failed`);
            }
        });
    }
}
// const peter = new AppMailer("INTERVIEW", "certus").init()
console.log("hola");
const peter = new AppMailer("INTERVIEW", "test").init();
