import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
import fs from "fs/promises";
import AWS from  './AWSconnectionService.js';
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\Omgene\\secrets.env')});

class PdfCreatorService{
    constructor() {
        this.aws = new AWS();
    }
    async createPdfFromReportJson(stringJson){
        const pdfDoc = await PDFDocument.create();
        for (const [question, response] of Object.entries(stringJson)) {
            let page = pdfDoc.addPage();
            const { width, height } = page.getSize();
            const fontSize = 8;

            page.drawRectangle({
                x: 0,
                y: 0,
                width: width,
                height: height,
                color: rgb(1.0, 1.0, 1.0)
            });

            let yPosition = height - 50;
            let textLines = response.split('\n');

            const textLineArray = [];
            textLines.forEach((text) => {
                const words = text.split(' ');
                for (let i = 0; i < words.length; i += 18) {
                    textLineArray.push(words.slice(i, i + 18).join(' '));
                }
            });
            const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
            page.drawText(question, {
                x: 50,
                y: yPosition,
                font:helveticaBoldFont,
                size: 16,
                color: rgb(0, 0, 0),
            });

            yPosition -= (fontSize + 4) * 2; // Add space for the next line

            for (const line of textLineArray) {
                if (yPosition < 50) { // margin at the bottom of the page
                    page = pdfDoc.addPage();
                    yPosition = height - 50;
                }

                page.drawText(line, {
                    x: 50,
                    y: yPosition,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                });

                yPosition -= (fontSize + 4) * 2; // Add space for the next line
            }
        }

        const pdfBytes = await pdfDoc.save();
        await fs.writeFile('./results.pdf', pdfBytes);
        return pdfBytes;
    }

    async insertReport(stringJson,internalAxonId){
        const pdfBytes = await this.createPdfFromReportJson(stringJson);
        const insertionResult = await this.aws.insertIntoS3(process.env.PERSONALITY_REPORT_S3_NAME,pdfBytes,'application/pdf',`${internalAxonId}_report.pdf`);
        if(insertionResult)
            return insertionResult;
        else
            return false;
    }
}
export default PdfCreatorService;