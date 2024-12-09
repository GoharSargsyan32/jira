import { taskStatuses } from "../utils/issues"


export const transformIssueData = (data) => {
    const container = {};
    for(let i in taskStatuses) {
        container[taskStatuses[i].key] = [];
        console.log(container);
    }

    data.forEach(item => {
        if(container.hasOwnProperty(item.status)) {
            //container[item.status] = [...container[item.status], item]
            container[item.status].push(item);
        }
        
    });
    
    console.log(container);    

}

