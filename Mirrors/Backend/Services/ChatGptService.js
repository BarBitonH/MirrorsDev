import axios from "axios";
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\MirrorsDev\\secrets.env')});


class ChatGptService{

    constructor() {
        this.apiKey=process.env.OPEN_AI_API_KEY;
        this.orginazation = process.env.OPEN_AI_ORG_ID;
    }

     generateStrengthMessage(json){
        try {
            return `
                 Instructions:your answer need to be fully in english.
                 give very deep insights for: 
                  The user gave us answers to personality questions, his mtbi , and made a gene test and the results you can find in his answers. the genes are the percentiles of the user out of the population. 
                  Base on 15% Mtbi , 35% anwers and 50% user's genes test result which is the most sagnificant  ,each result need to be combination of all mtbi answers and gene results dont show percentiles.Base each of your answers on the user's genes test result which is the most sagnificant  and show how the user's genes test result which is the most sagnificant really indicate what you are saying. Without intro or end you are now giving a report about the user's Strengths. ` +
                +"each answer you will need to base your self base to the user's genes test results but dont show the percentile."
                +`start with short 3 sentences summary about the user strengths include his mtbi type and  summary of the strengths base on the gene mtbi.Create a title Your strengths are: You will act as Tony Robbins-style mentor, with expertise on maximizing life fulfillment, psychology, career, and relationships. ` +
                `Based on the user's answers provided, you will write a report in the following structure: ` +
                `- A few paragraphs that summarize who the user is, his strengths, unique insights you find based on the information the user provided. ` +
                `- A list of strengths the user has (for example 10 strengths more or less) and an explanation of the choice of each strength. after each strength exaplain specifc decisived method how to empower the strengths and make the better stronger and faster.` +
                `Remember that you are writing directly to the user, so use her name and the adjectives you your ` +
                `Base yourself 70% on the user's answers and 30% on the user's MTBI.\n ` +
                `Use tony robbins book's method(dont mention its tony robbins or his book) to tell her how to make this strengths stronger, explain like tony robin's book what each of the mothods means."\n`+
                `This is The user's answer: ${JSON.stringify(json)}`
        }
        catch (error) {
            console.error("Json is missing", error);
        }
    }
    async extractUserGenes(internalAxonId, token){
        const genes = await axios.post('http://localhost:3000/gateWayRouter/gateWay',{queryTitle:'internal_axon_id',queryData:internalAxonId},{headers:{
                'x_inf_token':token,
                'destinationurl': 'http://localhost:3000/dbRouter/db/find',
                'collection': 'User_login',
                db:'Users'}
        });
        return genes.data.body.data.personalityData.geneResults;
    }
    async extractMtbi(internalAxonId,token){
        const response = await axios.post('http://localhost:3000/gateWayRouter/gateWay',{queryTitle:'internal_axon_id',queryData:internalAxonId},{headers:{
                'x_inf_token': token,
                'destinationurl': 'http://localhost:3000/dbRouter/db/find',
                db: 'Users',
                collection:'User_login'
            }
        });
        return response.data.body.data.personalityData.mtbiResult;
    }
     generateCareerMessage(json){
        try {
            return `your answer need to be fully in english.
            The user gave us answers to personality questions, his mtbi , and made a gene test and the results you can find in his answers. the user's genes test result which is the most sagnificant are the percentiles of the user out of the population. 
            Base on 15% Mtbi , 35% answers and 50% user's genes test result, make sure to use all the genetic scores which is the most sagnificant ,the genes are normaly distributed when the mean average is 50%. Base each of your answers on the user's genes test result which is the most sagnificant and show how the user's genes test result which is the most sagnificant really indicate what you are saying.You are giving career report when you are now picking the 1 right path the user should go with, we will focus on the user's career. You will act as an expert career advisor, combining the knowledge of counselor, successful businessman, and the know-how of how to help young adults with their careers. 
            Based on the user's genes, answers, mtbi and the strengths that you found in the user, you will write a report about her career in the following structure:
            each answer you will need to base your self base to the user's genes test results show specifc genes and how he can use it . 
            a. Recommend types of careers that suit the user's, with an explanation for why each career path was chosen to fit her strengths:
            i. Specific careers and jobs, career types that fit the user's and that he should consider to pursue. For each career, explain why you suggest this to the user specifically.
            ii. Specific industries within the domains that fit the user's and that she should consider to pursue. For each industry, explain why you suggest this to the user specifically.
            b. Recommendations to maximize career potential
            i. Detailed explanations, in several paragraphs regarding what the user's can do to maximize her career potential - starting from how to choose which career is best for her (must be based on the user's personality and strengths, so it should be explained why what you're suggesting fits her), how to find relevant jobs in these areas, and how to double down on her strengths to reach her potential within these fields.
            ii. Courses that the user's might want to take based on his strengths
            iii. books that the user's should read
            iv. YouTube channels/podcasts the user's should watch or follow
            v. Role models - people similar to the user who are successful in the relevant fields
            vi. Higher education program (degrees) that the user may want to pursue, with an explanation as to why these programs will enhance the proposed career paths.
            Now you need to be very very specific like book of instructions with exact ways Taking into account the domains and industries you suggested the user to take, provide detailed explanations, in several paragraphs regarding what the user can do to maximize her career potential -starting from how to choose which career is best for her (must be based on the user's personality and strengths, so it should be explained why what you're suggesting fits her), how to find relevant jobs in these areas, and how to double down on her strengths to reach his potential within these fields.
            Dont put and signs to tonny robbis and dont add any ending. make sure to call the user as you. the user's answers are : ${JSON.stringify(json)}`
        }
        catch (error) {
            console.error("Json is missing", error);
        }
    }
    generateRPartnerMessage(json){
        try {
            return `Based on your personality responses, MBTI, and gene test results, the following sections guide your approach to relationships:

Suitable Partners
Your genes, MBTI, and responses suggest suitable romantic and business partners...

1.1. Romantic Partners
Matching MBTI personality types, how to leverage your strengths in romance, and problem-solving strategies...

1.2. Business Partners
Ideal MBTI personality matches in business, optimizing your strengths for partnerships, and problem resolution approaches...

Ensure to adapt to different relationships leveraging your strengths. Your input data: ${JSON.stringify(json)}`
        }
        catch (error) {
            console.error("Json is missing", error);
        }
    }
    generateParentingMessage(json){
        try {
            return `with out any intro or ending your answer need to be fully in english. 
            The user gave us answers to personality questions, his mtbi , and made a gene test and the results you can find in his answers. the user's genes test result which is the most sagnificant are the percentiles of the user out of the population. 
            Base on 10% Mtbi , 30% anwers and 60% user's genes test result which is the most sagnificant ,Base each of your answers on the user's genes test result which is the most sagnificant and show how the user's genes test result which is the most sagnificant really indicate what you are saying.
             Parenting Style. You will act as a family therapist and expert parent. Based on all of the user's genes which is the most significant test, personality, mtbi ,and strengths, write a report that can help him become the best type of parent she can be, in the following structure:
            each answer you will need to base your self base to the user's genes test results. 
            a. Type for a parenting style that suits the user.
            b. Real life examples of how to implement the suggested parenting style
            c. How to use the user strengths to help the user's children maximize their abilities
            d. Recommendations for books to read that may be relevant to the user
            Make each section distinct, with several paragraphs and headings. 
            Remember, you are writing directly to the user, so use his name, you, and your
            dont add ending.
            the user's answers are : ${JSON.stringify(json)}`
        }
        catch (error) {
            console.error("Json is missing", error);
        }
    }
    generateSelfHelpMessage(json){
        try {
            return `without any intro or ending your answer need to be fully in english. The user gave us answers to personality questions, his mtbi , and made a gene test and the results you can find in his answers. the user's genes test result which is the most sagnificant are the percentiles of the user out of the population. 
            Base on 10% Mtbi , 30% anwers and 60% user's genes test result which is the most sagnificant ,Base each of your answers on the user's genes test result which is the most sagnificant and show how the user's genes test result which is the most sagnificant really indicate what you are saying. this section will be about self-helpi. Imagine you gve a lesson how to improve your self but be determained and tell what to do or what to say You will act as Tony Robbins, and provide suggestions for how the user can maintain her best mental shape. You will write the report in the following structure:
                    each answer you will need to base your self base to the user's genes test results. 
                    a. Special qualities that you recognize in the user that the user may not have known existed in self. Write this section in an enlightening way, which can illuminate new understanding that the user may suddenly have about herself, and explain how these strengths come into action for the user.
                    b. find where the the hurt points in the user life (That he told or not it can be even by how he writes maybe too much maybe not orianted look for eveylittle detail in the words and behind but dont tell about those points just discover them)
                     and discover areas that can enrich the user's life given her strengths and personality that the user can use to overcome those points and suggest specific methods for improvment like a guidence book you just wrote(dont tell you wrote a book).
                    c. Books/podcasts the user can read/listen to for self improvement.
                    Make each section distinct, with several paragraphs and headings. 
                    Remember, you are writing directly to the user, so use his name, you, and your. 
                     the user's answers are :${JSON.stringify(json)}`
        }
        catch (error) {
            console.error("Json is missing", error);
        }
    }
    generateUserPerson(json){
        "As an artificial intelligence model, youll assume the role of a sophisticated career guide. The user shares three key data types with you:"+

        "Genomic Evaluation Scores: This quantitative data, calculated from the user's genetic makeup, offers insights into their inherent traits. The scores use a scale where exceeding 50% represents superior natural abilities, while scoring below 50% signals below-average aptitudes."+

        "Phenotypic Findings: Drawn from the user's responses to an extensive survey, this qualitative data unveils their personality facets and behavioral patterns."+

        "Myers-Briggs Type Indicator (MBTI): This is the psychological archetype of the user, inferred from the MBTI. It provides deep insights into their cognitive mechanisms and decision-making processes."+

            "Armed with this data, your task is to provide the user with the following deliverables:"+

            "A. Persona Design: Analyze the user's genetic information and personality, and create a unique persona that embodies their distinct characteristics. Name this persona, detail its traits, and explain how these traits are reflected in the user."+

        "B. Inspirational Quotation: Based on the user's genetic makeup and personality, find an existing quote that resonates with their persona and serves as a motivational guide. This quote should mirror their persona, inspire them to leverage their unique traits, and keep them engaged in their career development process."+
        `the user's answers are :${JSON.stringify(json)}`;
    }
    generateCareerStrength(json){
        try {
            return `You, as an artificial intelligence model, will be taking on the role of an advanced career strategist. The user has provided you with three distinct sets of data.

Genetic test scores: This consists of a calibrated metric of the user's inherent qualities as dictated by their genetics. The scores are measured on a scale where over 50% signifies above-average aptitude, and under 50% denotes below-average.

Phenotype results: The user's responses from a comprehensive questionnaire that sheds light on their personality traits and behavior patterns.

Myers-Briggs Type Indicator (MBTI): This is the user's psychological profile as derived from MBTI, giving insights into their cognitive functions and decision-making patterns.

Your goal is to use these pieces of information to provide the user with the following:

A. Identification of five key strengths: These strengths should be deeply rooted in their genetic test results and relevant to their career development. Include detailed insights on why these strengths are advantageous, and how they can be leveraged for career growth.

B. Recommended Reading: Suggest three specific books, detailing the author and how each book is pertinent to the evaluation and cultivation of the identified strengths. Make sure to pinpoint specific chapters that are highly relevant and explain how reading them can benefit the user.

C. Podcast Suggestions: Offer two podcasts that are relevant to their career strengths. Specify the timestamps in each podcast where crucial insights are provided and elucidate how paying close attention to these segments will enhance their career development.

D. Personalized Learning Path: Based on their age, background, and the data you have, propose an educational process that would help them nurture their strengths. Give them specific names of courses or programs, and explain how these would aid in their progress.

E. Online Community Engagement: Recommend two existing Facebook groups that are relevant to their strengths. These groups should be active platforms where they can engage, network, and develop their strengths to a higher level. Explain why these groups were chosen and how participating in these communities will be beneficial.
     call the user only as you.       
                     the user's answers are :${JSON.stringify(json)}`
        }
        catch (error) {
            console.error("Json is missing", error);
        }
    }
    async fetchUserAttributes(internalAxonId,token){
        const headerToFetchUser = {
            x_inf_token: token,
            destinationUrl:'http://localhost:3000/dbRouter/db/find',
            collection:'User_login',
            db:'Users'
        }
        const user = await axios.post('http://localhost:3000/gateWayRouter/gateway',
            {queryTitle:'internal_axon_id',queryData:internalAxonId},
            {headers:headerToFetchUser}
        );
        return user.data.body.data;
    }
    async sendMessageToGpt(question,user,token){
        const userToChat =await this.fetchUserAttributes(user.internal_axon_id,token);
        const prompt = this.createMessagePrompt(userToChat,question);
        return await this.createApiRequestForChatGpt(prompt);
    }
     createMessagePrompt(userJson,question){
        return  `your answer need to be fully in english. 
        this is the strength you found about the user ${userJson.strength},
        this is the career path you suggested to the user: ${userJson.career},
        this is the best relation ship partner and method you suggested ${userJson.rPartner},
        this is the business partner you suggested him ${userJson.bPartner}
        use this data to answer the question of the user(dont tell him you use the data dont give any intro or ending)`+ question;
    }
    async createApiRequestForChatGpt(prompt){
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model:'gpt-4',
            messages: [{role:'user',content:prompt}],
        }, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
        });
         return response.
             data.choices[0].message.content;
    }
    async generateResponses(json) {
        const questions = [
            {name:"Persona:",
                generate:this.generateUserPerson
            },
            {
                name:"Career Strengths",
                generate:this.generateCareerStrength
            },
            {
                name: "strengths",
                generate: this.generateStrengthMessage,
            },
            {
                name: "career",
                generate: this.generateCareerMessage,
            },
            {
                name: "relationship",
                generate: this.generateRPartnerMessage,
            },
            {
                name: "parenting",
                generate: this.generateParentingMessage,
            },
            // {
            //     name: "selfHelp",
            //     generate: this.generateSelfHelpMessage,
            // },
        ];

        const requests = questions.map(async (question) => {
            const prompt = question.generate(json);
            const response = await this.createApiRequestForChatGpt(prompt);
            return [question.name, response];
        });
        const results = await Promise.allSettled(requests);
         return Object.fromEntries(results.map(({ value }) => value));
    }
    async createFinalyReport(json,internalAxonId,token){
        const reportString = await this.generateResponses(json);
        const summarizedStrings = await Promise.all(Object.values(reportString).map(value => this.createSummaryAndInsertSummaryToDb(value,token,internalAxonId)));
        const resultOfUpdating = await axios.post('http://localhost:3000/gateWayRouter/gateWay',{method:'$set',queryTitle:'internal_axon_id',queryData:internalAxonId,update:{summarizedData: summarizedStrings}},{headers:{destinationurl:'http://localhost:3000/dbRouter/db/update','x_inf_token':token,db:'Users',collection:'User_login'}});
        const pdf = await this.pdfCreator.insertReport(reportString,internalAxonId);
        return{pdf:pdf , reportString: reportString,summarizedReport:summarizedStrings};
    }
    async createSummaryAndInsertSummaryToDb(string) {
        const summaryToInsertDb = (await this.generateSummaryForReport(string)).replace(/\d+\.\s*/g, '').split('.').map(s => s.replace(/^\n/, ''));
        return summaryToInsertDb;
    }
    async generateChatConverSation(question,internalAxonId,token){
       const user = await this.fetchUserAttributes(internalAxonId,token);
       const userFirstName = user.LoginProperty.firstName;
       const genes = user.personalityData.geneResults;
       const mtbi = user.personalityData.mtbiResult.personality;
       const historyPersonality = user.summarizedData;
        const prompt = "from now on your name is not chatgpt its OMgeneAI and you are answering like the combination of Tonny Robbins  with Dr phill, Brené Brown,Robin Sharma,Marie Forleo,Gary Vaynerchuk  and Dr. Jordan B. Peterson (Dont mantion those celebrities in any way) .The next prompt will include 3 " +
            "section the user's summary of personality user's genes (make sure to use all the genetic scores) and " +
            `the user which is name is ${userFirstName} question you need to answer his question but only his question, nothing more. when you add a super nice act like you already know him and no need to welcome him again ` +
           +"The genes provided to you are both Strengths and weekness make sure to not tell him about his weeknesses but do help him to overcome them."+
            +"dont give him advices that he wasnt ask for and it out side of the bounds of the user's question"+
            "and friendly intro to make him fill super connected  intro, and end with farther question " +
            "to understand him better make sure to give him the minimum top match answer for him while " +
            "you base your self on his properties dont give gneneral advices only based advices on his property.While the real questions need to be answered ,but for what there is no need for deep answers answer shortly with out follow up.  Be decisive give him focused massage and not bluer, say why you chose your message and say why not other options" +
            `give the user practical things to do to accomplish your suggestion for his question only what needed to add, for ex. podcusts books way of life sports and more options he may need to use that answer only but only his question. His personality is ${historyPersonality} and his genes that are strengths are ${JSON.stringify(genes.strengths)} and the genes that are weekness are ${JSON.stringify(genes.weekness)} dont tell  the user his weeknesses just help him to overcome it . and his mtbi is ${mtbi} and the user's question is :${question}`;
        const resultFromGpt = await this.createApiRequestForChatGpt(prompt);
        const gptSummary = await this.createSummaryAndInsertSummaryToDb(resultFromGpt);
        const resultOfUpdating = await axios.post('http://localhost:3000/gateWayRouter/gateWay',{method:'$push',queryTitle:'internal_axon_id',queryData:internalAxonId,update:{summarizedData: gptSummary}},{headers:{destinationurl:'http://localhost:3000/dbRouter/db/update','x_inf_token':token,db:'Users',collection:'User_login'}});
        return resultFromGpt;
    }
    async generateSummaryForReport(string,internalAxonId,token){
        const prompt = "Instruction i will give you an example of summary " +
            " and you need to copy very shortly as possible each note made by 1 sentence of max 10 " +
            "words each if can less at a time the structure and way of thinking create summary no need" +
            " titles and stay short as possible for the text i gave you. example : 1. You have strong ability " +
            "to be an athelete, 2. your genes say that you are friendly therefore you can create alot of " +
            "connection. 3. you need to read the book : money and happines, 4. you need to have " +
            "friendships style of parenting ... and on and on and on .... now you need to summarize " +
            "this text by the way i showed you." + string;
        const gptSummary = await this.createApiRequestForChatGpt(prompt)
        return gptSummary;
    }
}

export default ChatGptService;

