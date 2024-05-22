export function camelCaseToNormalText(input: string): string {
    const spaced = input.replace(/([A-Z])/g, ' $1').trim();
    
    const capitalized = spaced.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    
    return capitalized;
}
