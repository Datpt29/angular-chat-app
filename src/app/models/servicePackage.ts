export interface Package {
    name: string,
    cost: string,
    desc: string,
    pros: { id: number, value: string }[],
    cons: { id: number, value: string }[],
    img: string,
    isSelected: boolean
}