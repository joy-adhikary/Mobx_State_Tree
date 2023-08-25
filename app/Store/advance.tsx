import { applySnapshot, getSnapshot, onSnapshot, types, flow } from 'mobx-state-tree'


// ! Eirokom multiple  model thakle just akta jinish mathai rakhty hobe je ami je model a ashi sudu matro sei model er actions gulai access korty parbo  
//? for example Task a only egula accesss pabo       =>  ToogleComplete , SetTitle  
// ?            TaskList a  only egula access pabo   =>  AddTask , RemoveTask 
//?             Rootstore a only egula access pabo   =>  GetFiveData , ResetDataUsingApplySnapshot
// Evabe access pabo . kintu caily store.tasklist.task diye o access kore jabe . kind of object er moto 

const OnlyTask = types.model('Task', {
    Id: types.string,
    Title: types.string,
    Completed: types.boolean,
})

    .actions(self => ({

        ToggleComplete() {
            // self.Completed = !self.Completed
            applySnapshot(self, {
                ...self,
                Completed: !self.Completed
            })
        },

        SetTitle(newTitle: string) {
            self.Title = newTitle;
        }
    }));


const TaskList = types.model('TaskList', {
    // ? contain only an array of task 
    tasks: types.array(OnlyTask)
})

    .actions((self) => ({

        AddTask(newTask: any) {
            // ?  taking the new task and adding it to the list of tasks
            self.tasks.push(newTask);
        },

        RemoveTaks(TaskId: string) {
            // ? taking the taskId and removing it from the list
            self.tasks = self.tasks.filter(task => task.Id !== TaskId);
        }
    }))

    .views(self => ({

        // ?  counting the number of completed tasks 
        get TotalCompletedTask() {
            return self.tasks.filter(task => task.Completed === true)
            console.log("TotalCompletedTask Number: ", self.tasks.length)
        }
    }))

// ! task => TaskList [task] => RootStore
const RootStore = types
    .model("RootStore", {
        taskList: TaskList
    })

    .actions(self => ({
        GetFiveData() {
            const fetchTasks = flow(function* () {

                // Simulating an API request delay
                yield new Promise(resolve => setTimeout(resolve, 1000));

                const tasksFromApi = [
                    { Id: '1', Title: 'Task 1', Completed: false },
                    { Id: '2', Title: 'Task 2', Completed: false },
                    { Id: '3', Title: 'Task 3', Completed: true },
                    { Id: '4', Title: 'Task 4', Completed: false },
                    { Id: '5', Title: 'Task 5', Completed: false },
                ];
                //? adding incoming tasks into the taskList which are come from api call 
                // tasksFromApi.forEach(task => store.taskList.tasks.push(task));
                tasksFromApi.forEach(task => store.taskList.AddTask(task));
            });

            fetchTasks().then(() => {
                // Get the current snapshot 
                console.log("Getting current snapshot :", getSnapshot(store.taskList))
                // Jkn fetch complete hoye jabe tkn eita 1 min por logCompletedTasks ke active kore dibe , jar jonno akn store er kno data change hoile e akta snapshot nibe 
                setTimeout(() => logCompletedTasks(), 1000)
            })
        },

        // Reset all tasks 
        ResetDataUsingApplySnapshot() {
            // Apply the snapshot to reset the state
            applySnapshot(store, {
                taskList: {
                    tasks: []
                }
            });
        }
    }))

// create a new instance of  RootStore with default one task 
const store = RootStore.create({
    taskList: {
        tasks: [],
    },
});

// ! Jkn logcompleteTasks fire kora hbe er por theke eita store.tasklise  ke observe korbe kono change ashle e eita akta snapshot nibe 
const logCompletedTasks = () => {
    return onSnapshot(store.taskList, snapshot => {
        console.log('Task Changed :', snapshot);
    });
};

export default store 