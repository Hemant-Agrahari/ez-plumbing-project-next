export function convertSlugToTitle(slug: any) {
     return slug
        .split('-')
        .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}