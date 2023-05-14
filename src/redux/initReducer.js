export const defaultVal = {
    userArr:
        [
            {
                id: 'a0001',
                name: 'Duc',
                email: 'ngoduc202@gmail.com',
                phone: '0364643405',
            },
            {
                id: 'a0002',
                name: 'Thanh',
                email: 'ngodu55552@gmail.com',
                phone: '0464643405',
            }
        ],
    objUpdate:
    {
        id: '',
        name: '',
        email: '',
        phone: '',
    },
}

export const rootReducer = (state = defaultVal, action) => {
    //switch case here
    switch (action.type) {
        case 'add':
            return {
                ...state,
                userArr: [
                    ...state.userArr,
                    action.payload,
                ]
            }
        case 'update':
            return {
                ...state,
                objUpdate: { ...action.payload },
            }
        case 'dataUpload':
            const {id,value} = action.payload;
            let index = state.userArr.findIndex((user,index)=>{
                return user.id === id;
            })
            state.userArr[index] = value;
            return{
                ...state,
                objUpdate:
                {
                    id: '',
                    name: '',
                    email: '',
                    phone: '',
                },
            }
        case 'delete':
            console.log(action.payload);
            let indexForDeleting = state.userArr.findIndex(user =>{
                return action.payload.id === user.id;
            })
            state.userArr.splice(indexForDeleting,1);
            return{
                ...state,
            }
        default:
            break;
    }
}

