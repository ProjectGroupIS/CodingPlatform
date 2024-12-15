import { exec } from 'child_process'
import fs from 'fs'
import { message } from '../utils/message.js'
import { StatusCodes as status } from 'http-status-codes'
import { Submissions } from '../Models/submissions.js'
// import crypto from 'crypto'
import { User } from '../Models/User.js'
import { Questions } from '../Models/Question.js'
import Joi from 'joi'



function validateSubmitCode(body){
    const schema = Joi.object({
        questionId:Joi.string().required(),
        language:Joi.string().required(),
        code:Joi.string().required()
    })
    return schema.validate(body)
}

export default async function run(req,res){
    const {questionId,language,code} = req.body
    const {error} = validateSubmitCode(req.body)
    if(error)
        return message(res,status.BAD_REQUEST,error.message)
    const extns = getExtensionAndContainer(language)
    if(!extns)
        return message(res,status.BAD_REQUEST,"provide supported langauge")
    const buildImage = `docker build -f Dockerfiles/Dockerfile.${extns} -t ${extns}-container .`
    // run copy end clear
    // const runContainer = `docker run -d -t --name ${extns} ${extns}-container`
    // const copyFile = `docker cp ${extns}:/output.txt .`;
    // const endContainer = `docker rm ${extns} -f`
    const clearDangling = `docker image prune -f`
    // run copy end in one cmd
    const getOutput = `docker run --rm -v %cd%/:/opt ${extns}-container > compile_errors.txt `;

   const copyfile= 'copy "%cd%\\TestCases\\'+`${questionId}.txt" ` + '"%cd%/input.txt"'
   const opt=`docker run --rm  ${extns}-container >output.txt`;
   const deletefile = 'del "%cd%\\"'+`Main.${extns}`
    try{
        
        await execute(copyfile)
        // fs.copyFileSync(`./TestCases/${questionId}.txt`,'./input.txt')
        fs.writeFileSync(`Main.${extns}`,code);
        await execute(buildImage);
        await execute(opt);
        await execute(clearDangling);
        await execute(deletefile)
        // fs.unlinkSync(`./Main.${extns}`)
    }catch(error){
        return message(res,status.INTERNAL_SERVER_ERROR,error)
    }

    if(! await compareOutput(questionId)){
        const data = await readFile('./output.txt');
        const messageSend = data.length<1000?data:"Wrong Solution"
        return message(res,status.NOT_ACCEPTABLE,messageSend)
    }
   
    try{
        const userID = req.session.passport.user;
        const user = await User.findOne({userID:userID});
        updateUser(user,questionId);
        updateQuestion(user,questionId);
        updateCode(req,user,questionId);
    }catch(error){
        return message(req,status.INTERNAL_SERVER_ERROR,error)
    }

    return message(res,status.OK,'executed successfully')
}


function execute(command){
    return new Promise((resolve,reject)=>{
        exec(command,(error,stdout,stderr)=>{
            if(error)
               return reject(`error = ${error}`)
            // if(stderr)
            //     return reject(`stderr = ${stderr}`)
            resolve(stdout)
         })
    });
}

function getExtensionAndContainer(lang){
    switch(lang){
        case 'Java':return 'java'
        case 'C++':return 'cpp'
        case 'C':return 'c'
        case 'Python':return 'py'
        case 'Javascript':return 'js'
        default:undefined
    }
}


function saveTodb(body,userID){
    const submit = new Submissions({
        questionId:body.questionId,
        submittedBy:userID,
        language:body.language,
        code:body.code,
        submittedAt:Date.now()
    });

    submit.save();
}


// async function compareOutput(id){
//     const hashed = JSON.parse(fs.readFileSync('./TestCases/hashed.json'))
//     const isPresent = hashed.find(data=> data.id === id)

//     const hashTestcase = await hashFile('./output.txt')
//     return isPresent.hash === hashTestcase
// }


// function hashFile(filePath){
//     return new Promise((resolve,reject)=>{
//         const hash = crypto.createHash('sha256')
//         const dataStream = fs.createReadStream(filePath,{encoding:'utf-8'})

//         dataStream.on('data', data=>{
//             const normalize = data.replace(/\r\n/g,'\n').trim()
          
//             hash.update(normalize)
//         })
//         dataStream.on('end',()=>resolve(hash.digest('hex')))
//         dataStream.on('error',err=>reject(err))
//     });
// }

function readFile(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,'utf-8',(err,data)=>{
            if(err)
                reject(err);
            resolve(data);
        });
    });
}

async function compareOutput(questionId){
    try{
        const data1 = (await readFile('./output.txt')).replace(/\s+/g,'');
        const data2 = (await readFile(`./Solutions/${questionId}.txt`)).replace(/\s+/g,'');
        // return data1.replace(/\s+/g, '') == data2.replace(/\s+/g, '');
        return data1 == data2
    }
    catch(e){
        console.log(e)
    }
}

async function updateUser(user,questionId){
    //save questions solved in user db
    const solved = user.questionsSolved;
 
    if(solved.length == 0){
        solved.push(questionId)
        user.questionsSolved = solved
        await user.save()
    }else{
        if(!solved.find(qstn=> qstn==questionId)){
            solved.push(questionId)
            user.questionsSolved = solved
            await user.save()
        }
    }

    //save submissions feild in userdb
    const submissions = user.submissions
    const isSubmitted=submissions.find(sub=>sub==user._id)
    if(!isSubmitted){
        submissions.push(user._id)
        user.submissions = submissions
        await user.save()
    }

}

//update users solved field questions feild
async function updateQuestion(user,questionId){

    const question = await Questions.findOne({questionId:questionId})
    const usersSolved = question.usersSolved;
    const isUserSolved = usersSolved.find(usr=>usr==user.userID);
    
    if(!isUserSolved){
        usersSolved.push(user.userID)
        question.usersSolved = usersSolved;
        await question.save();
    }
}

// update the code if any changes are done during resbumission
async function updateCode(req,user,questionId) {
    const {language,code} = req.body
    const isAlreadySubmitted= await Submissions.findOne({questionId:questionId,submittedBy:user.userID})
    if(!isAlreadySubmitted)
        return saveTodb(req.body,user.userID)
  
    isAlreadySubmitted.set({
        code:code,
        language:language,
        submittedAt:Date.now()
    })
    await isAlreadySubmitted.save();
}