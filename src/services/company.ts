import { CompanyInterface } from "@/types/company"

export default class CompanyService {
    static async registration(data: any) {
        const response = await fetch(`/api/company`, {
                    method: 'POST',
                    body: data
                })
        return await response.json()
    }

    static async getOwn() {
        const response = await fetch('/api/company')
        const company: CompanyInterface | null = await response.json() 
        return company
    }
}