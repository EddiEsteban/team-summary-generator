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
    console.log(`[main] Starting...`)
    const team = []

    const managerData = await inquirer.prompt([
        {name: 'name', type: 'input', message: `What is the manager's name?`},
        {name: 'email', type: 'input', message: `What is the manager's email?`},
        {name: 'officeNumber', type: 'input', message: 'What is their office number?'},
        {name: 'count', type: 'input', message: 'How many people work under them?'}
    ])
    team.push(new Manager(managerData.name, ID++, managerData.email, managerData.officeNumber))
    
    for(let userCnt = 1; userCnt <= managerData.count; userCnt++){
        const user = await inquirer.prompt([
            {name: 'type', type: 'list', message: `For person ${userCnt}/${managerData.count}, are they an:`,
            choices: ['intern', 'engineer']}
        ])

        if(user.type=='engineer'){
            const userData = await inquirer.prompt([
                {name: 'name', type:'input', message: `What is the engineer's name?`},
                {name: 'email', type: 'input', message: `What is the engineer's email?`},
                {name: 'github', type: 'input', message: `What is their Github?`}
            ])
            team.push(new Engineer(userData.name, ID++, userData.email, userData.github))
        } else {
            const userData = await inquirer.prompt([
                {name: 'name', type: 'input', message: `What is the intern's name?`},
                {name: 'email', type: 'input', message: `What is the intern's email?`},
                {name: 'school', type: 'input', message: `What is their school?`}
            ])
            team.push(new Intern(userData.name, ID++, userData.email, userData.school))
        }
    }
    
    const html = render(team)

    fs.writeFileSync(outputPath, html)
    console.log(`Finished writing the file, available in ${outputPath}`)

}
main()



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
