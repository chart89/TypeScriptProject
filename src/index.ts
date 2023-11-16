const inquirer = require('inquirer');
const consola  = require("consola");

enum MessageVariant {
    Success = 'success',
    Error = 'error',
    Info = 'info'
}

class Message {
    private content: string;

    constructor(content: string) {
        this.content = content;
    };

    public show(): void {
        console.log(this.content);
    };

    public capitalize(): string {
        
        return this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
    };

    public toUpperCase(): string {
        
        return this.content = this.content.toUpperCase();
    };

    public toLowerCase(): string {
        
        return this.content = this.content.toLowerCase();
    };

    static showColorized(variant: MessageVariant, anyText: string): void {
        if (variant === 'success') {
            consola.success(anyText);
        } else if (variant === 'error') {
            consola.error(anyText);
        } else {
            consola.info(anyText);
        }
    
    }
};

interface User  {
    name: string;
    age: number;
}

class UsersData {
    data: User[] = [];

    showAll(): void | string {
        Message.showColorized(MessageVariant.Info, "User data...");
        if (this.data.length > 0) {
            console.table(this.data);
        } else {
            Message.showColorized(MessageVariant.Error, "No data...");
        }
    };

    add(newUser: User): void {
        if (newUser.name.length > 0 && newUser.age > 0) {
          this.data.push(newUser);
          Message.showColorized(MessageVariant.Success, "User has been successfully added!");
        } else {
          Message.showColorized(MessageVariant.Error, 'Wrong data!');
        }
      };
    
    remove(dataUserName: string): void {
        const userIndex = this.data.findIndex((user) => user.name === dataUserName );
        if(userIndex !== -1) {
            this.data.splice(userIndex, 1);
            Message.showColorized(MessageVariant.Success, "User has been successfully deleted!");
        } else {
            Message.showColorized(MessageVariant.Error, 'User not found...');
        }
    ;};

};

const users = new UsersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");

enum Action {
    List = "list",
    Add = "add",
    Remove = "remove",
    Quit = "quit"
  }

type InquirerAnswers = {
  action: Action
}

const startApp = () => {
    inquirer.prompt([{
      name: 'action',
      type: 'input',
      message: 'How can I help you?',
    }]).then(async (answers: InquirerAnswers) => {
      switch (answers.action) {
        case Action.List:
          users.showAll();
          break;
        case Action.Add:
          const user = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }, {
            name: 'age',
            type: 'number',
            message: 'Enter age',
          }]);
          users.add(user);
          break;
        case Action.Remove:
          const name = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }]);
          users.remove(name.name);
          break;
        case Action.Quit:
          Message.showColorized(MessageVariant.Info, "Bye bye!");
          return;
      }
  
      startApp();
    });
  }
  startApp();

