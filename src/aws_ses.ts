import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import env from "./environment";

const { aws: { accessKeyId, secretAccessKey, region } } = env;

export class AWSEmailSDK {
    private sesClient: SESClient

    constructor() {
        this.sesClient = new SESClient({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        })
    }

    async sendEmail(to: string, subject: string, body: string) {
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
        }

        const command = new SendEmailCommand(params)
        try {
            const result = await this.sesClient.send(command)
            console.log(`Email sended to ${to}`)
            return { success: true, result }
        } catch (e) {
            console.log(`Email failed to ${to}: ${e}`)
        }
    }
}