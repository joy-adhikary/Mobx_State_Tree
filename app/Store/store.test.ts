import { describe, expect, test } from '@jest/globals';
import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { WishList, WishListItem } from "./WishLIst"

describe('Testing WishListItem Model', () => {
    test("should create a new wish list item", () => {
        const Item = WishListItem.create(
            {
                id: 1,
                name: "joy",
                price: 28.73,
            }
        );

        expect(Item.price).toBe(28.73);
        expect(Item.img).toBe("");

        Item.ChangeName("Joy kumar Adhikary");
        expect(Item.name).toBe("Joy kumar Adhikary");

        Item.ChangePrice(10);
        expect(Item.price).toBe(10);
    });
});


describe('Testing WishListItem Model ', () => {
    test("should create a new wishList ", () => {
        
        const Item = WishList.create(
            {
                items: [
                    {
                        id: 1,
                        name: "joy",
                        price: 10,
                    }
                ]
            }
        );

        expect(Item.items.length).toBe(1)
        expect(Item.items[0].id).toBe(1)

        Item.AddItem(
            {
                id: 11,
                name: "joya",
                price: 2000.0,
                img: "joy",
            }
        )
        expect(Item.items.length).toBe(2)

        expect(getSnapshot(Item)).toEqual(
            {
                items: [
                    {
                        id: 1,
                        name: "joy",
                        price: 10,
                        img: "",
                    },
                    {
                        id: 11,
                        name: "joya",
                        price: 2000.0,
                        img: "joy",
                    }
                ]
            }
        )

        // Upper one and this one basically both are the same 
        expect(getSnapshot(Item)).toMatchSnapshot()

        // Total Price Views 
        expect(Item.TotalPrice).toBe(2010.0)
        
        Item.RemoveItem(11)
        expect(Item.items.length).toBe(1)

    });
});

