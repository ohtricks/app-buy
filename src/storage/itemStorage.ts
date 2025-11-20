import { FilterStatus } from "@/types/FilterStatus"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ITEMS_STORAGE_KEY = "@app-buy:items"

export type ItemStorage = {
    id: string,
    status: FilterStatus,
    description: string
}

async function get(): Promise<ItemStorage[]>{
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)

        return storage ? JSON.parse(storage) : []
    } catch (error) {
        throw new Error("ITEMS_GET: " + error)
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]>{
    try {
        const items = await get()

        return items.filter((item) => item.status === status)
    } catch (error) {
        throw new Error("ITEMS_GET_BY_STATUS: " + error)
    }
}

async function save(items: ItemStorage[]): Promise<void>{
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
        throw new Error("ITEMS_SAVE: " + error)
    }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]>{
    const items = await get()
    const updatedItems = [...items, newItem]

    await save(updatedItems)

    return updatedItems
}

async function remove(id: string): Promise<void> {
    const items = await get()
    const updatedItems = items.filter((item) => item.id !== id)

    save(updatedItems)
}

async function clearPeddingItems(): Promise<void> {
    const items = await get()
    const updatedItems = items.filter((item) => item.status !== FilterStatus.PEDDING)

    save(updatedItems)
}

async function toggleStatus(id: string): Promise<void> {
    const items = await get()
    const updatedItems = items.map((item) => {
        if(item.id !== id) return item

        item.status = item.status === FilterStatus.DONE ? FilterStatus.PEDDING : FilterStatus.DONE

        return item
    })

    save(updatedItems)
}

export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
    clearPeddingItems,
    toggleStatus
}