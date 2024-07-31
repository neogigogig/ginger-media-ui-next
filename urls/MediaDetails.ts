import { Knex } from "knex";

export class MediaDetails{

    knexInstance;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    async getServiceDetails(serviceId: string){
        let { cities, medium, filters, filterOptions } =  await this.knexInstance("Services")
        .first("Services.cities", "Services.medium",
             "Services.filters", "Filters.filterOptions")
        .innerJoin( "Filters", "Services.filters", "Filters.filterId")
        .where({serviceId})

        cities = cities.split(",")
        medium = medium.split(",")
        filterOptions = filterOptions.split(",")

        return { city: cities, medium,  [filters]: filterOptions}
    }
}