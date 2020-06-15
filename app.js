const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let ID = 1

async function main(){
    const team = []

    const managerData = await inquirer.prompt([
        {name: 'name', message: `Input the manager's name.`},
        {name: 'email', message: `Input their email address.`},
        {name: 'officeNumber', message: `Input their office number.`},
        {name: 'count', message: `Input how many people work under them.`}
    ])
    team.push(new Manager(managerData.name, ID++, managerData.email, managerData.officeNumber))
    
    for(let userCnt = 1; userCnt <= managerData.count; userCnt++){
        const user = await inquirer.prompt([
            {name: 'type', type: 'list', message: `For person ${userCnt}/${managerData.count}, input their occupation.`,
            choices: ['intern', 'engineer']}
        ])

        if(user.type=='engineer'){
            const userData = await inquirer.prompt([
                {name: 'name', type:'input', message: `Input the engineer's name.`},
                {name: 'email', type: 'input', message: `Input their email address.`},
                {name: 'github', type: 'input', message: `Input their Github username`}
            ])
            team.push(new Engineer(userData.name, ID++, userData.email, userData.github))
        } else {
            const userData = await inquirer.prompt([
                {name: 'name', type: 'input', message: `Input the intern's name.`},
                {name: 'email', type: 'input', message: `Input their email address.`},
                {name: 'school', type: 'input', message: `Input their school name.`}
            ])
            team.push(new Intern(userData.name, ID++, userData.email, userData.school))
        }
    }
    
    const html = render(team)

    fs.writeFileSync(outputPath, html)
}
main()
