export function removeDots(email: string): string {
    const atIndex: number = email.indexOf('@');
    const emailName: string = email.substring(0, atIndex);
    const domain: string = email.substring(atIndex);
    const cleanedEmailName: string = emailName.replace(/\./g, ''); 
    return cleanedEmailName + domain;
}