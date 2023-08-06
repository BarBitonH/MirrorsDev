import mtbiQuestions from "./Questions/MtbiQuestions.js";
import {createCanvas,loadImage} from "canvas";

class MtbiTest{
    constructor(answersJson){
        this.questions =mtbiQuestions;
        this.traints =['E', 'I', 'N', 'S', 'T', 'F', 'J', 'P'];
        this.traitScores = {};
    }

    getUserPersonality(jsonAnswer) {
            let traitScores = {};
            let answerIndex = 0;
            for (let question of this.questions) {
                if (!traitScores[question.trait]) {
                    traitScores[question.trait] = 0;
                }
                traitScores[question.trait] += parseInt(jsonAnswer[answerIndex],10);

            }

            let personality = "";
            let traitPercentages = {};
            for (let i = 0; i < this.traints.length; i += 2) {
                let totalScore = traitScores[this.traints[i]] + traitScores[this.traints[i+1]];

                if (traitScores[this.traints[i]] >= traitScores[this.traints[i+1]]) { // Pick the first trait when scores are equal
                    personality += this.traints[i];
                    traitPercentages[this.traints[i]] = (traitScores[this.traints[i]] / totalScore) * 100;
                } else {
                    personality += this.traints[i+1];
                    traitPercentages[this.traints[i+1]] = (traitScores[this.traints[i+1]] / totalScore) * 100;
                }
            }

            let resultPercentages = {};
            for (let trait of personality) {
                resultPercentages[trait] = Math.floor(traitPercentages[trait]);
            }

            // Return the personality type, the scores, and the percentages of winning traits
            return {personality, resultPercentages};
        }


    async eneratePhotoPersonality(personality, resultPercentages){
        const canvas = createCanvas(1000, 600); // adjust canvas size if needed
        const ctx = canvas.getContext('2d');

        // Load existing image based on personality type
        const image = await loadImage(`./path/to/${personality}.png`); // assuming you have an image for each personality type
        ctx.drawImage(image, 0, 0, 1000, 400); // adjust image size if needed

        // Draw percentile bars below the image
        let x = 0;
        for (let trait of personality) {
            const percentage = Math.floor(resultPercentages[trait]);
            const color = (x % 2 === 0) ? 'red' : 'blue';
            ctx.fillStyle = color;
            ctx.fillRect(x * 250, 400, percentage * 2.5, 100); // adjust position and scaling if needed
            x++;
        }

        // Save the canvas to a file
        const fs = require('fs');
        const out = fs.createWriteStream(`./path/to/output/${personality}_output.png`);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () =>  console.log('The PNG file was created.'));
    }
}
export default MtbiTest;
