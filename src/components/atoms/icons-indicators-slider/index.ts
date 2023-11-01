export const iconRight = (id: string) => (`
    <div data-testid="${id}" class="${id} w-10 h-10 rounded-full cursor-pointer flex items-center justify-center flex-shrink-0">
        <svg class=" pointer-events-none w-full h-full text-blue-dark drop-shadow-[1px_2px_2px_rgba(255,255,255,1)]" width="100%" height="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle;">
            <path d="M405.333 704l213.333-213.333-213.333-213.333" fill="none" stroke="currentcolor" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="42.666666666666664"></path>
        </svg>
    </div>
`);

export const iconLeft = (id: string) => (`
    <div data-testid="${id}" class="${id} w-10 h-10 rounded-full cursor-pointer flex items-center justify-center flex-shrink-0">
        <svg class=" pointer-events-none w-full h-full text-blue-dark drop-shadow-[-1px_2px_2px_rgba(255,255,255,1)]" width="100%" height="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle;">
            <path d="M618.667 277.333l-213.333 213.333 213.333 213.333" fill="none" stroke="currentcolor" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="42.666666666666664"></path>
        </svg>
    </div>
`);
