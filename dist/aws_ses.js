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
exports.AWSEmailSDK = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const environment_1 = __importDefault(require("./environment"));
const { aws: { accessKeyId, secretAccessKey, region } } = environment_1.default;
class AWSEmailSDK {
    constructor() {
        this.sesClient = new client_ses_1.SESClient({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });
    }
    sendEmail(to, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                Destination: {
                    ToAddresses: [to]
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: body
                        }
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: subject
                    }
                },
                Source: "Desarrollo@globals.one",
            };
            const command = new client_ses_1.SendEmailCommand(params);
            try {
                const result = yield this.sesClient.send(command);
                console.log(`Email sended to ${to}`);
                return { success: true, result };
            }
            catch (e) {
                console.log(`Email failed to ${to}: ${e}`);
            }
        });
    }
}
exports.AWSEmailSDK = AWSEmailSDK;
