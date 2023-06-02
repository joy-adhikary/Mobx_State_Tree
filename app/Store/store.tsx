import { applySnapshot, getSnapshot, onSnapshot, types } from 'mobx-state-tree'

//! UserModel er ki ki properties thakbe ( MODEL ) , segular type ki ki hbe ( TYPES )
//! oi properties gular majhe kon kon peroperty te ki ki oparetion kora jabe ( ACTIONS ),
//! oi peroperty gular theke ki ki information directly dekhty cacchi ( VIEW )  
const UserModel = types
.model(
    'User',{
        UserName: types.string,
        UserId: types.integer,
        UserScore1: types.integer,
        UserScore2: types.integer,
        //? Optional define kore create er somoi jodi eitar value assinge nah kore tahole by default " " assigne kore dibe .  mane ei filed ta optional . user caile dibe or nah dile "" assign hbe   
        UserDescription: types.optional(types.string , " "),
        //? union basically define that either 1st or 2nd type will be allowed . Like optional properties .
        UserType: types.union(types.literal("Admin"),types.literal("User"))
    }
)

// ! only  action has the admin super power . That means only it can change or modify the state or model datas .
.actions((self)=>({

        setUserName(value: string){
            self.UserName = value;
            console.log("I am invoked from setUserName")
        },

        setUserUsingApplySnapshot(){
            applySnapshot(self,{
                ...self,
                UserId : 50,
            })
            console.log("UserId is set by ApplySnapShot And New userID is :" , self.UserId)
        },

        setUserScore(value: number){
            self.UserScore1 = value;
            console.log("I am invoked from setUserScore")
        },

        ToggleUserType(){
            self.UserType = self.UserType==="User"?"Admin":"User"
            console.log("I am chaning user type")

            // ei onSnapshot function execute hbe jkn ToggleUserType function er run hobe .
            //! karon ei jaigai self mane ei toggleusertype ke point kore ajonno . eita bojhar jonno nicer  ToggleUserType1() ta deya
            onSnapshot(self,(snapshot) => {
                console.log("ToggleUserType => ",snapshot)
            })
        },

        ToggleUserType1(){
            self.UserType = self.UserType==="User"?"Admin":"User"
            console.log("I am chaning user type")
            // This one  wont take  any snapshot
        },

        afterCreate(){
            // ei onSnapshot function ta user ke observation a rakhbe jkn e user model er kono data change hobe tkn e ei onSnapshot function ta execute korbe  
            onSnapshot(self,(snapshot) => {
                console.log("afterCreate => ",snapshot)
            })
            console.log("It will run only  first time")
        }, 
}))

//! This can be a computed or non computed value but it must be derived directly from the state.
//! eitar majhe model er je je properties use kora hoise segular aktau change hole instantly oita function ta run korbe jkn userscore1 or userscore2 er value cng hole e totalscore run  korbe 
.views((self)=>({

    //? Jkn e UserScore1 or UserScore2 modify hbe instantly ei function ta run hbe r totalscore update  kore felbe
        get TotalScore(){
            console.log("I am form TotalScore , total score is ", self.UserScore1+self.UserScore2)
            return  self.UserScore1+self.UserScore2;
        }
}))

const Users = UserModel.create({
    UserName: "Joy Adhikary",
    UserId: 62,
    UserScore1: 100,
    UserScore2: 200,
    UserType: "User",
})

//! Whenever i call getSnapshot(modelName) it will get the current snapshot or information of that modelName
console.log("current Snapshot is :" , getSnapshot(Users))

export default Users;