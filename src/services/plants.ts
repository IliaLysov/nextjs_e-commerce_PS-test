import { FiltersInterface } from "@/types/filter"


export default class PlantsService {
    static async addOne(data: FormData) {
        const response = await fetch('/api/plants', {
            method: 'PUT',
            body: data
        })
        return await response.json()
    }

    static async getSome(data: {skip: number, ids: string[] | null}) {
        const response = await fetch('/api/plants', {
            headers: {"Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify(data)
        })
        return await response.json()
    }

    static async getOwn({params, organizationId}: {params: {skip: number, appliedFilters: FiltersInterface | null, sort: any}, organizationId: string}) {
        const response = await fetch(`/api/plants/many/${organizationId}`, {
            headers: {"Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify(params)
        })
        return await response.json()
    }

    static async getAll(params: {skip: number, appliedFilters: Partial<FiltersInterface> | null, sort: any}) {
        const response = await fetch('/api/plants/many', {
            headers: {"Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify(params)
        })
        return await response.json()
    }
}