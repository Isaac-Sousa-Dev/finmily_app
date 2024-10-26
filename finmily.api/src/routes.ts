import { CollaboratorController } from "./controller/CollaboratorController"
import { ManagerController } from "./controller/ManagerController"
import { TaskController } from "./controller/TaskController"
import { UserController } from "./controller/UserController"

export const Routes = [

    // Route Auth
    { method: "post", route: "/users/auth", controller: UserController, action: "auth" },
    
    // Routes for Manager
    { method: "post", route: "/manager/register", controller: ManagerController, action: "save" }, 
    { method: "post", route: "/manager/update", controller: ManagerController, action: "update" }, 
    { method: "delete", route: "/manager/:id", controller: ManagerController, action: "remove" },
    { method: "get", route: "/manager/home", controller: ManagerController, action: "home" },
    { method: "get", route: "/manager/tasks", controller: ManagerController, action: "tasks" },
    { method: "get", route: "/manager/tasks-by-collaborator/:userUid", controller: ManagerController, action: "tasksByCollaborator" },
    { method: "get", route: "/manager/childrens/", controller: ManagerController, action: "childrensByManager" },

    // Routes for Collaborator
    { method: "get", route: "/collaborator", controller: CollaboratorController, action: "all" }, 
    { method: "get", route: "/collaborator/:id", controller: CollaboratorController, action: "one" }, 
    { method: "post", route: "/collaborator/register", controller: CollaboratorController, action: "save" }, 
    { method: "post", route: "/collaborator/update", controller: CollaboratorController, action: "update" }, 
    { method: "delete", route: "/collaborator/:id", controller: CollaboratorController, action: "remove" },


    // Routes for Task
    { method: "get", route: "/task", controller: TaskController, action: "all" }, 
    { method: "get", route: "/task/:id", controller: TaskController, action: "one" }, 
    { method: "post", route: "/task", controller: TaskController, action: "save" }, 
    { method: "post", route: "/task/update", controller: TaskController, action: "update" }, 
    { method: "delete", route: "/task/:id", controller: TaskController, action: "remove" },
    { method: "get", route: "/my-tasks", controller: TaskController, action: "myTasks" },
]