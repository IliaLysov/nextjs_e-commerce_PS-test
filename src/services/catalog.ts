import { FiltersInterface } from "@/types/filter"


export default class CatalogService {
    static async getAll(params: {skip: number, appliedFilters: Partial<FiltersInterface> | null, sort: any}) {
        const response = await fetch('/api/plants/many', {
            headers: {"Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify(params)
        })
        return await response.json()
    }
}