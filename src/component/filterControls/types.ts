export interface FilterParameter  {
    id: string,
    label: string,
    options: FilterParameterOptions[]
}

export interface FilterParameterOptions {
    id: string,
    label: string,
}