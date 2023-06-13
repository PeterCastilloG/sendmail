import * as dotenv from 'dotenv';
dotenv.config();

export interface Configuration {
    aws: {
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
    }
}

const config: Configuration = {
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY || "accessKeyId",
        secretAccessKey: process.env.AWS_ACCESS_SECRET || "secretAccessKey",
        region: process.env.AWS_REGION || "us-east-1",
      },
}

export default config;