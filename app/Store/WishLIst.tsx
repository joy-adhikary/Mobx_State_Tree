import {
    applySnapshot,
    onSnapshot,
    getSnapshot,
    flow,
    types,
} from "mobx-state-tree";

// ! Jkn Mobx State Tree er maddhome kono state change korbo tkn clone use korbo mobx er , then oi clone er getsnapshot niye applysnapshot er madhome update kore dibo 
//! clone basically current state er akta copy banai dei 
// ! Clone simply takes the type of object you give it and takes its snapshot, and then instantiates a new instance of the same type with the same snapshot, so you get basically a literal copy of the same thing.

interface WishlistItemType {
    name: string;
    id: number;
    price: number;
    img: string;
}

export const WishListItem = types.model("WishListItem",
    {
        name: types.string,
        id: types.integer,
        price: types.number,
        img: types.optional(types.string, ""),
    }
)
    .actions((self) => (
        {
            ChangeName(newName: string) {
                self.name = newName;
            },

            ChangePrice(NewPrice: number) {
                self.price = NewPrice;
            },

            ChangeImage(newImage: string) {
                self.img = newImage;
            },
        }
    ))

export const WishList = types.model("WishList",
    {
        items: types.optional(types.array(WishListItem), []),
    }
)
    .actions((self) => (
        {
            AddItem(CommingItem: WishlistItemType) {
                self.items.push(CommingItem);
            },

            RemoveItem(RemoveItemById: number) {
                self.items = self.items.filter(item => item.id !== RemoveItemById)
            },
        }
    ))

    .views(self => (
        {
            get TotalPrice() {
                return self.items.reduce((total: number, item: WishlistItemType) => total + item.price, 0);
            }
        }
    ))
